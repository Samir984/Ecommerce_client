import { convertToFormData, getCookie } from "@/lib/utils";
import { URL } from "./config";
import { ProductFormType } from "@/features/product/ListProductForm";

type HeadersType = {
  Authorization: string;
  "Content-Type"?: string;
};

export const addProduct = async function (productData: ProductFormType) {
  console.log(productData);
  const endpoint = `${URL}products/listproduct`;
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
  console.log("get product runnung");
  const endpoint = `${URL}stores/products?store_id=${store_id}&page=${page}&limit=${limit}`;
  const token = getCookie("jwtToken");
  console.log("\n Enter get products \n", page);
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

export const getProduct = async function (product_id: string) {
  const endpoint = `${URL}products/${product_id}`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (!response.ok) throw new Error(responseData.message);

    return responseData;
  } catch (error) {
    console.error("Error fetching prodcut:", error);
    throw error;
  }
};

export const deleteProductListing = async (product_id: string) => {
  const token = getCookie("jwtToken");

  try {
    const response = await fetch(`${URL}products/${product_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
    return data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const editListedProduct = async function (
  product_id: string,
  EditedProductListing: ProductFormType
) {
  console.log(EditedProductListing);
  const endpoint = `${URL}products/${product_id}`;
  const token = getCookie("jwtToken");
  const contentFileList = EditedProductListing.oldImg ? true : false;

  let dataFormat = null;
  let headers: HeadersType = {
    Authorization: `Bearer ${token}`,
  };

  if (contentFileList) {
    dataFormat = convertToFormData(EditedProductListing);
    console.log(dataFormat.get("oldImg"));
  } else {
    dataFormat = JSON.stringify(EditedProductListing);
    headers = {
      ...headers, // Spread existing headers
      "Content-Type": "application/json", // Add Content-Type
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "PATCH",
      headers,
      body: dataFormat,
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

export const getSubCategories = async function () {
  const endpoint = `${URL}products/subcategories/`;
  console.log(endpoint);

  try {
    const response = await fetch(endpoint);
    const responseData = await response.json();
    if (!response.ok) throw new Error(responseData.message);
    return responseData;
  } catch (error) {
    console.error("Error fetching prodcut:", error);
    throw error;
  }
};

export const getProductsAsQuery = async function (query: string) {
  const endpoint = `${URL}products${query}`;
  console.log(endpoint);
  console.log(endpoint);

  try {
    const response = await fetch(endpoint);
    const responseData = await response.json();
    if (!response.ok) throw new Error(responseData.message);
    return responseData;
  } catch (error) {
    console.error("Error fetching prodcut:", error);
    throw error;
  }
};
