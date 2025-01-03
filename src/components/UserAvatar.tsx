import { useAccountState } from "@/context/AccountContext";
import { getInitials } from "@/lib/utils";

type UserAvatarType = {
  className?: string;
};

export default function UserAvatar({ className }: UserAvatarType) {
  const {
    avatar: { url },
    fullName,
  } = useAccountState();

  return (
    <div
      className={`w-14 h-14 rounded-full overflow-hidden bordor-8 border-black ${className}`}
    >
      {url ? (
        <img src={url} alt={"User Avatar"} className="w-full h-full " />
      ) : (
        <div
          className={`flex justify-center items-center  bg-blue-500 w-full h-full text-lg tablet:text-2xl  font-medium`}
        >
          {getInitials(fullName)}
        </div>
      )}
    </div>
  );
}
