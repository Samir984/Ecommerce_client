import { getSubCategories } from "@/services/productApi";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";

type SubCategory = {
  _id: string;
  url: string;
};

export default function SubCategory() {
  const { isLoading, data: subCategories } = useQuery({
    queryKey: ["subcategories"],
    queryFn: getSubCategories,
    refetchOnWindowFocus: false,
  });

  console.log(subCategories, isLoading);

  return (
    <div className="flex flex-col items-center tablet:px-4 mx-auto py-6 laptop:max-w-[1300px]">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Categories</h1>
      <div className="flex overflow-y-scroll hidescroll_bar gap-6 py-4 min-h-32 tablet:min-h-48">
        {isLoading ? (
          <div className="flex gap-4">
            {[...Array(12)].map((_, i) => (
              <div className="flex flex-col gap-2 items-center" key={i}>
                <Skeleton className="w-18 h-18 tablet:w-24 tablet:h-24 rounded-full" />
                <Skeleton className="h-4 w-[80px]" />
              </div>
            ))}
          </div>
        ) : (
          subCategories.data.map((subCategory: SubCategory) => (
            <Link
              to={`results?subcategory=${subCategory._id}`}
              className="flex flex-col flex-shrink-0 items-center gap-3 transition-transform duration-200 hover:scale-105"
              key={subCategory._id}
            >
              <div className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <img
                  src={subCategory.url}
                  alt={subCategory._id}
                  className="w-16 h-16 tablet:w-24 tablet:h-24 rounded-full"
                />
              </div>
              <span className="text-gray-700 font-mono">
                {subCategory._id}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
