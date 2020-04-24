import { Schema, model, Document, Types } from "mongoose";
import { IArtist } from "./artist.model";

export interface IUser extends Document {
  id?: string;
  login: string;
  password: string;
  artists: Types.ObjectId[] | IArtist[];
}

const userSchema = new Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  artists: [{ type: Types.ObjectId, ref: "Artist" }],
});

export default model<IUser>("User", userSchema);
