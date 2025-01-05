import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

interface IPost extends Document {
  title: string;
  description: string;
  user_id: IUser['_id'];
  images: string[];
}

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    images: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model<IPost>('Post', PostSchema);

export { Post, IPost };
