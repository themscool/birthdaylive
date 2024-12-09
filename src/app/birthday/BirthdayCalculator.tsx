"use client";

import * as React from "react";
import { format, differenceInYears, differenceInMonths, differenceInDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function BirthdayCalculator() {
  const [date, setDate] = React.useState<Date>();
  const [ageDetails, setAgeDetails] = React.useState<{ years: number; months: number; days: number } | null>(null);
  const [showConfetti, setShowConfetti] = React.useState(false);

  const { width, height } = useWindowSize();

  // Calculate age whenever a new date is selected
  React.useEffect(() => {
    if (date) {
      const today = new Date();
      const years = differenceInYears(today, date);
      const months = differenceInMonths(today, date);
      const days = differenceInDays(today, date);

      setAgeDetails({ years, months, days });

      // Show confetti when a new date is selected
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000); // Stop confetti after 3 seconds
    } else {
      setAgeDetails(null);
    }
  }, [date]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {showConfetti && <Confetti width={width} height={height} />}

      <h1 className="text-3xl font-bold mb-6">How Old Am I?</h1>

      {/* Popover for date selection */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal text-black",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-black" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Display the selected birthday in text */}
      {date && (
        <p className="mt-4 text-lg font-medium">
          Your birthday is 🎂: {" "}
          <span className="text-red-500">{format(date, "eeee, MMMM do, yyyy")}</span>
        </p>
      )}

      {/* Display the calculated age */}
      {ageDetails && (
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <h2 className="text-2xl font-semibold">{ageDetails.days.toLocaleString()}</h2>
            <p>Days Old</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{ageDetails.months.toLocaleString()}</h2>
            <p>Months Old</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{ageDetails.years.toLocaleString()}</h2>
            <p>Years Old</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BirthdayCalculator;
