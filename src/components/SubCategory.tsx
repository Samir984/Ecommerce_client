import { getSubCategories } from "@/services/productApi";
import { useQuery } from "react-query";

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
    <div className="flex overflow-y-scroll  gap-3  py-4 tablet:px-2 ">
      {isLoading
        ? "loading"
        : subCategories.data.map((subCategory: SubCategory) => {
            return (
              <div
                className="flex flex-col flex-shrink-0 items-center gap-3"
                key={subCategory._id}
              >
                <div className="p-1 bg-gray-100  rounded-full hover:bg-gray-200">
                  <img
                    src={subCategory.url}
                    alt={subCategory._id}
                    className="w-16 h-16 tablet:w-24 tablet:h-24 rounded-full"
                  />
                </div>
                <span className="text-gray-700 font-mono ">
                  {subCategory._id}
                </span>
              </div>
            );
          })}
    </div>
  );
}
