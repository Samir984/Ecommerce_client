import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAccountMode } from "@/context/AccountContext";
import { Link } from "react-router-dom";

export default function SwitchAuthForm() {
  const { accountMode } = useAccountMode();
  const route = accountMode === "SELLER" ? "become-vendor" : "signup";
  return (
    <div className="bg-white ">
      <Tabs defaultValue="signup" className="">
        <TabsList className="w-full tablet:w-[600px] laptop:w-[800px]">
          <Link to={route} className="flex-1 ">
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
        <TabsContent value="signup">
          Make changes to your signup here.
          {/* <Outlet /> */}
        </TabsContent>
        <TabsContent value="signin">
          Change your signin here.
          {/* <Outlet /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
