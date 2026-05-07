import type { AspectRatio, IThumbnail } from "../assets/assets";
import { ImageIcon, Loader2Icon, DownloadIcon } from "lucide-react";

const PreviewPanel = ({
  thumbnail,
  isLoading,
  aspectRatio,
}: {
  thumbnail: IThumbnail;
  isLoading: boolean;
  aspectRatio: AspectRatio;
}) => {

  const aspectClasses = {
    "16:9": "aspect-video",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
  } as Record<AspectRatio, string>;

  const onDownload = () => {
    if (!thumbnail?.image_url) return;
    window.open(thumbnail.image_url, "_blank");
  };

  return (
    <div className="w-full">

      {/* 🔥 OUTER BOX (WITH TITLE INSIDE) */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">

        {/* ✅ TITLE INSIDE */}
        <h2 className="text-sm font-semibold text-zinc-200 mb-3">
          Preview
        </h2>

        {/* 🔲 PREVIEW AREA */}
        <div
          className={`relative w-full rounded-lg border-2 border-dashed border-white/20 ${aspectClasses[aspectRatio]}`}
        >

          {/* 🔄 LOADING */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <Loader2Icon className="size-8 animate-spin text-zinc-400" />
              <p className="text-sm text-zinc-300">
                AI is creating your thumbnail...
              </p>
              <p className="text-xs text-zinc-500">
                This may take 10–20 seconds
              </p>
            </div>
          )}

          {/* 🖼 IMAGE */}
          {!isLoading && thumbnail?.image_url && (
            <div className="group relative h-full w-full">
              <img
                src={thumbnail.image_url}
                alt={thumbnail.title}
                className="h-full w-full object-cover rounded-lg"
              />

              {/* DOWNLOAD BUTTON */}
              <div className="absolute inset-0 flex items-end justify-center bg-black/20 opacity-0 transition group-hover:opacity-100">
                <button
                  onClick={onDownload}
                  className="mb-4 flex items-center gap-2 rounded-md bg-white/20 px-4 py-2 text-sm backdrop-blur hover:scale-105 transition"
                >
                  <DownloadIcon className="size-4" />
                  Download Thumbnail
                </button>
              </div>
            </div>
          )}

          {/* 📭 EMPTY STATE */}
          {!isLoading && !thumbnail?.image_url && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-3">

              <div className="flex size-16 items-center justify-center rounded-full bg-white/10">
                <ImageIcon className="size-8 text-white/50" />
              </div>

              <p className="text-sm text-zinc-300">
                Generate your first thumbnail
              </p>

              <p className="text-xs text-zinc-500">
                Fill out the form and click Generate
              </p>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;