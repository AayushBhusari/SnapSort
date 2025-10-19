/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/lib/firebase";
import ImgCard from "@/Components/imgCard";
import { collection, query, getDocs, doc, updateDoc } from "firebase/firestore";
import { Search, SortAsc, SortDesc, Folder, Grid } from "lucide-react";

interface ImageData {
  id: string;
  public_id: string;
  url: string;
  name: string;
  tags: string[];
  uploadedAt: string;
}

export default function GalleryPage() {
  const { user } = useUser();
  const [images, setImages] = useState<ImageData[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortType, setSortType] = useState<"date" | "name">("date");
  const [groupBy, setGroupBy] = useState<"none" | "date" | "tag">("none");
  const [viewMode, setViewMode] = useState<"grid" | "folders">("grid");

  // Fetch user images from Firestore
  useEffect(() => {
    if (!user) return;
    const fetchImages = async () => {
      const q = query(collection(db, "users", user.id, "uploadedImages"));

      const snap = await getDocs(q);
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ImageData[];
      setImages(data);
      console.log(data.length);
    };
    fetchImages();
  }, [user]);

  // Filtered & sorted images
  const filteredImages = useMemo(() => {
    let imgs = [...images];

    if (search.trim() !== "") {
      imgs = imgs.filter((img) =>
        img.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }

    if (sortType === "date") {
      imgs.sort((a, b) =>
        sortOrder === "asc"
          ? new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime()
          : new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      );
    } else if (sortType === "name") {
      imgs.sort((a, b) =>
        sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    }

    return imgs;
  }, [images, search, sortType, sortOrder]);

  // Delete image
  const handleDelete = async (imgId: string, public_id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      const res = await fetch("/api/deleteImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageId: imgId, public_id }),
      });

      if (!res.ok) throw new Error("Failed to delete image");

      // Optimistically remove from UI
      setImages((prev) => prev.filter((img) => img.id !== imgId));
      alert("Image deleted successfully!");
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Something went wrong while deleting the image.");
    }
  };

  // Tag editing
  const handleTagEdit = async (id: string, newTags: string[]) => {
    if (!user) {
      alert("Please log in first.");
      return;
    }

    try {
      const docRef = doc(db, "users", user.id, "images", id);
      await updateDoc(docRef, { tags: newTags });

      setImages((prev) =>
        prev.map((img) => (img.id === id ? { ...img, tags: newTags } : img))
      );
    } catch (error) {
      console.error("Error updating tags:", error);
      alert("Failed to update tags.");
    }
  };

  // Group images by tag/date
  const grouped = useMemo(() => {
    if (groupBy === "none") return { All: filteredImages };

    const groups: Record<string, ImageData[]> = {};
    filteredImages.forEach((img) => {
      const key =
        groupBy === "date"
          ? new Date(img.uploadedAt).toDateString()
          : img.tags[0] || "Untagged";

      if (!groups[key]) groups[key] = [];
      groups[key].push(img);
    });
    return groups;
  }, [filteredImages, groupBy]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-xl font-semibold text-gray-600">Loading.....</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] p-6 flex flex-col gap-6">
      {/* Header Controls */}
      <header className="flex flex-wrap items-center justify-between gap-4 bg-white/60 backdrop-blur-md p-4 rounded-2xl shadow">
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-600" />
          <input
            type="text"
            placeholder="Search by tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-none bg-transparent focus:outline-none placeholder-gray-400 text-gray-700"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            className="bg-white/70 rounded-lg p-2 text-sm"
            value={sortType}
            onChange={(e) => setSortType(e.target.value as any)}
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
          </select>

          <button
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className="p-2 rounded-full bg-white/70 shadow"
          >
            {sortOrder === "asc" ? (
              <SortAsc className="w-4 h-4" />
            ) : (
              <SortDesc className="w-4 h-4" />
            )}
          </button>

          <select
            className="bg-white/70 rounded-lg p-2 text-sm"
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value as any)}
          >
            <option value="none">No Grouping</option>
            <option value="date">Group by Date</option>
            <option value="tag">Group by Tag</option>
          </select>

          <button
            onClick={() =>
              setViewMode((prev) => (prev === "grid" ? "folders" : "grid"))
            }
            className="p-2 rounded-full bg-white/70 shadow"
          >
            {viewMode === "grid" ? (
              <Folder className="w-4 h-4" />
            ) : (
              <Grid className="w-4 h-4" />
            )}
          </button>
        </div>
      </header>

      {/* Gallery Display */}
      <main className="flex-1 overflow-y-auto">
        {Object.entries(grouped).map(([groupName, imgs]) => (
          <section key={groupName} className="mb-8">
            {groupBy !== "none" && (
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                {groupName}
              </h3>
            )}
            {imgs.length === 0 ? (
              <p className="text-gray-500 text-center">No images yet</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto">
                {imgs.map((img) => (
                  <ImgCard
                    key={img.id}
                    img={img}
                    onDelete={() => handleDelete(img.id, img.public_id)}
                    onTagEdit={handleTagEdit}
                  />
                ))}
              </div>
            )}
          </section>
        ))}
      </main>
    </div>
  );
}
