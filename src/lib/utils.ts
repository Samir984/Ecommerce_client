import { CustomerSignupType } from "@/features/authentication/CusotmerSignupForm";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setCookie(name: string, value: string, days: number) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }

  // Determine if the current connection is over HTTPS
  const isSecureConnection = location.protocol === "https:";

  // Add the Secure flag only if the connection is secure
  const secureFlag = isSecureConnection ? "; Secure" : "";

  document.cookie =
    name + "=" + (value || "") + expires + "; path=/" + secureFlag;
}

export function getCookie(name: string) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

export const convertObjectToFormData = (data: CustomerSignupType): FormData => {
  console.log(data);
  const fd = new FormData();
  fd.append("fullName", data.fullName);
  fd.append("email", data.email);
  fd.append("password", data.password);

  // Assuming avatar is a FileList
  if (data.avatar && data.avatar.length > 0) {
    fd.append("avatar", data.avatar[0]);
  }
  console.log(fd.entries());
  return fd;
};
