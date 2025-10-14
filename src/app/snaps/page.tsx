"use client";

import React, { useState } from "react";
import UploadArea from "@/Components/UploadArea";
import Gallery from "@/Components/Gallery";
import TagEditor from "@/Components/TagEditor";
import AiPanel from "@/Components/Aipanel";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ---------------- Interfaces ----------------
interface UploadedFile {
  id: string;
  file: File;
  name: string;
  tags: string[];
}

// ---------------- Main SnapSort Component ----------------
export default function Page() {
  const [images, setImages] = useState<UploadedFile[]>([]);
  const [selected, setSelected] = useState<UploadedFile | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  const handleFiles = (newImages: UploadedFile[]) => {
    setImages((prev) => [...newImages, ...prev]);
  };

  const toggleSelect = (img: UploadedFile) => {
    const isSelected = selected && selected.id === img.id;
    const newSelected = isSelected ? null : img;
    setSelected(newSelected);

    if (newSelected && newSelected.file) {
      // fetch AI tags only for the newly selected image
      AiSuggest(newSelected.file);
    } else {
      setAiSuggestions([]); // clear AI suggestions if deselected
    }
  };

  const rescan = () => {
    if (selected && selected.file) AiSuggest(selected.file);
  };

  const addTag = (tag: string) => {
    if (!selected) return;
    setImages((list) =>
      list.map((i) =>
        i.id === selected.id
          ? { ...i, tags: Array.from(new Set([...i.tags, tag])) }
          : i
      )
    );
    setSelected((s) =>
      s ? { ...s, tags: Array.from(new Set([...(s.tags || []), tag])) } : s
    );
  };

  const removeTag = (tag: string) => {
    if (!selected) return;
    setImages((list) =>
      list.map((i) =>
        i.id === selected.id
          ? { ...i, tags: i.tags.filter((t) => t !== tag) }
          : i
      )
    );
    setSelected((s) =>
      s ? { ...s, tags: (s.tags || []).filter((t) => t !== tag) } : s
    );
  };

  // ---------------- AI Tag Generation ----------------
  const AiSuggest = async (selectedFile: File) => {
    if (!selectedFile) return;
    setAiSuggestions(["fetching-tags..."]);

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API || "YOUR_API_KEY";
    const genAI = new GoogleGenerativeAI(apiKey);

    const systemPrompt =
      "Generate relevant descriptive tags for this image. Limit to 5 tags, no spaces or special characters.";

    try {
      // Convert image file to base64
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(",")[1]);
        };
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(selectedFile);
      });

      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const result = await model.generateContent([
        {
          inlineData: {
            mimeType: selectedFile.type,
            data: base64Data,
          },
        },
        { text: systemPrompt },
      ]);

      const aiText = result.response?.text() || "";
      const tags = aiText
        .split(/,|\n|\s/)
        .map((t) => t.trim())
        .filter((t) => t.length > 0)
        .slice(0, 5);

      setAiSuggestions(tags);
    } catch (err) {
      console.error("Gemini API error:", err);
      setAiSuggestions(["error-fetching-tags"]);
    }
  };

  const saveAll = () => {
    // Add multer and cloudinary to send to backend and save there
    alert(`Saved ${images.length} images with tags!`);
  };

  // ---------------- JSX ----------------
  return (
    <div className="min-h-screen p-6 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#b5f3f1] via-[#fbc2eb] to-[#fff4e6] flex flex-col gap-6">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-col gap-6">
          <UploadArea onFiles={handleFiles} />
          <Gallery
            images={images}
            selected={selected ?? undefined}
            onSelect={toggleSelect}
          />
        </div>

        <aside className="rounded-2xl p-6 bg-gradient-to-br from-white/60 to-white/30 shadow-lg flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4 className="font-poppins text-lg">Tag Editor</h4>
            <div className="text-sm text-slate-600">
              {selected ? "Editing" : "No image selected"}
            </div>
          </div>

          <TagEditor
            selected={selected ?? undefined}
            addTag={addTag}
            removeTag={removeTag}
          />
          <AiPanel
            suggestions={aiSuggestions}
            selected={selected ?? undefined}
            addTag={addTag}
            rescan={rescan}
          />

          <div className="mt-auto flex gap-3">
            <button
              onClick={saveAll}
              className="flex-1 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-pink-400 text-white font-semibold shadow-lg"
            >
              Save All
            </button>
            <button
              onClick={() => {
                setImages([]);
                setSelected(null);
              }}
              className="px-4 py-3 rounded-full bg-white/60 backdrop-blur-sm"
            >
              Clear
            </button>
          </div>
        </aside>
      </section>

      <footer className="text-center text-sm text-slate-600">
        Made with ✨ for your memories — SnapSort
      </footer>
    </div>
  );
}
