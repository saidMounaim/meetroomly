import { Skeleton } from "@/components/ui/skeleton";

const ReviewCardSkeleton = () => {
  return (
    <div className="mb-4 pb-4 border-b last:border-b-0">
      <div className="flex items-center mb-2">
        <Skeleton className="h-6 w-24 mr-2" />
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-4 h-4 rounded-full" />
          ))}
        </div>
        <Skeleton className="ml-4 h-8 w-8 rounded-md" />
      </div>
      <Skeleton className="h-5 w-full mb-1" />
      <Skeleton className="h-5 w-3/4" />
    </div>
  );
};

export default ReviewCardSkeleton;
