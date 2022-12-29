import express from "express";
import { nanoid } from "nanoid";
import Url from "../models/Url.js";
import { validateUrl } from "../utils/utils.js";
import dotenv from "dotenv";

dotenv.config({ path: "../config/.env" });

const router = express.Router();

// function to generate short url

router.post("/short", async (req, res) => {
  const { originalUrl, customUrl } = req.body;
  const base = process.env.BASE;
  const urlId = nanoid();

  if (validateUrl(originalUrl)) {
    try {
      let url = await Url.findOne({ originalUrl });
      //check if url exists in DB
      if (url) {
        res.json(url);
      } else {
        let shortnedUrl = "";
        //check if user added any custom url
        if (customUrl) {
          shortnedUrl = await `${base}/${customUrl}`;
        } else {
          //if not added any custom url, add a urlID
          shortnedUrl = await `${base}/${urlId}`;
        }
        url = new Url({
          originalUrl,
          shortnedUrl,
          urlId,
          date: new Date(),
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(400).json("Invalid Original URL");
  }
});

export default router;
