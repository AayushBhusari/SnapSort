import React from "react";

interface UploadedFile {
  id: string;
  file: File;
  name: string;
  tags: string[];
}

interface AiPanelProps {
  suggestions: string[];
  selected?: UploadedFile;
  addTag: (tag: string) => void;
  rescan: () => void;
}

const AiPanel: React.FC<AiPanelProps> = ({
  suggestions,
  selected,
  addTag,
  rescan,
}) => {
  return (
    <div className="rounded-xl p-3 bg-gradient-to-br from-cyan-50/70 to-indigo-50/60 border border-white/40 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-black/80 text-white w-12 h-12 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 12h18M3 6h18M3 18h18"
              stroke="#fff"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium">AI Suggestions</div>
          <div className="text-xs text-slate-600">
            Tap any suggestion to add it to the selected photo.
          </div>
        </div>
        <div className="text-xs text-slate-600">Live</div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {suggestions.length === 0 ? (
          <div className="text-sm text-slate-500">No suggestions yet.</div>
        ) : (
          suggestions.map((s) => (
            <button
              key={s}
              onClick={() => addTag(s)}
              className="px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm text-sm shadow-sm hover:scale-105 transition"
              disabled={!selected}
            >
              #{s}
            </button>
          ))
        )}
      </div>
      <div className="flex items-center justify-between mt-2">
        <button
          onClick={rescan}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-300 to-cyan-300 text-white font-medium shadow hover:brightness-105"
        >
          Rescan
        </button>
        <div className="text-xs text-slate-500">Model: Gemini • v1.2</div>
      </div>
    </div>
  );
};

export default AiPanel;
