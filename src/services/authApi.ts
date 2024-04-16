import { URL } from "./config";
import { UserSigninType } from "@/features/authentication/SigninForm";
import { UserSignupType } from "@/features/authentication/SignupForm";
import { updateAvatarPropsType } from "@/features/profile/Profile";
import {
  clearCookie,
  convertToFormData,
  getCookie,
  setCookie,
} from "@/lib/utils";

export const userSignup = async function (signup: UserSignupType) {
  console.log(signup);
  const endpoint = `${URL}users/signup`;
  const formData = convertToFormData<UserSigninType>(signup);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error at userSignup :", error);
    throw error;
  }
};

export const userSignin = async function (signin: UserSigninType) {
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
    setCookie("jwtToken", responseData.data.jwtToken, 1);
    return responseData;
  } catch (error) {
    console.error("Error at UserSignin :", error);
    throw error;
  }
};

export const updateAvatar = async function (img: updateAvatarPropsType) {
  console.log(img);
  const endpoint = `${URL}users/updateavatar`;
  const token = getCookie("jwtToken");
  const formData = convertToFormData(img);

  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error at update Avatar :", error);
    throw error;
  }
};

export const signoutUser = function () {
  localStorage.clear();
  clearCookie("jwtToken");
};

export const signinWithGoogle = async function () {
  const endpoint = `${URL}users/signing-with-google`;
  try {
    const response = await fetch(endpoint, {
      method: "GET",
    });
    console.log(response);

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error at  signinWithGoogle:", error);
    throw error;
  }
};
