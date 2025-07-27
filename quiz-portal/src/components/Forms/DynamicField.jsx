import { GripVertical, Trash2 } from "lucide-react";
import LogoField from "./FormElements/LogoField";
import ShortText from "./FormElements/ShortText";
import LongText from "./FormElements/LongText";
import BooleanField from "./FormElements/BooleanField";
import MultiChoice from "./FormElements/MultiChoice";

const FIELD_COMPONENTS = {
  logo: LogoField,
  shortText: ShortText,
};

// Kendi etiketini yöneten bileşen türlerini burada listeliyoruz
const typesWithInternalLabels = [
  "shortText",
  "longText",
  "boolean",
  "multiChoice",
];

const DynamicField = ({
  id,
  type,
  label,
  placeholder,
  required,
  value,
  options,
  onChange,
  onDelete,
  onLabelChange,
  onOptionsChange,
  onAnswerChange,
  answer,
}) => {
  const renderInput = () => {
    switch (type) {
      case "logo":
        return (
          <LogoField
            value={value}
            onChange={(e) => onChange(e.target.files[0])}
          />
        );
      case "text":
        return (
          <input
            type="text"
            placeholder={placeholder}
            className="w-full px-4 py-2 border rounded-lg"
            required={required}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      case "select":
        return (
          <select
            className="w-full px-4 py-2 border rounded-lg"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">Bir seçenek seç</option>
            <option value="1">Seçenek 1</option>
            <option value="2">Seçenek 2</option>
          </select>
        );
      case "checkbox":
        return (
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => onChange(e.target.checked)}
            />
            <label>{placeholder}</label>
          </div>
        );
      case "category":
        return <CategoryField onChange={onChange} />;
      case "shortText":
        return (
          <ShortText
            label={label}
            answer={answer} // answer prop'unu kullan
            onLabelChange={onLabelChange}
            onAnswerChange={onAnswerChange} // onAnswerChange prop'unu kullan
            isPreview={false}
          />
        );
      case "longText":
        return (
          <LongText
            label={label}
            answer={answer}
            onLabelChange={onLabelChange}
            onAnswerChange={onAnswerChange}
            isPreview={false}
          />
        );
      case "multiChoice":
        return (
          <MultiChoice
            label={label}
            answer={answer}
            onLabelChange={onLabelChange}
            options={options || [""]}
            onOptionsChange={onOptionsChange}
            onAnswerChange={onAnswerChange}
            isPreview={false}
          />
        );
      case "boolean":
        return (
          <BooleanField
            id={id}
            label={label}
            value={answer}
            onLabelChange={onLabelChange}
            onChange={onAnswerChange}
            isPreview={false}
          />
        );
      default:
        return <div className="text-gray-400">Tanımsız Alan: {type}</div>;
    }
  };

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm flex items-start gap-4 group relative">
      {/* DND Icon */}
      <div className="cursor-grab text-gray-400 hover:text-purple-500">
        <GripVertical />
      </div>

      <div className="flex-1">
        {/* Sadece kendi etiketi olmayan alanlar için label göster */}
        {!typesWithInternalLabels.includes(type) && (
          <label className="block font-semibold text-[#044c5c] mb-2">
            {label}
          </label>
        )}
        {renderInput()}
      </div>

      {/* Delete */}
      <button
        onClick={onDelete}
        className="text-gray-400 hover:text-red-500 absolute top-3 right-3"
      >
        <Trash2 />
      </button>
    </div>
  );
};

export default DynamicField;
