import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RoomsList from "@/components/shared/RoomsList";
import RoomCardSkeleton from "@/components/shared/skeletons/RoomCardSkeleton";
import RoomFilters from "@/components/shared/forms/RoomFilters";

export default async function RoomsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const minPrice = (await searchParams).minPrice || undefined; // dosent exist but you can add it
  const priceMax = (await searchParams).priceMax || 500;
  const query = (await searchParams).query || undefined;
  const filters = { minPrice, priceMax, query };
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">
        All Meeting Rooms
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <Card className="lg:col-span-1 h-max">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <RoomFilters />
          </CardContent>
        </Card>
        <div className="lg:col-span-3">
          <Suspense fallback={<RoomCardSkeleton />}>
            <RoomsList where={filters} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
