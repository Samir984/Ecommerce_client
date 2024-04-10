import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAccountState } from "@/context/AccountContext";
import { getInitials } from "@/lib/utils";

type UserAvatarType = {
  className?: string;
};
export default function UserAvatar({ className }: UserAvatarType) {
  const { avatar, fullName } = useAccountState();
  console.log("UserAvatar Component ");
  return (
    <Avatar className={className}>
      <AvatarImage src={avatar.url} />
      <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
    </Avatar>
  );
}
