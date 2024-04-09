import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAccountState } from "@/context/AccountContext";
import { getInitials } from "@/lib/utils";

export default function UserAvatar() {
  const { avatar, fullName } = useAccountState();
  return (
    <Avatar>
      <AvatarImage src={avatar.url} />
      <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
    </Avatar>
  );
}
