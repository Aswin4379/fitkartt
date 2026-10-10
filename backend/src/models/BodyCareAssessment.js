import mongoose from 'mongoose';

const bodyCareAssessmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  bodyPart: {
    type: String,
    required: true,
    trim: true
  },
  bodySide: {
    type: String,
    enum: ['front', 'back', 'both'],
    default: 'front'
  },
  symptoms: {
    painType: { type: String, default: 'dull ache' },
    onset: { type: String, default: 'recent' },
    severity: { type: Number, min: 1, max: 10, default: 5 },
    isInjury: { type: Boolean, default: false },
    injuryDetails: { type: String, default: '' },
    additionalSymptoms: [{ type: String }],
    userDescription: { type: String, default: '' }
  },
  aiGuidance: {
    possibleExplanations: [{ type: String }],
    selfCareSuggestions: [{ type: String }],
    gentleMovements: [{
      exerciseId: { type: String, default: '' },
      name: { type: String },
      mediaType: { type: String, enum: ['animation', 'video', 'youtube_search'], default: 'youtube_search' },
      demonstrationUrl: { type: String, default: '' },
      thumbnailUrl: { type: String, default: '' },
      durationText: { type: String, default: '' },
      startingPosition: { type: String, default: '' },
      movementDirection: { type: String, default: '' },
      repsOrDuration: { type: String, default: '' },
      breathingGuidance: { type: String, default: '' },
      stopSigns: { type: String, default: '' },
      instructions: [{ type: String }],
      description: { type: String },
      precautions: { type: String },
      youtubeSearchUrl: { type: String, default: '' }
    }],
    movementsToAvoid: [{ type: String }],
    thermalTherapy: {
      recommendation: { type: String, default: '' },
      instructions: { type: String, default: '' }
    },
    topicalRelief: {
      suggestions: [{ type: String }],
      precautions: { type: String, default: '' }
    },
    nutritionRecovery: {
      foods: [{ type: String }],
      notes: { type: String, default: '' }
    },
    medicalConsultation: {
      urgency: { type: String, enum: ['Routine', 'Prompt', 'Emergency'], default: 'Routine' },
      guidance: { type: String, default: '' }
    },
    isRedFlag: { type: Boolean, default: false },
    redFlagReason: { type: String, default: '' },
    disclaimer: { type: String, default: '' }
  },
  followUpChat: [{
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }],
  consentGiven: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

bodyCareAssessmentSchema.index({ user: 1, createdAt: -1 });

const BodyCareAssessment = mongoose.model('BodyCareAssessment', bodyCareAssessmentSchema);

export default BodyCareAssessment;
