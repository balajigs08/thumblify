import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import toast from "react-hot-toast";

import api from "../configs/api";

import AspectRatioSelector from "../components/AspectRatioSelector";
import StyleSelector from "../components/StyleSelector";
import ColorSchemeSelector from "../components/ColorSchemeSelector";

import {
  colorSchemes,
  type AspectRatio,
  type ThumbnailStyle,
  type IThumbnail,
} from "../assets/assets";

const Generate = () => {

  // ================= URL PARAM =================

  const { id } = useParams();

  // ================= STATES =================

  const [title, setTitle] = useState("");

  const [additionalDetails, setAdditionalDetails] =
    useState("");

  const [thumbnail, setThumbnail] =
    useState<IThumbnail | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [aspectRatio, setAspectRatio] =
    useState<AspectRatio>("16:9");

  const [colorSchemeId, setColorSchemeId] =
    useState<string>(colorSchemes[0].id);

  const [style, setStyle] =
    useState<ThumbnailStyle>("Bold & Graphic");

  const [styleDropdownOpen, setStyleDropdownOpen] =
    useState(false);

  // ================= FETCH THUMBNAIL =================

  useEffect(() => {

    const fetchThumbnail = async () => {

      try {

        if (!id) return;

        const { data } = await api.get(
          `/user/thumbnail/${id}`
        );

        const thumb = data.thumbnail;

        if (thumb) {

          setTitle(thumb.title || "");

          setAdditionalDetails(
            thumb.user_prompt || ""
          );

          setStyle(
            thumb.style || "Bold & Graphic"
          );

          setAspectRatio(
            thumb.aspect_ratio || "16:9"
          );

          setColorSchemeId(
            thumb.color_scheme || "vibrant"
          );

          setThumbnail(thumb);
        }

      } catch (error) {

        console.log(error);
      }
    };

    fetchThumbnail();

  }, [id]);

  // ================= GENERATE =================

  const handleGenerate = async () => {

    try {

      if (!title.trim()) {

        return toast.error(
          "Title is required"
        );
      }

      setLoading(true);

      // ✅ PAYLOAD

      const api_payload = {

        title,

        prompt: additionalDetails,

        style,

        aspect_ratio: aspectRatio,

        color_scheme: colorSchemeId,

        text_overlay: true,
      };

      // ✅ API CALL

      const { data } = await api.post(

        "/thumbnail/generate",

        api_payload
      );

      console.log(data);

      // ✅ SET THUMBNAIL

      if (data.thumbnail) {

        setThumbnail(data.thumbnail);

        toast.success(

          data.message ||

          "Thumbnail Generated"
        );

      } else {

        toast.error(
          "Generation failed"
        );
      }

    } catch (error: any) {

      console.log(error);

      toast.error(

        error?.response?.data?.message ||

        error.message ||

        "Generation Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  // ================= UI =================

  return (

    <div className="min-h-screen text-white px-4 pt-24 pb-10">

      <main className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

        {/* ================= LEFT ================= */}

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl space-y-5">

          <div>

            <h2 className="text-xl font-semibold">
              Create Your Thumbnail
            </h2>

            <p className="text-sm text-zinc-400">
              Describe your vision and let AI bring it to life
            </p>

          </div>

          {/* ================= TITLE ================= */}

          <div>

            <label className="text-sm text-zinc-300">
              Title or Topic
            </label>

            <input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              maxLength={100}
              placeholder="e.g. AI Agent using N8N"
              className="mt-2 w-full rounded-md bg-black/30 border border-white/10 px-3 py-2 text-sm outline-none"
            />

            <p className="text-xs text-right text-zinc-500 mt-1">
              {title.length}/100
            </p>

          </div>

          {/* ================= ASPECT RATIO ================= */}

          <AspectRatioSelector
            value={aspectRatio}
            onChange={setAspectRatio}
          />

          {/* ================= STYLE ================= */}

          <StyleSelector
            value={style}
            onChange={setStyle}
            isOpen={styleDropdownOpen}
            setIsOpen={setStyleDropdownOpen}
          />

          {/* ================= COLOR ================= */}

          <ColorSchemeSelector
            value={colorSchemeId}
            onChange={setColorSchemeId}
          />

          {/* ================= PROMPT ================= */}

          <div>

            <label className="text-sm text-zinc-300">
              Additional Prompts (optional)
            </label>

            <textarea
              value={additionalDetails}
              onChange={(e) =>
                setAdditionalDetails(
                  e.target.value
                )
              }
              rows={3}
              placeholder="Add any specific elements..."
              className="mt-2 w-full rounded-md bg-black/30 border border-white/10 px-3 py-2 text-sm outline-none"
            />

          </div>

          {/* ================= BUTTON ================= */}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 transition py-3 rounded-md font-medium disabled:opacity-50"
          >

            {loading
              ? "Generating..."
              : "Generate Thumbnail"}

          </button>

        </div>

        {/* ================= RIGHT PREVIEW ================= */}

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl">

          <h2 className="text-xl font-semibold mb-4">
            Preview
          </h2>

          <div className="rounded-xl overflow-hidden border border-white/10 min-h-[350px] flex items-center justify-center bg-black/30">

            {loading ? (

              <p className="text-zinc-400">
                Generating Thumbnail...
              </p>

            ) : thumbnail?.image_url ? (

              <img
                src={thumbnail.image_url}
                alt="Generated Thumbnail"
                className="w-full rounded-xl"
              />

            ) : (

              <p className="text-zinc-500">
                Generate your first thumbnail
              </p>
            )}

          </div>

        </div>

      </main>

    </div>
  );
};

export default Generate;