/*------------------------------------------
// ARTISTS ROUTING
------------------------------------------*/
const express = require("express");
const router = new express.Router();

const artistModel = require("../models/Artist");
const albumModel = require("../models/Album");
const fileUploader = require("../config/cloudinary");

const getAverageRate = async (idArtist) => {
  // use agregate features @ mongo db to code this feature
  // https://docs.mongodb.com/manual/aggregation/
};

router.get("/artists", async (req, res, next) => {
  // let's determine the sort query object ()
  const sortQ = req.query.sort
    ? { [req.query.sort]: Number(req.query.order) }
    : {};
  // let's do the same with the limit query object
  const limitQ = req.query.limit ? Number(req.query.limit) : 10;

  // console.log("sort and limit artists ? > ", sortQ, limitQ);
  artistModel
    .find({})
    .populate("style")
    .sort(sortQ)
    .limit(limitQ)
    .then(async (artists) => {
      const artistsWithRatesAVG = await Promise.all(
        artists.map(async (res) => {
          // AVG : things are getting tricky here ! :)
          // the following map is async, updating each artist with an avg rate
          const copy = res.toJSON(); // copy the artist object (mongoose response are immutable)
          // copy.avg = await getAverageRate(res._id); // get the average rates fr this artist

          copy.isFavorite =
            req.user &&
            req.user.favorites.artists.includes(copy._id.toString());
          return copy; // return to the mapped result array
        })
      );

      res.json({ artists: artistsWithRatesAVG }); // send the augmented result back to client
    })
    .catch(next);
});

router.get("/artists/:id", async (req, res, next) => {
  try { 
      const fetched = await artistModel.findById(req.params.id);
      res.status(200).json({...fetched, msg: "fetched artist" });
    } catch (err) {
      next(err);
    }
});

router.get("/filtered-artists", (req, res, next) => {
  res.status(200).json({ msg: "@todo" });
});

router.post(
  "/artists",
  fileUploader.single("picture"),

  async (req, res, next) => {
    const picture = req.file?.path || undefined;
    try { 
      const created = await artistModel.create({...req.body,picture});
      res.status(200).json({ ...created, msg: "created new artist" });
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/artists/:id",
  fileUploader.single("picture"),
  async (req, res, next) => {
    try {
      const updated = await artistModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json({...updated, msg: "this is the updated element" });
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/artists/:id", (req, res, next) => {
  res.status(200).json({ msg: "@todo" });
});

module.exports = router;
