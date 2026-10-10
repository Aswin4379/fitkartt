import dotenv from 'dotenv';
import BodyCareAssessment from '../models/BodyCareAssessment.js';
import { resolveExerciseMedia, CANONICAL_BODYCARE_EXERCISES, getCanonicalExercisesForBodyPart } from '../data/bodyCareExercises.js';

dotenv.config();

/**
 * Deterministic safety rule analyzer for immediate red flag warning signs.
 * This runs locally on the backend to guarantee safety rules are NEVER overridden by AI.
 */
function analyzeRedFlags(bodyPart, symptoms = {}) {
  const text = [
    bodyPart || '',
    symptoms.painType || '',
    symptoms.userDescription || '',
    symptoms.injuryDetails || '',
    (symptoms.additionalSymptoms || []).join(' ')
  ].join(' ').toLowerCase();

  const severity = Number(symptoms.severity) || 1;

  // 1. Cardiac Red Flags
  const isChestArea = /chest|sternum|rib|heart|pectoral/i.test(bodyPart || text);
  const hasCardiacSymptoms = /radiat|shortness of breath|breathless|sweating|dizziness|faint|crushing|pressure in chest|left arm|jaw pain/i.test(text);
  if (isChestArea && hasCardiacSymptoms) {
    return {
      isRedFlag: true,
      reason: 'Chest discomfort accompanied by shortness of breath, crushing sensation, or pain radiating to arm/jaw may indicate a potential cardiovascular emergency.'
    };
  }

  // 2. Cauda Equina / Severe Spinal Compression
  const isSpineArea = /back|lumbar|neck|cervical|spine/i.test(bodyPart || text);
  const hasCaudaEquinaSigns = /bladder|bowel|incontinence|saddle|groin numbness|both legs weak|foot drop|numbness in genitals/i.test(text);
  if (isSpineArea && hasCaudaEquinaSigns) {
    return {
      isRedFlag: true,
      reason: 'Back or neck pain accompanied by loss of bowel/bladder control, saddle numbness, or progressive bilateral leg weakness suggests severe spinal cord or cauda equina compression.'
    };
  }

  // 3. Neurological / Stroke / Meningitis Signs
  const hasNeuroEmergency = /facial droop|slurred speech|sudden vision loss|paralysis|thunderclap|stiff neck and fever|confusion/i.test(text);
  if (hasNeuroEmergency) {
    return {
      isRedFlag: true,
      reason: 'Symptoms suggestive of acute neurological distress (e.g. speech difficulty, unilateral paralysis, or stiff neck with high fever) require immediate emergency evaluation.'
    };
  }

  // 4. Major Acute Trauma / Fracture / Joint Dislocation
  const hasFractureSigns = /bone deformity|bone sticking out|compound|unable to bear weight|snapping sound|pop and instant swelling|deformed joint/i.test(text);
  if (symptoms.isInjury && (hasFractureSigns || severity >= 9)) {
    return {
      isRedFlag: true,
      reason: 'High-severity trauma with inability to bear weight, visible deformity, or immediate intense swelling indicates a potential bone fracture or complete ligament rupture.'
    };
  }

  // 5. Deep Vein Thrombosis (Calf/Leg)
  const isCalfOrLeg = /calf|lower leg|shin/i.test(bodyPart || text);
  const hasDvtSigns = /swollen calf|hot to touch|red and warm|pain on dorsiflexion|after long flight|blood clot/i.test(text);
  if (isCalfOrLeg && hasDvtSigns) {
    return {
      isRedFlag: true,
      reason: 'Unilateral calf swelling with heat and tenderness may indicate deep vein thrombosis (DVT), which requires prompt medical evaluation.'
    };
  }

  return { isRedFlag: false, reason: '' };
}

/**
 * POST /api/bodycare/assess
 * Main BodyCare AI symptom assessment endpoint.
 */
