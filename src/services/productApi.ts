import { ProductFormType } from "@/features/store/ListProductForm";
import { convertToFormData, getCookie } from "@/lib/utils";
import { URL } from "./config";

export const ListProduct = async function (productData: ProductFormType) {
  console.log(productData);
  const endpoint = `${URL}users/products/listproduct`;
  const token = getCookie("jwtToken");

  const formData = convertToFormData(productData); //
  console.log(formData.get("productImg"));
  console.log(formData.get("productName"));

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
