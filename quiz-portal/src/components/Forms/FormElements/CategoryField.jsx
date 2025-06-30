import React from "react";

const CategoryField = ({ onChange }) => {
  return (
    <div className="mt-7">
      <input
        type="text"
        onChange={(e) => onChange(e.target.value)}
        placeholder="Kategori giriniz"
        className="border px-3 py-2 rounded w-full"
      />
    </div>
  );
};

export default CategoryField;