export const assessBodyCare = async (req, res) => {
  try {
    const {
      bodyPart,
      bodySide = 'front',
      symptoms = {},
      consentGiven = true
    } = req.body;

    if (!bodyPart || typeof bodyPart !== 'string') {
      return res.status(400).json({ message: 'A valid body part is required for assessment.' });
    }

    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_API_KEY) {
      console.error('[BodyCare AI] GROQ_API_KEY is not configured in backend environment.');
      return res.status(503).json({
        message: 'AI guidance is temporarily unavailable. Groq API service is not configured.'
      });
    }

    // Run deterministic safety check first
    const redFlagCheck = analyzeRedFlags(bodyPart, symptoms);

    // Find candidate gentle mobility exercises for this anatomical region from canonical database
    const relevantCandidates = getCanonicalExercisesForBodyPart(bodyPart);

    // Build rich, structured clinical guidance prompt for Groq
    const prompt = `You are BodyCare AI, an empathetic, highly knowledgeable physical rehabilitation and body-care guidance assistant on FitKart.
A user has reported discomfort and provided their symptoms for educational guidance.

USER SYMPTOM PROFILE:
- Body Part: ${bodyPart} (${bodySide} view)
- Pain / Discomfort Type: ${symptoms.painType || 'Unspecified'}
- Duration / Onset: ${symptoms.onset || 'Recent'}
- Pain Severity (1-10): ${symptoms.severity || 5}
- Prior Injury or Trauma: ${symptoms.isInjury ? `Yes (${symptoms.injuryDetails || 'unspecified event'})` : 'No acute trauma reported'}
- Additional Associated Symptoms: ${(symptoms.additionalSymptoms || []).length > 0 ? symptoms.additionalSymptoms.join(', ') : 'None selected'}
- User's Own Words Description: "${symptoms.userDescription || 'No additional details provided'}"

${relevantCandidates.length > 0 ? `CANONICAL GENTLE MOBILITY CANDIDATES FOR THIS BODY PART:
${relevantCandidates.map(c => `- ID: "${c.id}", Name: "${c.name}"`).join('\n')}` : ''}

${redFlagCheck.isRedFlag ? `CRITICAL SAFETY ALERT DETECTED BY SCREENING:
${redFlagCheck.reason}
Your primary directive is to urge immediate emergency medical evaluation! You MUST set isRedFlag to true and urgency to "Emergency". Do NOT recommend vigorous exercise, stretching, or home remedies that could delay life-saving care.` : ''}

CLINICAL GUIDELINES:
1. NOT A DIAGNOSIS: Clearly state that your explanations are common possibilities and educational considerations, NEVER a confirmed diagnosis.
2. DO NOT PROMISE CURES: Use responsible language ("may help relieve stiffness", "supports tissue recovery").
3. RECOVERY & SELF-CARE: Provide 4-6 practical, non-strenuous steps (ergonomic tweaks, rest posture, hydration).
4. GENTLE MOVEMENTS:
   - If severe pain (severity >= 8), acute trauma (<48h), or red flags are present, DO NOT recommend active exercise. Return an empty array or 1 passive rest guideline.
   - If mild-to-moderate muscular stiffness or subacute ache, dynamically select 2-3 safe gentle mobility movements matching the user's symptoms.
   - You may select from the canonical candidates list above or provide clinically sound physical therapy gentle movements.
   - For EACH movement, provide:
     * "exerciseId": canonical ID or hyphenated-name
     * "name": exact descriptive name
     * "startingPosition": exact starting posture
     * "movementDirection": movement vector and cue
     * "repsOrDuration": suggested reps or hold duration (e.g. "8-10 repetitions", "Hold 20-30 seconds")
     * "breathingGuidance": specific inhale/exhale timing
     * "stopSigns": symptoms indicating stop immediately (e.g. sharp pinch, radiating pain, numbness)
     * "instructions": array of 3-5 clear step-by-step instructions
     * "description": brief summary of movement
     * "precautions": safety precautions and when to modify
5. MOVEMENTS TO AVOID: List 3-4 specific activities, lifting motions, or postures that could aggravate this body area.
6. HEAT VS ICE (THERMAL THERAPY):
   - Clearly state whether Cold, Heat, Contrast, or Neither is appropriate, with rationale (e.g. Cold for acute swelling <48h; Heat for chronic muscle tightness >48h; avoid heat on acute inflammation).
   - Provide exact duration (15-20 mins) and skin-barrier instructions.
7. TOPICAL RELIEF:
   - Mention general over-the-counter soothing options (e.g. menthol/camphor gel, arnica, magnesium cream, non-prescription topical NSAID).
   - Include mandatory safety precautions (patch test, avoid broken skin, consult pharmacist if pregnant/on medication).
8. NUTRITION & RECOVERY: Recommend 3-5 wholesome foods/nutrients supporting inflammation regulation and tissue repair (Omega-3 fatty acids, berries, leafy greens, lean proteins, turmeric, adequate water).
9. WHEN TO CONSULT A DOCTOR:
   - Provide a clear urgency level: "Routine" (within a few weeks if no improvement), "Prompt" (within 24-48 hours if worsening), or "Emergency" (immediate medical assistance).
   - List specific warning signs that warrant immediate doctor evaluation.

OUTPUT FORMAT:
Return strictly a single valid JSON object with EXACTLY these keys:
{
  "possibleExplanations": ["explanation 1", "explanation 2", "explanation 3"],
  "selfCareSuggestions": ["tip 1", "tip 2", "tip 3", "tip 4"],
  "gentleMovements": [
    {
      "exerciseId": "chin-tucks",
      "name": "Seated Chin Tucks",
      "startingPosition": "Sit tall with shoulders relaxed and back straight.",
      "movementDirection": "Glide your chin straight backwards horizontally.",
      "repsOrDuration": "8-10 repetitions, hold 3-5 seconds each.",
      "breathingGuidance": "Inhale to prepare; exhale as you glide your chin backwards.",
      "stopSigns": "Stop if you feel dizziness, sharp pain, or numbness.",
      "instructions": ["Sit upright.", "Place fingers on chin.", "Glide chin back into gentle double chin.", "Hold 3-5 seconds.", "Release."],
      "description": "Gentle retraction to align cervical spine.",
      "precautions": "Do not tilt head down toward chest."
    }
  ],
  "movementsToAvoid": ["avoid 1", "avoid 2", "avoid 3"],
  "thermalTherapy": {
    "recommendation": "Cold Therapy" | "Heat Therapy" | "Contrast Therapy" | "Avoid Thermal Therapy",
    "instructions": "Specific instructions on application, timing, and barrier"
  },
  "topicalRelief": {
    "suggestions": ["suggestion 1", "suggestion 2"],
    "precautions": "Precaution details"
  },
  "nutritionRecovery": {
    "foods": ["food 1", "food 2", "food 3"],
    "notes": "Brief nutritional explanation"
  },
  "medicalConsultation": {
    "urgency": "Routine" | "Prompt" | "Emergency",
    "guidance": "Clear explanation of when and why to see a doctor"
  },
  "isRedFlag": boolean,
  "redFlagReason": string,
  "disclaimer": "This guidance is for educational and self-care recovery purposes only and is not a medical diagnosis or treatment plan. Always consult a licensed healthcare professional for severe, worsening, or persistent symptoms."
}

Do NOT include any markdown code blocks, backticks, or conversation outside the JSON. Return only the raw JSON string.`;

    let aiData;
    const modelsToTry = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'qwen/qwen3.8-27b'];
    let lastError = null;

    for (const model of modelsToTry) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model,
            messages: [
              {
                role: 'system',
                content: 'You are an advanced clinical physical rehabilitation and body-care assistant. Output strictly valid JSON matching the user schema.'
              },
              { role: 'user', content: prompt }
            ],
            temperature: 0.2,
            response_format: { type: 'json_object' }
          })
        });

        if (response.ok) {
          const resJson = await response.json();
          const rawContent = resJson.choices?.[0]?.message?.content;
          if (rawContent) {
            aiData = JSON.parse(rawContent);
            break; // Successfully parsed!
          }
        } else {
          const errText = await response.text();
          console.warn(`[BodyCare AI] Groq attempt with ${model} failed (${response.status}):`, errText);
          lastError = new Error(`Groq ${response.status}: ${errText}`);
        }
      } catch (err) {
        console.warn(`[BodyCare AI] Error trying model ${model}:`, err.message);
        lastError = err;
      }
    }

    if (!aiData) {
      console.warn('[BodyCare AI] Groq models unavailable or rate-limited. Activating clinical canonical fallback for body part:', bodyPart);
      const canonicalBackfills = getCanonicalExercisesForBodyPart(bodyPart);
      const fallbackMovements = canonicalBackfills.slice(0, 3).map(rec => resolveExerciseMedia(rec, bodyPart));

      aiData = {
        possibleExplanations: [
          `Mild muscular strain or myofascial tightness in the ${bodyPart} region.`,
          `Postural fatigue or repetitive mechanical stress affecting surrounding soft tissues.`,
          `Temporary stiffness related to physical exertion, prolonged holding, or daily stress.`
        ],
        selfCareSuggestions: [
          `Prioritize gentle, non-strenuous movement and avoid aggravating high-load activities.`,
          `Apply appropriate thermal therapy (ice pack for acute discomfort or moist heat for muscular stiffness).`,
          `Maintain ergonomic posture and take periodic active stretch breaks.`,
          `Ensure adequate hydration, restorative sleep, and nutrient-dense whole foods.`
        ],
        gentleMovements: fallbackMovements,
        movementsToAvoid: [
          `High-impact jumping or ballistic bouncing motions`,
          `Heavy resistance loads that trigger sharp pinch or strain`,
          `Prolonged static slouching or unsupported awkward postures`
        ],
        thermalTherapy: {
          recommendation: 'Heat Therapy',
          instructions: `Apply a warm heating pad or warm compress to the affected area for 15-20 minutes, 2-3 times daily. Use a towel barrier to protect skin.`
        },
        topicalRelief: {
          suggestions: ['Menthol or camphor-based soothing gel', 'Magnesium or arnica cream for muscle relaxation'],
          precautions: 'Perform a small patch test on intact skin. Avoid open wounds or broken skin.'
        },
        nutritionRecovery: {
          foods: ['Wild fatty fish (rich in omega-3 fatty acids)', 'Blueberries or mixed berries (antioxidants)', 'Leafy greens like spinach or kale'],
          notes: 'Anti-inflammatory nutrients and adequate water intake support cellular tissue repair.'
        },
        medicalConsultation: {
          urgency: 'Routine',
          guidance: `If symptoms persist beyond 10-14 days, progressively worsen, or radiate into limbs, schedule an evaluation with a licensed physician or physical therapist.`
        },
        isRedFlag: false,
        redFlagReason: '',
        disclaimer: 'This guidance is for educational and self-care recovery purposes only and does not constitute a formal medical diagnosis. Always consult a qualified physician for severe or persistent pain.'
      };
    }

    // Post-process with deterministic safety enforcement and canonical media resolution
    if (redFlagCheck.isRedFlag) {
      aiData.isRedFlag = true;
      aiData.redFlagReason = redFlagCheck.reason || aiData.redFlagReason;
      if (!aiData.medicalConsultation) aiData.medicalConsultation = {};
      aiData.medicalConsultation.urgency = 'Emergency';
      aiData.medicalConsultation.guidance = redFlagCheck.reason + ' Please seek emergency medical evaluation immediately. Do not attempt self-treatment or exercises.';
      aiData.gentleMovements = [{
        exerciseId: 'rest-and-immobility',
        name: 'Rest and Joint Protection',
        mediaType: 'youtube_search',
        demonstrationUrl: '',
        thumbnailUrl: '',
        durationText: 'Active Rest',
        startingPosition: 'Supported, neutral resting position with no weight-bearing stress.',
        movementDirection: 'No active movement. Avoid loading, stretching, or bending.',
        repsOrDuration: 'Continuous rest until evaluated by a qualified physician.',
        breathingGuidance: 'Calm, slow breathing to help ease distress.',
        stopSigns: 'Seek emergency medical evaluation immediately.',
        instructions: [
          'Support the affected area in a comfortable, neutral position.',
          'Do not attempt stretching or exercise while acute red-flag symptoms are present.',
          'Contact emergency medical services or proceed to urgent care immediately.'
        ],
        description: 'Rest and joint immobilization are prioritized over active movement during acute warning signs.',
        precautions: 'Do not attempt stretching or exercise while acute red-flag symptoms are present.',
        youtubeSearchUrl: 'https://www.youtube.com/results?search_query=emergency+medical+evaluation'
      }];
    } else {
      // 1. Resolve any AI recommended movements through canonical media resolver
      let resolvedMovements = Array.isArray(aiData.gentleMovements) && aiData.gentleMovements.length > 0
        ? aiData.gentleMovements.map(rec => resolveExerciseMedia(rec, bodyPart)).filter(Boolean)
        : [];

      // 2. Guarantee suitable video demonstrations & workout info:
      // If AI returned fewer than 2 movements for a non-emergency discomfort presentation,
      // automatically backfill with matching verified canonical movements for this body part!
      if (resolvedMovements.length < 2) {
        const canonicalBackfills = getCanonicalExercisesForBodyPart(bodyPart);
        for (const backfill of canonicalBackfills) {
          if (!resolvedMovements.some(m => m.exerciseId === backfill.id)) {
            resolvedMovements.push(resolveExerciseMedia(backfill, bodyPart));
          }
          if (resolvedMovements.length >= 3) break;
        }
      }

      aiData.gentleMovements = resolvedMovements;
    }

    // Ensure standard disclaimer is always present
    aiData.disclaimer = 'This guidance is for educational and self-care recovery purposes only and does not constitute a formal medical diagnosis or prescription. If you experience severe, spreading, or persistent symptoms, consult a qualified physician.';

    // Save to MongoDB if user consent is given and user is authenticated
    let savedAssessmentId = null;
    if (consentGiven && req.user?._id) {
      try {
        const newAssessment = await BodyCareAssessment.create({
          user: req.user._id,
          bodyPart,
          bodySide,
          symptoms: {
            painType: symptoms.painType || 'dull ache',
            onset: symptoms.onset || 'recent',
            severity: symptoms.severity || 5,
            isInjury: Boolean(symptoms.isInjury),
            injuryDetails: symptoms.injuryDetails || '',
            additionalSymptoms: symptoms.additionalSymptoms || [],
            userDescription: symptoms.userDescription || ''
          },
          aiGuidance: aiData,
          followUpChat: [],
          consentGiven: true
        });
        savedAssessmentId = newAssessment._id;
      } catch (saveErr) {
        console.error('[BodyCare AI] Error saving assessment to DB:', saveErr.message);
        // We do not fail the request if DB save failed, just proceed with response
      }
    }

    return res.json({
      assessmentId: savedAssessmentId,
      bodyPart,
      bodySide,
      symptoms,
      guidance: aiData
    });
  } catch (error) {
    console.error('[BodyCare AI] Internal Controller Error:', error);
    return res.status(500).json({
      message: 'Server error processing BodyCare AI assessment. Please try again.',
      error: error.message
    });
  }
};

