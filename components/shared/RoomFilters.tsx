"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Form from "next/form";

export default function RoomFilters() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("query") || "");
  const [priceRange, setPriceRange] = useState([0, 500]);

  return (
    <Form action="/rooms" className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="search">Search Rooms</Label>
        <Input
          id="search"
          type="text"
          placeholder="Search by name or description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          name="query"
        />
      </div>
      <div className="space-y-2">
        <Label>Price Range (per hour)</Label>
        <Slider
          min={0}
          max={500}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          name="price"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      <Button type="submit" className="w-full">
        Apply Filters
      </Button>
    </Form>
  );
}
