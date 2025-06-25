import { useState } from "react";
import { GripVertical, Trash, Trash2 } from "lucide-react";

const LogoField = ({ label, onDelete }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-white rounded-2xl shadow-md border border-purple-100">    

  <div className="flex justify-between items-center w-full">
    <GripVertical className="w-6 h-6 text-gray-400 cursor-move"  />
    <label className="text-lg font-semibold text-[#044c5c]">{label}</label>
    <Trash className="w-5 h-5 cursor-pointer text-gray-400 hover:text-red-500 transition-colors" onClick={onDelete}/>
  </div>
  

  <div className="flex flex-col items-center justify-center gap-4">
    {image ? (
      <div className="relative group">
        <img
          src={image}
          alt="Logo"
          className="w-32 h-32 rounded-full object-cover border-2 border-purple-300"
        />
        <button
          onClick={handleRemoveImage}
          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md transition-all"
          title="Sil"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    ) : (
      <label className="cursor-pointer px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-md shadow-sm transition">
        Görsel Yükle
        <input
          type="file"
          onChange={handleImageChange}
          className="hidden"
          accept="image/*"
        />
      </label>
    )}
  </div>
</div>
  );
};

export default LogoField;
