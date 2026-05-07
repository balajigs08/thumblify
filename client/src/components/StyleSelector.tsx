import type { ThumbnailStyle } from "../assets/assets";
import {
  ChevronDownIcon,
  Sparkles,
  Square,
  Image,
  PenTool,
  Cpu,
} from "lucide-react";

const StyleSelector = ({
  value,
  onChange,
  isOpen,
  setIsOpen,
}: {
  value: ThumbnailStyle;
  onChange: (style: ThumbnailStyle) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const styles: ThumbnailStyle[] = [
    "Bold & Graphic",
    "Minimalist",
    "Photorealistic",
    "Illustrated",
    "Tech/Futuristic",
  ];

  const styleDescriptions: Record<ThumbnailStyle, string> = {
    "Bold & Graphic":
      "High contrast, bold typography, striking visuals",
    Minimalist: "Clean, simple, lots of white space",
    Photorealistic: "Photo-based, natural looking",
    Illustrated: "Hand-drawn, artistic, creative",
    "Tech/Futuristic": "Modern, sleek, tech-inspired",
  };

  const styleIcons: Record<ThumbnailStyle, React.ReactNode> = {
    "Bold & Graphic": <Sparkles className="h-4 w-4" />,
    Minimalist: <Square className="h-4 w-4" />,
    Photorealistic: <Image className="h-4 w-4" />,
    Illustrated: <PenTool className="h-4 w-4" />,
    "Tech/Futuristic": <Cpu className="h-4 w-4" />,
  };

  return (
    <div className="relative space-y-3">

      {/* LABEL */}
      <label className="block text-sm font-medium text-zinc-200">
        Thumbnail Style
      </label>

      {/* BUTTON */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md border px-4 py-3 text-left transition bg-white/8 border-white/10 text-zinc-200 hover:bg-white/12"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-medium">
            {styleIcons[value]}
            <span>{value}</span>
          </div>

          <p className="text-xs text-zinc-400">
            {styleDescriptions[value]}
          </p>
        </div>

        <ChevronDownIcon
          className={`h-5 w-5 text-zinc-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* ✅ BACKDROP FIX */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* DROPDOWN */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 rounded-md border border-white/10 bg-black shadow-lg">

          {styles.map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => {
                onChange(style);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-white/10 transition ${
                value === style ? "bg-white/10" : ""
              }`}
            >
              {styleIcons[style]}

              <div>
                <p className="text-sm text-zinc-200 font-medium">
                  {style}
                </p>

                <p className="text-xs text-zinc-400">
                  {styleDescriptions[style]}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StyleSelector;