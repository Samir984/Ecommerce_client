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
    <div className="flex overflow-y-scroll hidescroll_bar gap-3  py-4 tablet:px-2 tablet:min-h-48 min-h-32 laptop:max-w-[1300px] mx-auto ">
      {isLoading ? (
        <div className="flex gap-4">
          {[1, 2, 3, 4, 5, 6, 7,8,9,10,11,12].map(() => {
            return (
              <div className="flex flex-col gap-2 items-center">
                <Skeleton className="w-18 h-18 tablet:w-24 tablet:h-24 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[80px]" />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        subCategories.data.map((subCategory: SubCategory) => {
          return (
            <Link
              to={`results?subcategory=${subCategory._id}`}
              className="flex flex-col flex-shrink-0 items-center gap-3"
              key={subCategory._id}
            >
              <div className="p-1 bg-gray-100  rounded-full hover:bg-gray-200 ">
                <img
                  src={subCategory.url}
                  alt={subCategory._id}
                  className="w-16 h-16 tablet:w-24 tablet:h-24 rounded-full"
                />
              </div>
              <span className="text-gray-700 font-mono ">
                {subCategory._id}
              </span>
            </Link>
          );
        })
      )}
    </div>
  );
}
