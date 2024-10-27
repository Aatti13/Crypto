import mongoose from "mongoose";

const UserProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tutorial: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutorial',
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  }
})

UserProgressSchema.index({user: 1, tutorial: 1}, {unique: true});

export const UserProgress = mongoose.model('UserProgress', UserProgressSchema);