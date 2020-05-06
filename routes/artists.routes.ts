import { Router, Request, Response } from "express";
import { default as rp } from "request-promise";
import { default as auth } from "../middlewares/auth.middleware";
import User from "../models/user.model";
import Artist, { IArtist } from "../models/artist.model";
import { Types } from "mongoose";

const artistsRouter: Router = Router();

artistsRouter.get("/", auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId).populate("artists");
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }
    return res.status(201).json({ artists: user.artists });
  } catch (error) {}
});

artistsRouter.post("/subscribe", auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }
    const userArtists = user.artists as Types.ObjectId[];
    let artist = { ...req.body };
    const possibleArtist = await Artist.findOne({ id: artist.id });
    if (possibleArtist) {
      if (userArtists.includes(possibleArtist._id)) {
        return res.status(409).json({ message: `Already subscribed to ${possibleArtist.name}` });
      }
      userArtists.push(possibleArtist._id);
      user.save();
      return res.status(201).json({ message: `subscribed to ${possibleArtist.name}` });
    }

    let newArtist = await new Artist(artist).save();
    if (!newArtist) {
      return res.status(500).json({ message: "Failed to add artist" });
    }
    userArtists.push(newArtist._id);
    user.save();
    return res.status(201).json({ message: `Subscribed to ${newArtist.name}` });
  } catch (error) {}
});

artistsRouter.post("/unsubscribe", auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }
    const { artistId } = req.body;

    const artist = await Artist.findOne({ id: artistId });
    if (!artist) {
      return res.status(500).json({ message: "Artist not found" });
    }

    user.artists = (user.artists as Types.ObjectId[]).filter((artistId) => !artistId.equals(artist._id));
    user.save();
    return res.status(201).json({ message: `Unsubscribed from ${artist.name}` });
  } catch (error) {}
});

artistsRouter.get("/search", auth, async (req: Request, res: Response) => {
  try {
    const searchResponse = await rp(`https://api.deezer.com/search/artist?q=${req.query.name}`);
    const artists = JSON.parse(searchResponse)?.data.filter((artist: IArtist) => artist.name.length < 50);
    return res.status(200).json({ artists });
  } catch (error) {
    console.log("Server error", error);
  }
});

artistsRouter.get("/:id/related", auth, async (req: Request, res: Response) => {
  try {
    const artistsResponse = await rp(`https://api.deezer.com/artist/${req.params.id}/related`);
    const artists = JSON.parse(artistsResponse)?.data;
    return res.status(200).json({ artists });
  } catch (error) {
    console.log("Server error", error);
  }
});

artistsRouter.get("/:id/albums", auth, async (req: Request, res: Response) => {
  try {
    const albumsResponse = await rp(`https://api.deezer.com/artist/${req.params.id}/albums`);
    const albums = JSON.parse(albumsResponse)
      .data.filter((album: any) => !album.title.toLowerCase().includes("remix"))
      .sort((a: any, b: any) => (a.release_date <= b.release_date ? 1 : -1));
    return res.status(200).json({ albums });
  } catch (error) {
    console.log("Server error", error);
  }
});

export default artistsRouter;
