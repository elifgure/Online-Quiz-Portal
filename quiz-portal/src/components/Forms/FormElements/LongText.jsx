import React from "react";

const LongText = ({ onLabelChange, isPreview = false }) => {
  return (
    <div className="flex flex-col gap-2 mt-7">
      {/* Soru metni */}
      {
        !isPreview && (
          <input
        type="text"
       
        onChange={(e) => onLabelChange(e.target.value)}
        placeholder="Soru"
        className="border px-3 py-2 rounded w-full font-semibold"
      />
        )
      }

      {/* Cevap alanı */}
      <textarea
        type="text"
        value=""
        disabled
        placeholder="Cevap (katılımcı için boş)"
        className="border px-3 py-2 rounded w-full bg-gray-100 text-gray-400"
      />
    </div>
  );
};

export default LongText;
