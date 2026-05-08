import { Request, Response } from "express";
import Thumbnail from "../models/Thumbnail.js";

// 🎨 STYLE PROMPTS
const stylePrompts: any = {

  "Bold & Graphic":
    "eye-catching youtube thumbnail, bold typography, vibrant colors, expressive facial reaction, dramatic lighting, high contrast",

  "Tech/Futuristic":
    "futuristic youtube thumbnail, glowing UI, cyberpunk style, neon lights",

  "Minimalist":
    "clean minimalist youtube thumbnail, simple layout, soft colors",

  "Photorealistic":
    "ultra realistic youtube thumbnail, DSLR lighting, sharp focus",

  "Illustrated":
    "cartoon illustration youtube thumbnail, bold outlines, colorful",
};

// ======================================================
// 🚀 GENERATE THUMBNAIL
// ======================================================

export const generateThumbnail = async (
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

    // ✅ GET DATA
    const {
      title,
      prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay,
    } = req.body;

    // ✅ VALIDATION
    if (!title) {

      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    // ✅ FINAL PROMPT
    const finalPrompt = `
      ${stylePrompts[style] || ""}
      ${title}
      ${prompt || ""}
      youtube thumbnail
      cinematic lighting
      ultra detailed
      trending thumbnail
      high quality
    `;

    // ✅ POLLINATIONS IMAGE URL
    const imageUrl =
      `https://image.pollinations.ai/prompt/${encodeURIComponent(
        finalPrompt
      )}?width=1280&height=720&nologo=true`;

    console.log("✅ GENERATED IMAGE:", imageUrl);

    // ✅ SAVE TO DATABASE
    const thumbnail = await Thumbnail.create({

      userId,

      title,

      description: prompt || "",

      style,

      aspect_ratio,

      color_scheme,

      text_overlay,

      image_url: imageUrl,

      prompt_used: finalPrompt,

      user_prompt: prompt || "",

      isGenerating: false,
    });

    console.log("✅ SAVED IN DB");

    // ✅ RESPONSE
    return res.status(200).json({

      success: true,

      thumbnail,
    });

  } catch (error: any) {

    console.log("❌ THUMBNAIL ERROR:", error);

    return res.status(500).json({

      success: false,

      message:
        error.message ||
        "Thumbnail Generation Failed",
    });
  }
};

// ======================================================
// ❌ DELETE THUMBNAIL
// ======================================================

export const deleteThumbnail = async (
  req: Request,
  res: Response
) => {

  try {

    const { id } = req.params;

    await Thumbnail.findByIdAndDelete(id);

    return res.json({
      success: true,
    });

  } catch (error: any) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message: error.message,
    });
  }
};