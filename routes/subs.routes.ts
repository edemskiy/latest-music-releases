import { Router, Request, Response } from "express";
import { default as rp } from "request-promise";
import { default as moment } from "moment";
import { default as auth } from "../middlewares/auth.middleware";
import User from "../models/user.model";
import { IArtist } from "../models/artist.model";

const subsRouter: Router = Router();

subsRouter.get("/", auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId).populate("artists");
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }
    const artists = (user.artists as IArtist[]).sort((a, b) =>
      a.name < b.name ? -1 : 1
    );
    const allAlbums = await Promise.all(
      artists.map((artist) =>
        rp(`https://api.deezer.com/artist/${artist.id}/albums`)
      )
    );
    const startDate: string = moment().subtract(4, "M").format("YYYY-MM-DD");

    const latest_releases = allAlbums
      .map((artistAlbums, i) =>
        JSON.parse(artistAlbums).data.map((album: any) => ({
          ...album,
          artistName: artists[i].name,
          artistId: artists[i].id,
        }))
      )
      .flat()
      .filter(
        (album) =>
          album.release_date > startDate &&
          !album.title.toLowerCase().includes("remix")
      )
      .sort((a, b) => (a.release_date <= b.release_date ? 1 : -1));
    return res.status(201).json({ latest_releases, artists });
  } catch (error) {
    console.log("Server error", error);
  }
});

export default subsRouter;
