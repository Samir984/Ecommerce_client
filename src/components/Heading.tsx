import { useAccountState } from "@/context/AccountContext";

export default function Heading() {
  const { accountMode } = useAccountState();
  console.log("Heading Componenet");

  return (
    <div className="">
      <h2 className="text-center font-medium  text-xl ">
        {accountMode === "SELLER" ? "For Vendors" : "For Customers"}
      </h2>
      <h6 className="font-light text-sm mb-4 text-center">
        {accountMode === "SELLER"
          ? "Start selling your products to a global audience. Sign up now!"
          : "Unlock endless shopping possibilities. Join us today!"}
      </h6>
    </div>
  );
}
