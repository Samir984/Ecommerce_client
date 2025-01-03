import { CreateStoreType } from "@/features/store/CreateStoreForm";
import { URL } from "./config";
import { getCookie } from "@/lib/utils";

export const createStore = async function (data: CreateStoreType) {
  const endpoint = `${URL}stores/create`;
  console.log(JSON.stringify(data), endpoint);
  const token = getCookie("jwtToken");

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }
    console.log(responseData);

    return responseData;
  } catch (error) {
    console.error("Error at createStore :", error);
    throw error;
  }
};

export const fetchStoreData = async (store_id: string) => {
  const token = getCookie("jwtToken");
  const endpoint = `${URL}stores/getstore/${store_id}`;
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }
    return responseData;
  } catch (error) {
    console.error("Error fetching store data:", error);
    throw error;
  }
};
