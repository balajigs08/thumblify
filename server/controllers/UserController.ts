import { Request, Response } from 'express';
import Thumbnail from '../models/Thumbnail.js';

// ======================================================
// GET ALL USER THUMBNAILS
// ======================================================

export const getUsersThumbnails = async (
  req: Request,
  res: Response
) => {

  try {

    const { userId } = req.session;

    // ✅ CHECK LOGIN
    if (!userId) {

      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // ✅ FETCH THUMBNAILS
    const thumbnails = await Thumbnail.find({
      userId,
    }).sort({ createdAt: -1 });

    // ✅ RESPONSE
    return res.json({

      success: true,

      thumbnails,
    });

  } catch (error: any) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message: error.message,
    });
  }
};

// ======================================================
// GET SINGLE THUMBNAIL
// ======================================================

export const getThumbnailById = async (
  req: Request,
  res: Response
) => {

  try {

    const { userId } = req.session;

    const { id } = req.params;

    // ✅ CHECK LOGIN
    if (!userId) {

      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // ✅ FIND THUMBNAIL
    const thumbnail = await Thumbnail.findOne({

      userId,

      _id: id,
    });

    // ✅ NOT FOUND
    if (!thumbnail) {

      return res.status(404).json({

        success: false,

        message: "Thumbnail not found",
      });
    }

    // ✅ RESPONSE
    return res.json({

      success: true,

      thumbnail,
    });

  } catch (error: any) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message: error.message,
    });
  }
};