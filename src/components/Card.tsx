export default function Card() {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-xl flex flex-col">
      <div className="h-70">
        <img
          src="https://static-01.daraz.com.np/p/6e7e5db0dce97f4ffc6427f6eb2f3c8f.jpg_300x0q75.webp"
          alt="Lenovo Ideapad 1"
          className="w-full object-cover transition-transform  hover:scale-[1.01]"
        />
      </div>
      <div className="flex-1 px-2 py-3">
        <div className="font-medium text-base laptop:text-lg  mb-2">
          Lenovo Ideapad 1 Intel Celeron N4020
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700 text-xl">Price: </span>
          <span className="text-green-500 font-bold text-lg">Rs. 26,999</span>
        </div>
      </div>
    </div>
  );
}
