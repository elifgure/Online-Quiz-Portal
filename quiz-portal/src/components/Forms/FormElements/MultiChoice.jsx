import React from 'react';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const MultiChoice = ({ label = '', onLabelChange, options = [''], onOptionsChange }) => {
  // options: şıkların metinlerini tutan dizi
  const handleOptionChange = (idx, value) => {
    const newOptions = [...options];
    newOptions[idx] = value;
    onOptionsChange(newOptions);
  };

  const handleAddOption = () => {
    if (options.length < alphabet.length) {
      onOptionsChange([...options, '']);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-7">
      {/* Soru metni */}
      <input
        type="text"
        value={label}
        onChange={(e) => onLabelChange(e.target.value)}
        placeholder="Çoktan seçmeli soru yazınız"
        className="border px-3 py-2 rounded w-full font-semibold"
      />
      {/* Şıklar */}
      {options.map((opt, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <span className="font-bold w-6">{alphabet[idx]}.</span>
          <input
            type="text"
            value={opt}
            onChange={(e) => handleOptionChange(idx, e.target.value)}
            placeholder={`Şık ${alphabet[idx]}`}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddOption}
        className="mt-2 px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 w-fit"
        disabled={options.length >= alphabet.length}
      >
        + Şık Ekle
      </button>
    </div>
  );
};

export default MultiChoice;