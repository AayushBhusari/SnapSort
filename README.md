# 🖼 SnapSortAI - Organize Your Memories

## Project link - [SnapSortAI](https://snapsortai.netlify.app/) [![Netlify Status](https://api.netlify.com/api/v1/badges/1a151f5a-12e2-4128-8c2d-66ec970a5cc6/deploy-status)](https://app.netlify.com/projects/snapsortai/deploys)

## SnapSortAI is a playful, easy-to-use image gallery where you can upload, organize, and keep all your favorite pictures in one place. Effortlessly manage your snapshots while having fun!

## 🌐 Tech Stack

- **NextJS** – Frontend and API routes
- **Cloudinary** – Image hosting and processing
- **Firebase (Firestore)** – User-specific metadata storage
- **Clerk** – Authentication & user management
- **Tailwind CSS** – Modern, responsive UI

---

## 🚀 Features

- Upload multiple images at once 🖼
- Images are automatically stored on Cloudinary
- Metadata (name, tags, upload time, public ID) is saved in **user-specific Firestore subcollections**
- Authenticated users via Clerk
- Handles large uploads efficiently with parallel processing
- Modern, minimal, and responsive UI with Tailwind CSS

---

## 🧑‍💻 How to Run (Step-by-Step)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/SnapSort.git
cd SnapSort
```

### 2️⃣ Set Up Environment Variables

Create a `.env` file in the project root:

```bash
touch .env
```

Add the following:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_PRESET=your_preset_if_needed
```

Also configure Firebase credentials in `lib/firebase.ts` (or wherever your Firebase instance is initialized).

---

### 3️⃣ Install Dependencies

```bash
npm install
```

---

### 4️⃣ Run Development Server

```bash
npm run dev
```

Now go to: [http://localhost:3000](http://localhost:3000)

---

## 🧠 How It Works

1. User selects images to upload in the UI.
2. Each image is uploaded to **Cloudinary** via a Next.js API route.
3. The server returns the image URL and metadata.
4. Metadata is saved under the authenticated user’s document in Firestore:

```
users (collection)
  └── userId (document)
       └── uploadedImages (subcollection)
            ├── image1 (document)
            ├── image2 (document)
```

---

## 🧑‍💻 Example Metadata Saved in Firestore

```json
{
  "name": "sunset.png",
  "tags": ["nature", "sky"],
  "uploadedAt": "2025-10-17T09:22:45.123Z",
  "url": "https://res.cloudinary.com/your_cloud/image/upload/v12345/sunset.png",
  "public_id": "snapsort_uploads/abc"
}
```

---

## 📃 License

This project is **open-source** and free to use. Feel free to fork, modify, or integrate into your own projects!

---
