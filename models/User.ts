import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  mobile_number: string;
  address: string;
  post_count: number;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    mobile_number: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    post_count: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>('User', UserSchema);

export { User, IUser };
