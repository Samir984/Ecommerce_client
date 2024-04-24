import Filter from "@/features/search/Filter";
import QueryProducts from "@/features/search/QueryProducts";

export default function ResultsPage() {
  return (
    <div className="flex px-4 flex-col tablet:flex-row">
      <div className="min-w-[200px]">
        <Filter />
      </div>
      <QueryProducts />
    </div>
  );
}
