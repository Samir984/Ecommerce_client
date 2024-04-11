import { ProductFormType } from "@/features/store/ListProductForm";
import { convertToFormData, getCookie } from "@/lib/utils";
import { URL } from "./config";

export const ListProduct = async function (productData: ProductFormType) {
  console.log(productData);
  const endpoint = `${URL}users/products/listproduct`;
  const token = getCookie("jwtToken");

  const formData = convertToFormData(productData); //

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error at createProductFunction:", error);
    throw error;
  }
};

export const getProducts = async function (
  page: number,
  store_id: string,
  limit: number
) {
  const endpoint = `${URL}users/products?store_id=${store_id}&page=${page}&limit=${limit}`;
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
