import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  // Redirect to dashboard if user is authenticated
  if (userId) {
    redirect("/dashboard");
  }

  return <h1>Welcome to GigLog</h1>;
}
