import { useState } from "react";

const useSelectImage = () => {
  const [selectedImageFile, setSelectedImageFile] = useState<string>();

  const onSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow excatly 1 file to be uploaded
    if (!e.target.files || e.target.files.length > 1) return;

    // Max size limit is 3 mb (TODO: Could add error message)
    if (e.target.files[0].size > 3 * 1024 * 1024) return

    // Using the FileReader
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (readerEvent) => {
      // Makes sure it's not null && not an array of files
      if (readerEvent.target?.result && !(readerEvent.target?.result instanceof ArrayBuffer)) {
        setSelectedImageFile(readerEvent.target.result);
      }
    };
  };

  return {
    onSelectImage,
    selectedImageFile,
    setSelectedImageFile
  }
};

export default useSelectImage;
