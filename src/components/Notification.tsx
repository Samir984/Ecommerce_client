type NotificationType = {
  message: number;
};

export default function Notification({ message }: NotificationType) {
  console.log("Notification component");
  if (message === 0) return;
  return (
    <div className="absolute bg-red-600 w-4 h-4 tablet:h-6 tablet:w-6 tablet:p-1 p-[9px] text-white flex justify-center items-center -right-3 -top-3  rounded-full text-bae  tablet:text-base ">
      {message}
    </div>
  );
}
