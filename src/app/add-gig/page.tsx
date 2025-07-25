import { fetchSetlistsByArtist } from "@/app/api/setlistfm";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function AddGig({
  searchParams,
}: {
  searchParams: { artist?: string };
}) {
  const params = await searchParams;
  const artist = params.artist;
  const setlists = artist ? await fetchSetlistsByArtist(artist) : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Add a New Gig</h1>
      <Card className="w-full max-w-4xl m-4">
        <CardHeader>
          <CardTitle>Search for an Artist</CardTitle>
        </CardHeader>
        <CardContent>
          <form method="GET" className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter artist name..."
              name="artist"
            />
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>

      {setlists &&
        setlists.map((setlist: any, index: number) => (
          <Card
            key={index}
            className="w-full max-w-4xl my-1 bg-white shadow-sm"
          >
            <CardHeader className="py-2 px-4">
              <CardTitle className="text-lg">
                {setlist.eventDate} — {setlist.venue?.name},{" "}
                {setlist.venue?.city?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {setlist.tour
                  ? `Tour: ${setlist.tour?.name}`
                  : "No tour info available"}
              </p>
            </CardContent>
            <CardAction className="flex justify-end p-4">
              <Button variant="default">Add This Gig</Button>
            </CardAction>
          </Card>
        ))}
    </div>
  );
}
