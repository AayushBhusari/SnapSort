import React, { useRef, ChangeEvent, DragEvent } from "react";

interface UploadedFile {
  id: string;
  file: File;
  name: string;
  tags: string[];
}

interface UploadAreaProps {
  onFiles: (files: UploadedFile[]) => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onFiles }) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const handleFiles = (files: FileList) => {
    const arr: UploadedFile[] = Array.from(files).map((file) => ({
      id: URL.createObjectURL(file),
      file,
      name: file.name,
      tags: [],
    }));
    onFiles(arr);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const onPickFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className="rounded-2xl p-6 border-2 border-dashed border-white/30 bg-white/40 backdrop-blur-md shadow-lg"
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h2 className="font-poppins text-lg">Upload photos</h2>
          <p className="text-sm text-slate-700">
            Drag & drop or <span className="font-semibold">browse</span> to add
            multiple images.
          </p>
          <div className="mt-4">
            <label className="group relative flex items-center gap-3 cursor-pointer">
              <input
                ref={fileRef}
                multiple
                type="file"
                accept="image/*"
                onChange={onPickFiles}
                className="hidden"
              />
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 text-white font-medium shadow-md group-hover:scale-105 transition">
                Select files
              </div>
              <span className="text-sm text-slate-600">
                or drop images anywhere in this box
              </span>
            </label>
          </div>
        </div>
        <div className="w-full md:w-56">
          <div className="rounded-xl p-4 bg-gradient-to-br from-white/70 to-white/30 shadow-inner">
            <h3 className="font-medium">Quick Tips</h3>
            <ul className="mt-2 text-sm text-slate-700 space-y-1">
              <li>• Upload multiple files at once</li>
              <li>• Use AI suggestions to auto-tag</li>
              <li>• Click an image to edit tags</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadArea;
