import type { Metadata } from "next";
import Link from "next/link";

import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@/components/ui/button";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GigLog",
  description: "GigLog is a platform for users to log the gigs they attend.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header className="p-4 border-b">
            <SignedOut>
              <SignInButton forceRedirectUrl="/dashboard" mode="redirect">
                <Button>Sign In</Button>
              </SignInButton>
              <SignUpButton forceRedirectUrl="/dashboard" mode="redirect">
                <Button>Sign Up</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              Signed in!
              <UserButton />
            </SignedIn>
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
