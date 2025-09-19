import {
  Layers,
  Tag,
  Type,
  FileText,
  Circle,
  HelpCircle,
  Check,
} from "lucide-react";

export const fieldTypes = [
  {
    type: "shortText",
    label: "Kısa Yanıt",
    icon: Type,
    component: "ShortText",
    color: "from-blue-500 to-cyan-500",
  },
  {
    type: "longText",
    label: "Paragraf",
    icon: FileText,
    component: "LongText",
    color: "from-green-500 to-emerald-500",
  },

  {
    type: "boolean",
    label: "Onay Kutusu",
    icon: HelpCircle,
    component: "BooleanChoice",
    color: "from-rose-500 to-pink-500",
  },
  {
    type: "multiChoice",
    label: "Çoktan Seçmeli",
    icon: Check,
    component: "MultiChoice",
    color: "from-teal-500 to-cyan-500",
  },
];

