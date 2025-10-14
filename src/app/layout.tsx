import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SnapSort - AI Photo Organizer",
  description: "Chill. Tag. Organize — let the AI vibe with your photos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-teal-50 via-lavender-100 to-pink-50 min-h-screen`}
        >
          <Header />
          <main className="px-6 md:px-12">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
