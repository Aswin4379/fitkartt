import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  History,
  Shield,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Trash2,
  Clock,
  X
} from 'lucide-react';
import AppLayout from '../components/AppLayout.jsx';
import PageHeader from '../components/PageHeader.jsx';
import InteractiveBodySelector, { BODY_PARTS_METADATA } from '../components/BodyCare/InteractiveBodySelector.jsx';
import BodyCareQuestionnaire from '../components/BodyCare/BodyCareQuestionnaire.jsx';
import BodyCareResults from '../components/BodyCare/BodyCareResults.jsx';
import BodyCareFollowUpChat from '../components/BodyCare/BodyCareFollowUpChat.jsx';
import { bodyCareApi } from '../services/api.js';

export default function FitnessBodyCare() {
  const navigate = useNavigate();

  // View state: 'front' | 'back'
  const [bodyView, setBodyView] = useState('front');
  const [selectedPart, setSelectedPart] = useState('');

  // Questionnaire state
  const [formData, setFormData] = useState({
    painType: '',
    onset: '',
    severity: 4,
    injuryRelated: false,
    injuryDetails: '',
    additionalSymptoms: [],
    customDescription: '',
    consentGiven: true
  });

  // Assessment results state
  const [loading, setLoading] = useState(false);
  const [guidance, setGuidance] = useState(null);
  const [assessmentId, setAssessmentId] = useState(null);
  const [error, setError] = useState(null);

  // Follow-up chat state
  const [chatMessages, setChatMessages] = useState([]);

  // Saved history state
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyItems, setHistoryItems] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Load history when modal opens
  useEffect(() => {
    if (historyOpen) {
      fetchHistory();
    }
  }, [historyOpen]);

  const fetchHistory = async () => {
    setLoadingHistory(true);
    try {
      const data = await bodyCareApi.getHistory();
      if (Array.isArray(data)) {
        setHistoryItems(data);
      }
    } catch (err) {
      console.error('Failed to fetch history:', err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleDeleteHistory = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this saved assessment?')) return;
    try {
      await bodyCareApi.deleteHistory(id);
      setHistoryItems(prev => prev.filter(item => item._id !== id));
      if (assessmentId === id) {
        setAssessmentId(null);
      }
    } catch (err) {
      console.error('Failed to delete assessment:', err);
    }
  };

  const handleSelectHistoryItem = (item) => {
    setSelectedPart(item.bodyPart);
    setBodyView(item.bodySide || 'front');
    setFormData({
      painType: item.symptoms?.painType || '',
      onset: item.symptoms?.onset || '',
      severity: item.symptoms?.severity || 5,
      injuryRelated: item.symptoms?.injuryRelated || false,
      injuryDetails: item.symptoms?.injuryDetails || '',
      additionalSymptoms: item.symptoms?.additionalSymptoms || [],
      customDescription: item.symptoms?.customDescription || '',
      consentGiven: item.consentGiven ?? true
    });
    setGuidance(item.aiGuidance);
    setAssessmentId(item._id);
    setChatMessages(item.followUpChat || []);
    setHistoryOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit assessment to backend Groq AI service
  const handleSubmitAssessment = async () => {
    if (!selectedPart) {
      setError('Please select a body part on the body selector above.');
      return;
    }

    setLoading(true);
    setError(null);
    setGuidance(null);
    setChatMessages([]);

    const partInfo = BODY_PARTS_METADATA[selectedPart];
    const payload = {
      bodyPart: selectedPart,
      bodyPartName: partInfo?.name || selectedPart,
      bodySide: bodyView,
      symptoms: {
        painType: formData.painType,
        onset: formData.onset,
        severity: formData.severity,
        injuryRelated: formData.injuryRelated,
        injuryDetails: formData.injuryDetails,
        additionalSymptoms: formData.additionalSymptoms,
        customDescription: formData.customDescription
      },
      consentGiven: formData.consentGiven
    };

    try {
      const response = await bodyCareApi.assess(payload);
      if (response && response.guidance) {
        setGuidance(response.guidance);
        setAssessmentId(response.assessmentId || null);
        // Scroll to results
        setTimeout(() => {
          const resultsElem = document.getElementById('bodycare-results-section');
          resultsElem?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        throw new Error('AI guidance service did not return recommendations.');
      }
    } catch (err) {
      console.error('Assessment failed:', err);
      setError(err.message || 'AI guidance is temporarily unavailable. Please check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedPart('');
    setGuidance(null);
    setAssessmentId(null);
    setError(null);
    setChatMessages([]);
    setFormData({
      painType: '',
      onset: '',
      severity: 4,
      injuryRelated: false,
      injuryDetails: '',
      additionalSymptoms: [],
      customDescription: '',
      consentGiven: true
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activePartMetadata = selectedPart ? BODY_PARTS_METADATA[selectedPart] : null;

  return (
    <AppLayout showFooter>
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <button
              onClick={() => navigate('/fitness')}
              className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white mb-2 transition-colors"
            >
              <ArrowLeft size={16} /> Back to Fitness Gym
            </button>
            <h1 className="text-2xl sm:text-4xl font-black text-white flex items-center gap-3">
              BodyCare AI
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-fit-primary/20 to-teal-500/20 border border-fit-primary/30 text-xs font-bold text-fit-primary flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                <Sparkles size={13} /> Dynamic Groq AI
              </span>
            </h1>
            <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
              Select an area of discomfort, describe your symptoms, and receive personalized recovery routines, thermal therapy advice, and medical safety guidance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setHistoryOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-zinc-900 border border-white/10 hover:border-zinc-600 text-xs sm:text-sm font-bold text-white transition-all flex items-center gap-2 hover:bg-zinc-800 shadow-md"
            >
              <History size={16} className="text-teal-400" />
              <span>Assessment History</span>
            </button>

            {(selectedPart || guidance) && (
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2.5 rounded-2xl bg-zinc-900 border border-white/10 hover:border-red-500/40 text-xs sm:text-sm font-bold text-zinc-300 hover:text-red-400 transition-all flex items-center gap-2"
                title="Start fresh assessment"
              >
                <RotateCcw size={16} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 pb-28 sm:px-6 lg:px-8 mt-6 space-y-10">

        {/* SECTION 1: Interactive Body Selector & Questionnaire (If not showing guidance, or shown side by side) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Full-Body SVG Selector */}
          <div className="lg:col-span-5 bg-zinc-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col items-center sticky top-24">
            <div className="w-full flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-fit-primary">Step 1</span>
                <h2 className="text-lg font-black text-white">Target Discomfort Zone</h2>
              </div>
              {selectedPart && (
                <span className="px-3 py-1 rounded-full bg-fit-primary/10 border border-fit-primary/30 text-xs font-bold text-fit-primary flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle2 size={13} /> {activePartMetadata?.name}
                </span>
              )}
            </div>

            <InteractiveBodySelector
              selectedPart={selectedPart}
              onSelectPart={(partId) => {
                setSelectedPart(partId);
                setError(null);
              }}
              view={bodyView}
              onViewChange={(newView) => setBodyView(newView)}
            />
          </div>

          {/* Right Column: Symptom Collection Form */}
          <div className="lg:col-span-7">
            <BodyCareQuestionnaire
              selectedPart={selectedPart}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmitAssessment}
              loading={loading}
            />

            {error && (
              <div className="mt-4 p-5 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-300 text-sm flex items-start gap-3 shadow-lg">
                <AlertTriangle size={20} className="text-red-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">Guidance Generation Notice</p>
                  <p className="text-xs text-red-200/80 leading-relaxed">{error}</p>
                  <button
                    type="button"
                    onClick={handleSubmitAssessment}
                    className="mt-2 px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-xs font-bold text-white transition-all inline-flex items-center gap-1.5"
                  >
                    <RotateCcw size={13} /> Retry Assessment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 2: AI Results & Guidance Cards */}
        {guidance && (
          <div id="bodycare-results-section" className="pt-6 space-y-10 border-t border-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-fit-primary">Personalized AI Evaluation</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Recovery Blueprint for {activePartMetadata?.name || selectedPart}
                </h2>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-bold text-zinc-300 flex items-center gap-2 transition-all"
              >
                <RotateCcw size={14} /> New Assessment
              </button>
            </div>

            <BodyCareResults
              bodyPart={activePartMetadata?.name || selectedPart}
              symptoms={formData}
              guidance={guidance}
              onReset={handleReset}
            />

            {/* SECTION 3: Follow-Up Chat */}
            <div className="pt-4">
              <BodyCareFollowUpChat
                assessmentId={assessmentId}
                bodyPart={activePartMetadata?.name || selectedPart}
                symptoms={formData}
                guidance={guidance}
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
              />
            </div>
          </div>
        )}

      </div>

      {/* Assessment History Slide-over Drawer */}
      {historyOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-zinc-900 border-l border-white/10 h-full p-6 flex flex-col shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <History className="text-teal-400" size={20} />
                <h3 className="text-lg font-black text-white">Saved Assessments</h3>
              </div>
              <button
                type="button"
                onClick={() => setHistoryOpen(false)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-xs text-zinc-400 mt-2 mb-4">
              Assessments you consented to save on FitKart. Click any record to review recommendations or ask follow-up questions.
            </p>

            {loadingHistory ? (
              <div className="py-12 text-center text-zinc-400 text-sm">
                Loading history...
              </div>
            ) : historyItems.length === 0 ? (
              <div className="py-12 text-center text-zinc-500 text-sm">
                No saved assessments found.
              </div>
            ) : (
              <div className="space-y-3 flex-1">
                {historyItems.map((item) => {
                  const dateStr = item.createdAt ? new Date(item.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  }) : 'Recently';

                  return (
                    <div
                      key={item._id}
                      onClick={() => handleSelectHistoryItem(item)}
                      className="p-4 rounded-2xl bg-zinc-950/80 hover:bg-zinc-800/80 border border-white/5 hover:border-fit-primary/40 transition-all cursor-pointer group relative"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-fit-primary tracking-wider">
                            {item.bodySide} view
                          </span>
                          <h4 className="text-sm font-bold text-white group-hover:text-fit-primary transition-colors capitalize">
                            {item.bodyPart.replace('-', ' ')}
                          </h4>
                          <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">
                            {item.symptoms?.painType || 'Discomfort'} • Severity {item.symptoms?.severity}/10
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-[11px] text-zinc-500">
                            <Clock size={12} />
                            <span>{dateStr}</span>
                            {item.followUpChat?.length > 0 && (
                              <span className="px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 text-[10px] font-bold">
                                {item.followUpChat.length} follow-up(s)
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handleDeleteHistory(item._id, e)}
                          className="p-2 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-70 group-hover:opacity-100"
                          title="Delete assessment"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </AppLayout>
  );
}
