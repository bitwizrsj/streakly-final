import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    interval: { type: String, default: '1 day' },  // Storing interval as a string
    completions: { type: [String], default: [] },  // Array of completion dates (ISO string format)
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Associate with User
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
