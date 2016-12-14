import mongoose from 'mongoose';

const options = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};

const articleSchema = mongoose.Schema({
  id: String,
  content: String,
  // authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  tags: { type: [String], default: [] },
}, options);

export const Article = mongoose.model('Article', articleSchema);
