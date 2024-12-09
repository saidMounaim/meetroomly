import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-blue-900">
            404 - Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <AlertCircle className="w-24 h-24 text-blue-500 mb-6" />
          <p className="text-center text-gray-600 mb-6">
            {`Oops! It seems the meeting room you're looking for doesn't exist.`}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/" className="flex items-center">
              <Home className="mr-2 h-4 w-4" /> Return to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
