import { useEffect, useState } from "react";

type FileSelectViewPropsType = {
  selectedImg: FileList | string;
  className?: string;
};

export default function FileSelectView({
  selectedImg,className
}: FileSelectViewPropsType) {
  console.log("FileSelectedView");
  const [selectedFile, setSelectedFile] = useState<string | ArrayBuffer | null>(
    null
  );

  console.log(selectedFile, selectedImg);
  useEffect(() => {
    const handleFileChange = () => {
      if (typeof selectedImg === "string") {
        setSelectedFile(selectedImg);
      } else {
        const file = selectedImg[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setSelectedFile(reader.result);
          };
          reader.readAsDataURL(file);
        }
      }
    };

    handleFileChange();
  }, [selectedImg]);

  return (
    <div className={`${selectedFile && "mx-auto max-w-96"}${className}`}>
      {selectedFile && typeof selectedFile === "string" && (
        <img src={selectedFile} alt="Product Img" />
      )}
    </div>
  );
}
