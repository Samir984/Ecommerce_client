import Wrapper from "@/components/Wrapper";
import AccountMode from "@/features/authentication/AccountMode";


export default function GettingStarted() {
  console.log("Getting Started Page")
  return (
    <Wrapper>
      <AccountMode />
    </Wrapper>
  );
}
