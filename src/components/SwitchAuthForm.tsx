import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAccountMode } from "@/context/AccountContext";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

type SwitchAuthFormType = {
  children: ReactNode;
};

export default function SwitchAuthForm({ children }: SwitchAuthFormType) {
  const { accountMode } = useAccountMode();
  const route = accountMode === "SELLER" ? "become-vendor" : "signup";
  return (
    <div className="bg-white shadow-lg rounded-lg">
      <Tabs defaultValue="signup" className=" ">
        <TabsList className=" w-full tablet:min-w-[500px]  p-0 bg-gray-200 ">
          <Link to={route} className=" flex-1">
            <TabsTrigger value="signup" className="w-full text-lg ">
              Sign up
            </TabsTrigger>
          </Link>
          <Link to="signin" className="flex-1">
            <TabsTrigger value="signin" className="w-full text-lg">
              Sign in
            </TabsTrigger>
          </Link>
        </TabsList>
        <TabsContent value="signup">{children}</TabsContent>
        <TabsContent value="signin">{children}</TabsContent>
      </Tabs>
    </div>
  );
}
