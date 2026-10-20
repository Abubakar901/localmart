"use client";

import { useState, useRef, ChangeEvent } from "react";
import { FormSection } from "@/components/Shops/CreateShop/FormLayout";

export const ImagesSection = () => {
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newImages: string[] = [];

    Array.from(files).forEach((file) => {
      if (images.length + newImages.length < 5 && file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        newImages.push(url);
      }
    });

    if (newImages.length > 0) {
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    // Reset value so the same file can be uploaded again if removed
    if (e.target) e.target.value = "";
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <FormSection title="Shop Images">
      <div className="space-y-4">
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleChange}
          multiple
          accept="image/png, image/jpeg, image/jpg"
          className="hidden"
        />

        {/* Drag and Drop Zone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 hover:border-green-600 rounded-2xl p-8 text-center bg-gray-50/50 hover:bg-gray-50 cursor-pointer transition-colors flex flex-col items-center justify-center space-y-3"
        >
          <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              Drag and drop your shop images here
            </p>
            <p className="text-xs text-gray-500 mt-1">
              or click to browse • PNG, JPG up to 5 images
            </p>
          </div>
        </div>

        {/* Uploaded Previews or Empty State */}
        {images.length === 0 ? (
          <p className="text-xs text-gray-500">No images uploaded yet</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {images.map((imgSrc, index) => (
              <div
                key={index}
                className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-100 shadow-sm"
              >
                <img
                  src={imgSrc}
                  alt={`Upload preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className="absolute top-2 right-2 bg-black/60 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tip Box */}
        <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-2xl flex items-start space-x-3">
          <div className="text-blue-600 mt-0.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-blue-900">Tip</p>
            <p className="text-xs text-blue-700 mt-0.5 leading-relaxed">
              Upload clear, high-quality photos of your shop storefront and products to attract more customers.
            </p>
          </div>
        </div>

      </div>
    </FormSection>
  );
};