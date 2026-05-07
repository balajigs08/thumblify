import { useEffect, useState } from "react";
import SoftBackdrop from "../components/SoftBackdrop";
import type { IThumbnail } from "../assets/assets";
import { useNavigate, Link } from "react-router-dom";

import {
  Trash2,
  Download,
  ArrowUpRight,
  Loader2,
} from "lucide-react";

import axios from "axios";

const MyGeneration = () => {

  const navigate = useNavigate();

  const [thumbnails, setThumbnails] = useState<IThumbnail[]>([]);

  const [loading, setLoading] = useState(true);

  // ======================================================
  // 🚀 FETCH THUMBNAILS
  // ======================================================

  const fetchThumbnails = async () => {

    try {

      const { data } = await axios.get(
        "http://localhost:3000/api/user/thumbnails",
        {
          withCredentials: true,
        }
      );

      if (data.success) {

        setThumbnails(data.thumbnails);
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchThumbnails();

  }, []);

  // ======================================================
  // ❌ DELETE
  // ======================================================

  const handleDelete = async (id: string) => {

    try {

      await axios.delete(
        `http://localhost:3000/api/thumbnail/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      setThumbnails((prev) =>
        prev.filter((t) => t._id !== id)
      );

    } catch (error) {

      console.log(error);
    }
  };

  // ======================================================
  // ⬇ DOWNLOAD
  // ======================================================

  const handleDownload = (url: string) => {

    window.open(url, "_blank");
  };

  return (
    <>
      <SoftBackdrop />

      <div className="mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-zinc-100">
            My Generations
          </h1>

          <p className="text-sm text-zinc-400 mt-2">
            View and manage all your AI-generated thumbnails
          </p>

        </div>

        {/* LOADING */}

        {loading && (

          <div className="flex items-center justify-center py-32">

            <Loader2 className="size-10 animate-spin text-pink-500" />

          </div>
        )}

        {/* EMPTY */}

        {!loading && thumbnails.length === 0 && (

          <div className="flex flex-col items-center justify-center py-32 text-center">

            <h2 className="text-xl font-semibold text-zinc-200">
              No thumbnails yet
            </h2>

            <p className="text-zinc-500 mt-2">
              Generate your first thumbnail now 🚀
            </p>

          </div>
        )}

        {/* GRID */}

        {!loading && thumbnails.length > 0 && (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {thumbnails.map((thumb) => {

              const fullImageUrl =
                thumb.image_url?.startsWith("http")
                  ? thumb.image_url
                  : `http://localhost:3000${thumb.image_url}`;

              return (

                <div
                  key={thumb._id}

                  onClick={() =>
                    navigate(`/generate/${thumb._id}`)
                  }

                  className="group relative cursor-pointer rounded-2xl bg-white/5 border border-white/10 overflow-hidden shadow-xl hover:shadow-2xl transition duration-300"
                >

                  {/* IMAGE */}

                  <div className="aspect-video overflow-hidden">

                    <img
                      src={fullImageUrl}
                      alt={thumb.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />

                  </div>

                  {/* ACTIONS */}

                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition"
                  >

                    {/* DELETE */}

                    <button
                      onClick={() =>
                        handleDelete(thumb._id)
                      }
                      className="bg-black/60 hover:bg-red-600 p-2 rounded-lg transition"
                    >

                      <Trash2 className="size-4 text-white" />

                    </button>

                    {/* DOWNLOAD */}

                    <button
                      onClick={() =>
                        handleDownload(fullImageUrl)
                      }
                      className="bg-black/60 hover:bg-pink-600 p-2 rounded-lg transition"
                    >

                      <Download className="size-4 text-white" />

                    </button>

                    {/* PREVIEW */}

                    <Link
                      target="_blank"
                      to={`/preview?thumbnail_url=${encodeURIComponent(
                        fullImageUrl
                      )}&title=${encodeURIComponent(
                        thumb.title
                      )}`}
                      className="bg-black/60 hover:bg-pink-600 p-2 rounded-lg transition"
                    >

                      <ArrowUpRight className="size-4 text-white" />

                    </Link>

                  </div>

                  {/* CONTENT */}

                  <div className="p-4">

                    <h3 className="text-sm font-semibold text-zinc-100 line-clamp-2">

                      {thumb.title}

                    </h3>

                    <div className="flex flex-wrap gap-2 mt-3">

                      <span className="px-2 py-1 rounded-md bg-white/10 text-xs text-zinc-300">
                        {thumb.style}
                      </span>

                      <span className="px-2 py-1 rounded-md bg-white/10 text-xs text-zinc-300">
                        {thumb.color_scheme}
                      </span>

                      <span className="px-2 py-1 rounded-md bg-white/10 text-xs text-zinc-300">
                        {thumb.aspect_ratio}
                      </span>

                    </div>

                    <p className="text-xs text-zinc-500 mt-3">

                      {new Date(
                        thumb.createdAt!
                      ).toDateString()}

                    </p>

                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default MyGeneration;