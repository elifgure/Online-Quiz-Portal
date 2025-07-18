import React from "react";

const ShortText = ({ onLabelChange, onAnswerChange, isPreview = false, label, answer }) => {
  return (
    <div className="flex flex-col gap-2 mt-7">
      {/* Soru metni */}
      {!isPreview && (
        <input
          type="text"
          value={label || ''}
          onChange={(e) => onLabelChange(e.target.value)}
          placeholder="Soru"
          className="border px-3 py-2 rounded w-full font-semibold"
        />
      )}
      {/* Cevap alanı */}
      <input
        type="text"
        value={answer || ''}
        onChange={(e) => onAnswerChange(e.target.value)}
        placeholder={isPreview ? "Cevabınızı buraya yazın" : "Doğru cevabı buraya yazın"}
        className={`border px-3 py-2 rounded w-full ${
          isPreview ? "bg-gray-100 text-gray-400" : "bg-white"
        }`}
        readOnly={isPreview}
      />
    </div>
  );
};

export default ShortText;
