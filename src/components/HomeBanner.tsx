import banner from "./../asset/banner.png";

export default function HomeBanner() {
  return (
    <div className="w-full  tablet:min-h-[480px] laptop:min-h-[720px] laptop:max-w-[1300px] mx-auto min-h-60 relative bg-black">
      <div
        className="bg-no-repeat bg-cover bg-center absolute w-full h-full opacity-80"
        style={{ backgroundImage: `url(${banner})` }}
      ></div>
      <div className="flex justify-center items-center h-full f absolute w-full">
        <h3 className="tablet:text-[32px] text-lg font-medium text-white">
          Shop Smarter, Live Better: Seamless E-commerce at Your Fingertips!
        </h3>
      </div>
    </div>
  );
}
