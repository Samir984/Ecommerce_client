import { Toaster } from "react-hot-toast";

export default function ToasterCompoent() {
  return (
    <Toaster
      position="bottom-left"
      gutter={24}
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          backgroundColor: "var(--color-grey-0)",
          color: "var(--color-grey-700)",
        },
      }}
    />
  );
}
