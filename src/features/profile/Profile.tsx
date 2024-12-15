import React from "react";
import UserAvatar from "@/components/UserAvatar";
import { useAccountState } from "@/context/AccountContext";
import { LuUploadCloud } from "react-icons/lu";
// import EditProfileForm from "./EditProfileForm";
import { Input } from "@/components/ui/input";
import { updateAvatar } from "@/services/authApi";
import toast from "react-hot-toast";
import { useState } from "react";

export type updateAvatarPropsType = {
  avatar: FileList;
};

export default function Profile() {
  const { fullName, dispatch } = useAccountState();
  const [isLoading, setLoading] = useState(false);

  async function handelFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      if (e.target.files && e.target.files.length) {
        setLoading(true);
        const data = await updateAvatar({ avatar: e.target.files });
        dispatch({ type: "signin", payload: data.data });
        toast.success("Profile update successfully");
      }
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col px-2 py-4 items-center">
      <h2 className="text-3xl font-medium text-center mb-2">{fullName}</h2>
      <div className="w-20 h-20 tablet:w-28 tablet:h-28 relative  overflow-hidden hover:opacity-90 ">
        <Input
          type="file"
          className="absolute h-full w-full opacity-0 z-20"
          onChange={handelFileInput}
        />
        {isLoading ? (
          <span className="loader loaderBlack absolute  opacity-90 bottom-0 right-0  w-5 h-5 p-1"></span>
        ) : (
          <LuUploadCloud
            size={30}
            className="absolute  opacity-90 bottom-0 right-0 "
          />
        )}
        <div className="relative  tablet:w-24 tablet:h-24 w-14 h-14 hover:opacity-90   ">
          <UserAvatar className="w-full h-full " />
        </div>
      </div>
      {/* <EditProfileForm /> */}
    </div>
  );
}
