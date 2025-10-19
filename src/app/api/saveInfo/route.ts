import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/firebase";
import { collection, doc, addDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { uploads } = body; // <-- expect an array of uploads
    if (!uploads || !Array.isArray(uploads)) {
      return NextResponse.json(
        { error: "No uploads provided" },
        { status: 400 }
      );
    }

    const userDocRef = doc(db, "users", userId);

    // Save each uploaded image
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const savePromises = uploads.map((img: any) =>
      addDoc(collection(userDocRef, "uploadedImages"), {
        url: img.url,
        name: img.name,
        tags: img.tags || [],
        uploadedAt: img.uploadedAt || new Date().toISOString(),
        public_id: img.public_id,
      })
    );

    await Promise.all(savePromises);

    return NextResponse.json({ message: "All images saved successfully!" });
  } catch (err) {
    console.error("Firestore save error:", err);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
