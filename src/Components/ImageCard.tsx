import Image from "next/image";
import React from "react";

interface UploadedFile {
  id: string;
  file: File;
  name: string;
  tags: string[];
}

interface ImageCardProps {
  img: UploadedFile;
  selected?: UploadedFile;
  onSelect: (img: UploadedFile) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ img, selected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(img)}
      className={`rounded-xl overflow-hidden cursor-pointer transform transition-shadow hover:scale-105 shadow-md ${
        selected?.id === img.id ? "ring-4 ring-cyan-200" : ""
      }`}
    >
      <Image
        src={img.id}
        alt={img.name}
        className="w-full h-40 object-cover"
        width={480}
        height={480}
      />
      <div className="p-3 bg-white/60">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium truncate">{img.name}</div>
          <div className="text-xs text-slate-500">{img.tags.length} tags</div>
        </div>
        <div className="mt-2 flex gap-2 flex-wrap">
          {img.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="px-2 py-1 text-xs rounded-full bg-pink-50/70 text-pink-700"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
