import { model, Schema, Document } from 'mongoose';

export interface IPost extends Document {
  title: string,
  link: string,
  description: string,
};

const PostSchema: Schema = new Schema({
  title: { type: String, require: true },
  link: { type: String, require: true },
  description: { type: String, require: true },
})

export default model('Post', PostSchema);
