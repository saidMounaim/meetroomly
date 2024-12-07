import { Calendar, Clock, Users } from "lucide-react";
import React from "react";

const WhyUsSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-blue-900">
          Why Choose Meetroomly?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center flex flex-col items-center">
            <Calendar className="w-12 h-12 mb-4 text-blue-600" />
            <h3 className="text-xl font-semibold mb-2 text-blue-700">
              Easy Booking
            </h3>
            <p className="text-gray-600">
              Book your meeting room in just a few clicks
            </p>
          </div>
          <div className="text-center flex flex-col items-center">
            <Users className="w-12 h-12 mb-4 text-blue-600" />
            <h3 className="text-xl font-semibold mb-2 text-blue-700">
              Flexible Options
            </h3>
            <p className="text-gray-600">
              Choose from a variety of room sizes and amenities
            </p>
          </div>
          <div className="text-center flex flex-col items-center">
            <Clock className="w-12 h-12 mb-4 text-blue-600" />
            <h3 className="text-xl font-semibold mb-2 text-blue-700">
              Real-time Availability
            </h3>
            <p className="text-gray-600">
              See up-to-date room availability instantly
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
