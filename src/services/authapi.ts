import { CustomerSignupType } from "@/features/authentication/CusotmerSignupForm";
import { URL } from "./config";
import { UserSigninType } from "@/features/authentication/SigninForm";

export const customerSignup = async function (signup: CustomerSignupType) {
  const endpoint = `${URL}users/signup`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signup),
    });
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error at customerSignup :", error);
    throw error;
  }
};

export const UserSignin = async function (signin: UserSigninType) {
  const endpoint = `${URL}users/signin`;
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signin),
    });
    console.log(response);

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error at UserSignin :", error);
    throw error;
  }
};