/**
 * POST /api/bodycare/chat
 * Interactive follow-up conversation about an active BodyCare assessment.
 */
export const bodyCareFollowUp = async (req, res) => {
  try {
    const {
      assessmentId,
      bodyPart,
      symptoms = {},
      initialGuidance = {},
      guidance = {},
      messages = [],
      chatHistory = [],
      message
    } = req.body;

    const activeGuidance = Object.keys(guidance).length > 0 ? guidance : initialGuidance;
    let conversationList = Array.isArray(messages) && messages.length > 0 
      ? [...messages] 
      : (Array.isArray(chatHistory) && chatHistory.length > 0 ? [...chatHistory] : []);

    if (message && typeof message === 'string' && message.trim()) {
      if (conversationList.length === 0 || conversationList[conversationList.length - 1].content !== message.trim()) {
        conversationList.push({ role: 'user', content: message.trim() });
      }
    }

    if (!conversationList || conversationList.length === 0) {
      return res.status(400).json({ message: 'At least one chat message is required.' });
    }

    const latestUserMessage = conversationList[conversationList.length - 1];
    if (!latestUserMessage || !latestUserMessage.content) {
      return res.status(400).json({ message: 'Valid message content is required.' });
    }

    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_API_KEY) {
      return res.status(503).json({
        message: 'AI guidance is temporarily unavailable. Groq API service is not configured.'
      });
    }

    // Construct context-rich conversation prompt
    const systemPrompt = {
      role: 'system',
      content: `You are BodyCare AI, the physical recovery and body care assistant for FitKart.
You are in a follow-up conversation with a user about their reported discomfort in their ${bodyPart || 'body'}.

CURRENT ASSESSMENT CONTEXT:
- Body Part: ${bodyPart || 'Selected area'}
- Pain Type: ${symptoms.painType || 'Unspecified'}
- Duration: ${symptoms.onset || 'Recent'}
- Severity: ${symptoms.severity || 'Moderate'} / 10
- Injury Status: ${symptoms.isInjury ? 'Yes' : 'No'}
${activeGuidance?.possibleExplanations ? `- Possible Explanations Discussed: ${activeGuidance.possibleExplanations.join(', ')}` : ''}
${activeGuidance?.thermalTherapy?.recommendation ? `- Thermal Therapy Suggested: ${activeGuidance.thermalTherapy.recommendation}` : ''}
${activeGuidance?.isRedFlag ? `- RED FLAG DETECTED: ${activeGuidance.redFlagReason}` : ''}

CRITICAL RULES:
1. Always maintain assessment context.
2. Provide compassionate, practical, and clear recovery advice.
3. Be concise and conversational (2-4 paragraphs or crisp bullet points).
4. NEVER provide a definitive medical diagnosis, prescribe drugs, or guarantee cures.
5. If the user reports worsening symptoms, sudden numbness, chest pain, or loss of function, urge immediate in-person medical assessment.
6. If the user asks in Tanglish (Tamil in English letters) or Tamil, answer helpfully in Tanglish. Otherwise answer in English.`
    };

    // Format previous messages for Groq API
    const formattedMessages = [
      systemPrompt,
      ...conversationList.slice(-8).map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content
      }))
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: formattedMessages,
        temperature: 0.3,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[BodyCare AI Chat Error]:', errText);
      return res.status(503).json({
        message: 'AI guidance is temporarily unavailable. Please try again in a few seconds.'
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'I could not generate a response at this time. Please try asking again.';

    // If assessmentId is provided and valid, update the chat history in MongoDB
    if (assessmentId && req.user?._id) {
      try {
        await BodyCareAssessment.findOneAndUpdate(
          { _id: assessmentId, user: req.user._id },
          {
            $push: {
              followUpChat: {
                $each: [
                  { role: 'user', content: latestUserMessage.content, timestamp: new Date() },
                  { role: 'assistant', content: reply, timestamp: new Date() }
                ]
              }
            }
          }
        );
      } catch (dbErr) {
        console.error('[BodyCare AI] Failed to append chat to assessment:', dbErr.message);
      }
    }

    return res.json({ reply });
  } catch (error) {
    console.error('[BodyCare AI Chat Controller Error]:', error);
    return res.status(500).json({
      message: 'Server error processing follow-up response.',
      error: error.message
    });
  }
};

/**
 * GET /api/bodycare/history
 * Fetch past assessments for the authenticated user.
 */
export const getSavedAssessments = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: 'Authentication required to access saved assessments.' });
    }

    const assessments = await BodyCareAssessment.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return res.json(assessments);
  } catch (error) {
    console.error('[BodyCare AI History Error]:', error);
    return res.status(500).json({ message: 'Failed to retrieve assessment history.' });
  }
};

/**
 * DELETE /api/bodycare/history/:id
 * Delete a specific saved assessment for the authenticated user.
 */
export const deleteAssessment = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    const assessment = await BodyCareAssessment.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found or unauthorized.' });
    }

    return res.json({ message: 'Assessment deleted successfully.' });
  } catch (error) {
    console.error('[BodyCare AI Delete Error]:', error);
    return res.status(500).json({ message: 'Failed to delete assessment.' });
  }
};
