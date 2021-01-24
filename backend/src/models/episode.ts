import { model, Schema, Document } from 'mongoose';

export interface IEpisode extends Document {
  title: string,
  description: string,
};

const EpisodeSchema: Schema = new Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
})

export default model('Episode', EpisodeSchema);
