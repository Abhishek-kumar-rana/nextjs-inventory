import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="flex items-center justify-center bg-green-50 dark:bg-black/80 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center items-center  text-center ">
          <Badge className="bg-green-500/20 text-green-600 rounded-full py-1 px-3 border-none">
            Add New Plants Inventory
          </Badge>

          <h1 className="mt-6 max-w-[25ch] text-4xl sm:text-5xl md:text-[3rem] font-bold leading-tight tracking-tight text-green-600">
            Fresh Plants, Always in Stock
          </h1>

          <p className="mt-4 sm:mt-6 max-w-xl text-lg sm:text-xl text-green-600/80">
            Browse your extensive collection of indoor and outdoor plants. Track
            availability, prices, and categories all in one place.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full sm:w-auto">
            <Link href="/plants" className="w-full sm:w-auto">
              <Button size="lg" className="rounded-full text-base w-full sm:w-auto">
                View Inventory <ArrowUpRight className="!h-5 !w-5 ml-2" />
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base shadow-none w-full sm:w-auto mt-3 sm:mt-0"
            >
              <CirclePlay className="!h-5 !w-5 mr-2" /> Watch Demo
            </Button>
          </div>
        </div>

        {/* Right Content / Image Placeholder */}
        <div className="flex-1 flex items-center justify-center bg-green-200 rounded-xl lg:rounded-xl h-64 sm:h-80 md:h-96 lg:h-auto">
          <div className="text-green-900 text-lg sm:text-xl md:text-2xl font-semibold text-center px-4">
            <div>🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿</div>
             Plant Inventory Preview 
             <div>🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
