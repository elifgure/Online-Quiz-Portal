import { GripVertical, Trash } from "lucide-react";

const ShortText = ({ label, placeholder, required, onDelete }) => {
  return (
    <div className="flex flex-col gap-4 p-6 bg-white rounded-2xl shadow-md border border-purple-100">
      {/* Header: Label + Drag + Delete */}
      <div className="flex justify-between items-center w-full">
        <GripVertical className="w-6 h-6 text-gray-400 cursor-move" />
        <label className="text-lg font-semibold text-[#044c5c]">{label}</label>
        <Trash
          onClick={onDelete}
          className="w-5 h-5 cursor-pointer text-gray-400 hover:text-red-500 transition-colors"
        />
      </div>

      {/* Input Field */}
      <input
        type="text"
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outlCaluine-none focus:ring-2 focus:ring-purple-300 focus:border-transparent bg-white text-[#044c5c] placeholder-[#a0aec0] transition-all"
      />
    </div>
  );
};

export default ShortText;
