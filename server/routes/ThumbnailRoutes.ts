import express from 'express';

import {
  generateThumbnail,
  deleteThumbnail
} from '../controllers/ThumbnailController.js';

import protect from '../middlewares/auth.js';

const ThumbnailRouter = express.Router();

// ======================================================
// 🚀 GENERATE THUMBNAIL
// ======================================================

ThumbnailRouter.post(

  '/generate',

  (req, res, next) => {

    console.log("🔥 /generate ROUTE HIT");

    next();
  },

  protect,

  generateThumbnail
);

// ======================================================
// ❌ DELETE THUMBNAIL
// ======================================================

ThumbnailRouter.delete(

  '/delete/:id',

  protect,

  deleteThumbnail
);

export default ThumbnailRouter;