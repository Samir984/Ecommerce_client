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

export function clearCookie(name: string) {
  // Set the expiration date to a past time
  document.cookie = name + "=; Max-Age=-99999999; path=/";
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

export function convertToFormData<T extends { [s: string]: string | FileList }>(
  data: T
): FormData {
  const formData = new FormData();
  // Iterate over the signup object and append key-value pairs to the FormData
  Object.entries(data).forEach(([key, value]) => {
    if (key === "avatar" || key === "productImg") {
      // If the key is 'avatar' and the value is a FileList (for file input), append each file

      formData.append(key, value[0]);
    } else if (typeof value === "object" && value !== null) {
      // Serialize objects to JSON strings
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        formData.append(`${key}[${nestedKey}]`, nestedValue);
      });
      // formData.append(key, JSON.stringify(value));
    } else {
      // Otherwise, append regular key-value pair
      formData.append(key, value as string);
    }
  });
  return formData;
}

export function getInitials(fullName: string): string {
  const names = fullName.split(" ");
  if (names.length > 1) {
    return (
      names[0].charAt(0).toUpperCase() +
      names[names.length - 1].charAt(0).toUpperCase()
    );
  } else {
    return fullName.charAt(0).toUpperCase();
  }
}

export async function imageUrlToFile(imageUrl: string, filename: string) {
  try {
    // Fetch the image from the URL
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    // Get the image data as a Blob
    const blob = await response.blob();

    // Create a File object from the Blob
    const file = new File([blob], filename);

    // Create a FileList containing the File object
    const fileList = new DataTransfer();
    fileList.items.add(file);

    return fileList.files;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export function formatNumberWithCommas(num: number): string {
  const numStr = num.toString();
  const lastThreeDigits = numStr.slice(-3);
  const otherDigits = numStr.slice(0, -3);

  if (otherDigits !== "") {
    return (
      otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThreeDigits
    );
  } else {
    return lastThreeDigits;
  }
}

export function containsJWT(str: string) {
  console.log(str);
  if (str.startsWith("jwt") === true) return true;

  return false;
}
