import mongoose from "mongoose";

const securityQuestionSchema = new mongoose.Schema({
  question: { 
    type: String, 
    required: true 
  },
  answer: { 
    type: String, 
    required: true 
  }
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  googleId: {
    type: String
  },
  twoFactorSecret: String,
  isTwoFactorEnabled: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  lastLogin: Date,
  loginAttempts: {
    type: Number,
    default: 0
  },
  isLocked: {
    type: Boolean,
    default: false
  },
  securityQuestions: {
    type: [securityQuestionSchema],
    validate: [
      {
        validator: function(questions) {
          return questions.length <= 3;
        },
        message: 'Cannot have more than 3 security questions'
      },
      {
        validator: function(questions) {
          const questionTexts = questions.map(q => q.question);
          return new Set(questionTexts).size === questionTexts.length;
        },
        message: 'Cannot have duplicate security questions'
      }
    ]
  },
  profile: {
    phoneNumber: String,
    address: String,
    preferences: Object
  }
});

export const User = mongoose.model('User', UserSchema);