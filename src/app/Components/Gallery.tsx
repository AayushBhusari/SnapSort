import React from "react";
import ImageCard from "./ImageCard";

interface UploadedFile {
  id: string;
  file: File;
  name: string;
  tags: string[];
}

interface GalleryProps {
  images: UploadedFile[];
  selected?: UploadedFile;
  onSelect: (img: UploadedFile) => void;
}

const Gallery: React.FC<GalleryProps> = ({ images, selected, onSelect }) => {
  if (images.length === 0) {
    return (
      <div className="col-span-full rounded-xl p-8 bg-white/60 backdrop-blur-sm text-center shadow-lg">
        <div className="text-2xl">🖼️</div>
        <p className="mt-2 font-medium">Drop your photos here!</p>
        <p className="text-sm text-slate-600 mt-1">
          SnapSort will gently tag them for you.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((img) => (
        <ImageCard
          key={img.id}
          img={img}
          selected={selected}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default Gallery;
