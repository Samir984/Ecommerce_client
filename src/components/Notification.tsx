type NotificationType = {
  message: number;
};

export default function Notification({ message }: NotificationType) {
  console.log("Notification component");
  if (message === 0) return;
  return (
    <div className="absolute bg-red-600 h-6 w-6 p-1 text-white flex justify-center items-center -right-3 -top-3  rounded-full ">
      {message}
    </div>
  );
}
