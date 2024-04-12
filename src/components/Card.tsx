import { Link } from "react-router-dom";

type CardPropsType = {
  title: string;
  price: number;
  url: string;
  _id: string;
};
export default function Card({ title, price, url, _id }: CardPropsType) {
  return (
    <Link to={`/vendor/edit-product/${_id}`}>
      <div className="max-w-xs rounded overflow-hidden shadow-md flex flex-col hover:shadow-xl">
        <div className="h-70">
          <img
            src={url}
            className="w-full  object-cover transition-transform  hover:scale-[1.02] "
          />
        </div>
        <div className="flex-1 px-2 py-3">
          <div className="font-medium text-base laptop:text-lg  mb-2">
            {title}
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 text-xl">Price: </span>
            <span className="text-green-500 font-bold text-lg">Rs {price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
