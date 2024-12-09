"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";
import { PriceRange } from "../PriceRange";

export default function RoomFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("query") || "");

  const handleValueChange = (newValue: any) => {
    setSearch(newValue);
    let newUrl = "";

    if (newValue != 0) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "query",
        value: newValue.toString(),
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["query"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="search">Search Rooms</Label>
        <Input
          id="search"
          type="text"
          placeholder="Search by name or description"
          value={search}
          onChange={(e) => handleValueChange(e.target.value)}
          name="query"
        />
      </div>
      <div className="space-y-2">
        <PriceRange />
      </div>
    </div>
  );
}
