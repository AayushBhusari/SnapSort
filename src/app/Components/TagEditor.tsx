import Image from "next/image";
import React, { useState, ChangeEvent, KeyboardEvent } from "react";

interface UploadedFile {
  id: string;
  file: File;
  name: string;
  tags: string[];
}

interface TagEditorProps {
  selected?: UploadedFile;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
}

const TagEditor: React.FC<TagEditorProps> = ({
  selected,
  addTag,
  removeTag,
}) => {
  const [queryTags, setQueryTags] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQueryTags(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && queryTags.trim()) {
      addTag(queryTags.trim());
      setQueryTags("");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="min-h-[120px] rounded-xl p-4 bg-white/70 backdrop-blur-sm">
        {selected ? (
          <>
            <Image
              src={selected.id}
              alt={selected.name}
              className="w-full h-36 object-cover rounded-lg mb-3"
              width={480}
              height={480}
            />
            <div className="flex flex-wrap gap-2">
              {(selected.tags || []).map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-2 bg-white/30 px-3 py-1 rounded-full shadow-sm"
                >
                  <span className="text-sm">{t}</span>
                  <button
                    onClick={() => removeTag(t)}
                    className="text-xs opacity-70"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-sm text-slate-600">
            Select an image from the gallery to view and edit tags.
          </div>
        )}
      </div>
      <input
        value={queryTags}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full rounded-full px-4 py-2 bg-white/80 placeholder:text-slate-500"
        placeholder="Type a tag and press Enter"
        disabled={!selected}
      />
    </div>
  );
};

export default TagEditor;
