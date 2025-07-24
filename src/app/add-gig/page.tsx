import { fetchSetlistsByArtist } from "@/app/api/setlistfm";

export default async function AddGig() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Add a New Gig</h1>
      <Card></Card>
    </div>
  );
}
