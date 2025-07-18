import React from 'react';

const BooleanField = ({ id, value, onLabelChange, onChange, isPreview = false, label }) => {
  // Her bir radio grubunu benzersiz kılmak için id kullanıyoruz
  const radioGroupName = `boolean-answer-${id}`;

  return (
    <div className="flex flex-col gap-3 mt-7">
      {/* Soru metni için input */}
     {
      !isPreview && (
         <input
        type="text"
    value={label || ''}
        onChange={(e) => onLabelChange(e.target.value)}
        placeholder="Doğru/Yanlış sorusunu buraya yazın"
        className="border px-3 py-2 rounded w-full font-semibold"
      />
      )
     }

      {/* Cevap olarak Doğru/Yanlış seçimi */}
      <div className="flex items-center gap-6 pl-1 pt-1">
        <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-green-50 transition-colors">
          <input
            type="radio"
            name={radioGroupName}
            value="true"
            checked={value === 'true'}
            onChange={(e) => onChange(e.target.value)}
            disabled={isPreview}
            className="form-radio h-5 w-5 text-green-600 focus:ring-green-500"
          />
          <span className="font-semibold text-lg text-green-700">Doğru</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-red-50 transition-colors">
          <input
            type="radio"
            name={radioGroupName}
            value="false"
            checked={value === 'false'}
            onChange={(e) => onChange(e.target.value)}
            disabled={isPreview}
            className="form-radio h-5 w-5 text-red-600 focus:ring-red-500"
          />
          <span className="font-semibold text-lg text-red-700">Yanlış</span>
        </label>
      </div>
      
    </div>
  );
};

export default BooleanField;