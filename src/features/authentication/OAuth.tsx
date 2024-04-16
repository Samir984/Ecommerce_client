import { Button } from "@/components/ui/button";
import { signinWithGoogle } from "@/services/authApi";
import { useState } from "react";

export default function OAuth() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleOAuth() {
    try {
      setIsLoading(true);
      const data = await signinWithGoogle();
      console.log(data)
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <div className="flex justify-center items-center mt-6">
        <hr className="border-2 border-gray-200  flex-1" />
        <span className="inline-block px-3">or continue with</span>
        <hr className="border-2 border-gray-200  flex-1" />
      </div>
      <Button
        variant={"secondary"}
        className="flex  px-3 py-2 gap-5 b mx-auto mt-6 w-52"
        onClick={handleOAuth}
      >
        <img
          src="https://cdn.hackerearth.com/static/hackerearth/images/google_logo.png"
          alt="google logo"
          className={`${isLoading && "rotate"}`}
        />

        <span className="font-normal text-[16px]">
          {isLoading ? "Signing in ..." : "Signup with google"}
        </span>
      </Button>
    </>
  );
}
