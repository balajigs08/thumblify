import { colorSchemes } from "../assets/assets";

const ColorSchemeSelector = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (color: string) => void;
}) => {
  return (
    <div className="space-y-3">

      {/* LABEL */}
      <label className="block text-sm font-medium text-zinc-200">
        Color Scheme
      </label>

      {/* GRID */}
      <div className="grid grid-cols-6 gap-3">

        {colorSchemes.map((scheme) => (
          <button
            key={scheme.id}
            onClick={() => onChange(scheme.id)}
            className={`
              h-12 w-full rounded-lg overflow-hidden transition-all
              ${value === scheme.id
                ? "ring-2 ring-pink-500 scale-105"
                : "hover:scale-105"}
            `}
          >

            {/* COLORS INSIDE BOX */}
            <div className="flex w-full h-full">
              {scheme.colors.map((color, i) => (
                <div
                  key={i}
                  className="flex-1"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

          </button>
        ))}

      </div>

      {/* SELECTED TEXT */}
      <p className="text-xs text-zinc-400">
        Selected:{" "}
        {colorSchemes.find((c) => c.id === value)?.name || "None"}
      </p>

    </div>
  );
};

export default ColorSchemeSelector;