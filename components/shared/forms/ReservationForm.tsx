"use client";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { makeReservation } from "@/lib/actions/reservation.actions";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const ReservationForm = ({ roomId }: { roomId: string }) => {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReservation = async () => {
    if (!isSignedIn) {
      toast.error("Please log in to make a reservation");
      return;
    }
    if (!checkInDate || !checkOutDate || !checkInTime || !checkOutTime) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const checkIn = new Date(`${checkInDate}`);
      const checkOut = new Date(`${checkOutDate}`);

      if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
        toast.error("Invalid date or time format");
        return;
      }

      if (checkOut <= checkIn) {
        toast.error("Check-out must be later than check-in");
        return;
      }
      const reservationDetails = {
        checkInDate,
        checkOutDate,
        checkInTime,
        checkOutTime,
        roomId,
      };
      const reservationRes = await makeReservation(
        reservationDetails,
        pathname
      );
      if (reservationRes === undefined) {
        toast.error(
          "This room is already reserved for the selected date and time."
        );
      } else {
        toast.success("Reservation successfully validated");
        setCheckInDate(undefined);
        setCheckOutDate(undefined);
        setCheckInTime("");
        setCheckOutTime("");
      }
    } catch (error) {
      console.error("Error handling reservation:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
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
        <Button
          onClick={handleReservation}
          className="w-full mt-3"
          disabled={loading}
        >
          {loading ? "Processing reservation..." : "Reserve Room"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReservationForm;
