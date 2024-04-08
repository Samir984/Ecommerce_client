import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserAvatarType = {
  userAvatar: string;
  fallBack: string;
};

export default function UserAvatar({ userAvatar, fallBack }: UserAvatarType) {
  console.log(fallBack);
  return (
    <Avatar>
      <AvatarImage src={userAvatar} />
      <AvatarFallback>{fallBack}</AvatarFallback>
    </Avatar>
  );
}
