import { Schema, model, Document, Types } from "mongoose";

export interface IArtist extends Document {
  _id: Types.ObjectId;
  id: number;
  name: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  nb_album: number;
  nb_fan: number;
  radio: boolean;
  tracklist: string;
}

const artistSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  link: { type: String, required: true },
  picture: { type: String, required: true },
  picture_small: { type: String, required: true },
  picture_medium: { type: String, required: true },
  picture_big: { type: String, required: true },
  picture_xl: { type: String, required: true },
  nb_album: { type: Number, required: true },
  nb_fan: { type: Number, required: true },
  radio: { type: Boolean, required: true },
  tracklist: { type: String, required: true },
});

export default model<IArtist>("Artist", artistSchema);
