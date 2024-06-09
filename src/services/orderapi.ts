import { OrderStateType } from "@/context/CheckoutContext";
import { getCookie } from "@/lib/utils";
import { URL } from "./config";

export const createOrder = async function (order: OrderStateType) {
  console.log(order);
  const endpoint = `${URL}users/orders/`;
  const token = getCookie("jwtToken");
  console.log(order);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error at createOrder:", error);
    throw error;
  }
};

export const getOrders = async function (store_id: string) {
  const endpoint = `${URL}users/orders?store_id=${store_id}`;
  const token = getCookie("jwtToken");

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

    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error at createOrder:", error);
    throw error;
  }
};

export const editOrder = async function (store_id: string, patchData) {
  const endpoint = `${URL}users/orders?store_id=${store_id}`;
  const token = getCookie("jwtToken");

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        body: JSON.stringify(patchData),
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error at createOrder:", error);
    throw error;
  }
};