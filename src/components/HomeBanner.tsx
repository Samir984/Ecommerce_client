export default function HomeBanner() {
  return (
    <div className=" w-full tablet:min-h-[480px]  laptop:min-h-[720px] min-h-60 relative  bg-black ">
      <div className="bg-[url(./banner.png)] bg-no-repeat bg-cover bg-center absolute w-full h-full opacity-80"></div>
      <div className="flex justify-center items-center h-full f absolute w-full  ">
        <h3 className="text-[32px] font-medium  text-white">
          Shop Smarter, Live Better: Seamless E-commerce at Your Fingertips!
        </h3>
      </div>
    </div>
  );
}
``;
