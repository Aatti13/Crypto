import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
  tutorial: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutorial',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  passingScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  questions: [{
    questionText: { 
      type: String, 
      required: true 
    },
    explanation: { 
      type: String, 
      required: true 
    },
    answers: [{
      answerText: { 
        type: String, 
        required: true 
      },
      isCorrect: { 
        type: Boolean, 
        required: true 
      }
    }]
  }]
});

export const Quiz = mongoose.model('Quiz', QuizSchema);