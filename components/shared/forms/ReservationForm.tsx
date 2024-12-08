"use client";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";

const ReservationForm = () => {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");

  const handleReservation = () => {
    if (!checkInDate || !checkOutDate || !checkInTime || !checkOutTime) {
      toast.error("Pleasee fill in all fields");
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-900">
          Make a Reservation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="checkInDate" className="mb-1 block">
              Check-in
            </Label>
            <div className="flex flex-col gap-2">
              <Calendar
                mode="single"
                selected={checkInDate}
                onSelect={setCheckInDate}
                className="rounded-md border flex-1"
              />
              <Input
                type="time"
                id="checkInTime"
                value={checkInTime}
                onChange={(e) => setCheckInTime(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1">
            <Label htmlFor="checkOutDate" className="mb-1 block">
              Check-out
            </Label>
            <div className="flex flex-col gap-2">
              <Calendar
                mode="single"
                selected={checkOutDate}
                onSelect={setCheckOutDate}
                className="rounded-md border flex-1"
              />
              <Input
                type="time"
                id="checkOutTime"
                value={checkOutTime}
                onChange={(e) => setCheckOutTime(e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleReservation} className="w-full">
          Reserve Room
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReservationForm;
