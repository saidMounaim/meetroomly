"use client";

import { useState } from "react";
import { Slider } from "../ui/slider";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function PriceRange() {
  const [price, setPrice] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleValueChange = (newValue: any) => {
    setPrice(newValue);
    let newUrl = "";

    if (newValue != 0) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "priceMax",
        value: newValue.toString(),
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["priceMax"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="grid gap-4 w-full">
      <Slider
        minStepsBetweenThumbs={10_000}
        max={300}
        min={0}
        onValueChange={handleValueChange}
        className={cn("w-full")}
      />
      <div className="flex gap-2 flex-wrap">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <span>$</span>
            <span>{0}</span>
          </div>
          <div className="flex items-center">
            <span>$</span>
            {price == 0 ? `Any` : <span>{price}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
