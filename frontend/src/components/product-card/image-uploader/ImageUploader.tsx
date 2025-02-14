import React, { useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

type ImageUploaderProps = {
  onImageChange: (file: File | null) => void;
  prevImg?: string;
  pageLoad?: boolean;
  productInitial?: string;
}

export const ImageUploader = ({
  onImageChange,
  prevImg,
  pageLoad,
  productInitial
}: ImageUploaderProps) => {
  const [imgURL, setImgURL] = useState<string>("");
  const [prevImgURL, setPrevImgURL] = useState<string>(prevImg!);

  const uploadImageDisplay = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      const cachedURL = URL.createObjectURL(uploadedFile);
      setImgURL(cachedURL);
      onImageChange(uploadedFile);
    }
  };

  const handleImageDelete = () => {
    setImgURL("");
    setPrevImgURL("");
    onImageChange(null);
  };

  return (
    <div>
      {(imgURL || prevImgURL) && (
        <>
          <img
            src={imgURL ? imgURL : prevImgURL}
            alt="Imagem do produto"
            className="object-cover min-h-[210px] z-10"
          />
          {!pageLoad && (
            <div className="absolute z-20 bottom-0 flex justify-center w-full gap-4 sm:gap-6">
              <button type="button" className="bg-orange text-white text-md sm:text-xl rounded-t-md overflow-hidden focus:outline-white focus:outline-offset-2">
                <label htmlFor="image-input" className="flex px-3 py-1 cursor-pointer">
                  <FaEdit />
                </label>
              </button>
              <button type="button" onClick={handleImageDelete} className="bg-orange px-3 py-1 text-white text-md sm:text-xl rounded-t-md focus:outline-white focus:outline-offset-2">
                <FaTrash />
              </button>
            </div>
          )}
        </>
      )}
      <div className={`${imgURL || prevImgURL || pageLoad ? "hidden" : "block"} absolute top-0 left-0 bg-gray-300 text-gray-600 flex flex-col items-center justify-center w-full h-full p-4`}>
        <label htmlFor="image-input" className="flex flex-col items-center text-center gap-2 border-2 border-dashed border-gray-700 rounded-md py-2 px-1 cursor-pointer">
          <FaPlus className="text-4xl" />
          <span>Adicionar Imagem</span>
          <input
            id="image-input"
            type="file"
            accept="image/*"
            hidden
            onChange={uploadImageDisplay}
          />
        </label>
      </div>
      {pageLoad && (
        <p className="text-4xl text-brown font-bold">{productInitial}</p>
      )}
    </div>
  );
};
