import mongoose from "mongoose";

const TutorialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    typ: String,
    required: true
  },
  skillLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  contentType: {
    type: String,
    enum: ['video', 'text', 'pdf'],
    required: true
  },
  contentURL: {
    type: String
  },
  textContent: {
    type: String
  },
  order: {
    type: Number,
    required: true
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutorial'
  }],
  estimatedDuration: {
    type: Number,
    required: true
  }
},{
  timestamps: true
})

export const Tutorial = mongoose.model('Tutorial', TutorialSchema);