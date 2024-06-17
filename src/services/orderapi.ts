import { OrderStateType } from "@/context/CheckoutContext";
import { getCookie } from "@/lib/utils";
import { URL } from "./config";

export const createOrder = async function (order: OrderStateType) {
  console.log(order);
  const endpoint = `${URL}orders/createorder/`;
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

export const getOrders = async function (
  store_id: string,
  page = 1,
  limit = 8
) {
  const endpoint = `${URL}orders/seller/orders?store_id=${store_id}&page=${page}&limit=${limit}`;
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

export type RowEditDataProps = { status?: string; marked?: string };

export const editOrder = async function (
  order_id: string,
  patchData: RowEditDataProps
) {
  console.log(order_id, patchData);
  const endpoint = `${URL}orders/seller/orders?order_id=${order_id}`;
  const token = getCookie("jwtToken");

  try {
    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(patchData),
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

export const getUserOrders = async function () {
  const endpoint = `${URL}orders/buyer/orders`;
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

    return responseData;
  } catch (error) {
    console.error("Error fetching prodcut page:", error);
    throw error;
  }
};

export const cancelOrder = async function (order_id: string) {
  const endpoint = `${URL}orders/buyer/orders/cancel?order_id=${order_id}`;
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

    return responseData;
  } catch (error) {
    console.error("Error fetching prodcut page:", error);
    throw error;
  }
};
