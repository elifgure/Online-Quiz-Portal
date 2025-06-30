import { ImagePlus } from "lucide-react";

const LogoField = ({ value, onChange }) => {
  const previewUrl = value ? URL.createObjectURL(value) : null;

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <label className="relative w-32 h-32 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-purple-400 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all duration-300 overflow-hidden group">
        <input
          type="file"
          accept="image/*"
          onChange={onChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Logo Önizleme"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center text-gray-400 group-hover:text-purple-500 transition-colors">
            <ImagePlus className="mx-auto w-8 h-8" />
            <span className="text-sm mt-1 block font-medium">Logo Yükle</span>
          </div>
        )}
      </label>
    </div>
  );
};

export default LogoField;
