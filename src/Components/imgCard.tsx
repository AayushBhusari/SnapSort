"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trash2, Tag } from "lucide-react";
import Image from "next/image";

interface ImageData {
  id: string;
  public_id: string;
  url: string;
  name: string;
  tags: string[];
  uploadedAt: string;
}

interface ImgCardProps {
  img: ImageData;
  onDelete: (id: string) => void;
  onTagEdit: (id: string, newTags: string[]) => void;
}

const ImgCard: React.FC<ImgCardProps> = ({ img, onDelete, onTagEdit }) => {
  return (
    <motion.div
      layout
      className="relative group rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all bg-white flex flex-col items-center"
    >
      <div className="w-full bg-gray-50 flex justify-center items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.url}
          alt={img.name}
          className="max-w-full max-h-[500px] object-contain"
          loading="lazy"
        />
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-between p-3 text-white">
        {/* Top-right actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onDelete(img.id)}
            className="p-1 bg-white/20 rounded-lg hover:bg-red-500 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom tags */}
        <div className="flex flex-wrap gap-1">
          {img.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-white/30 px-2 py-1 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}

          <button
            onClick={() => {
              const newTag = prompt(
                "Add or edit tags (comma-separated):",
                img.tags.join(", ")
              );
              if (newTag) {
                onTagEdit(
                  img.id,
                  newTag.split(",").map((t) => t.trim())
                );
              }
            }}
            className="p-1 bg-white/20 rounded-lg hover:bg-white/40"
          >
            <Tag className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ImgCard;
