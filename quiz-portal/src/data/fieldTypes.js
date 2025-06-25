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
    type: "category",
    label: "Kategori",
    icon: Layers,
    component: "CategoryField",
  },
  {
    type: "logo",
    label: "Logo",
    icon: Tag,
    component: "LogoField",
  },
  {
    type: "shortText",
    label: "Kısa Metin",
    icon: Type,
    component: "ShortText",
  },
  {
    type: "longText",
    label: "Uzun Cevap",
    icon: FileText,
    component: "LongText",
  },
  {
    type: "singleChoice",
    label: "Tek Seçim",
    icon: Circle,
    component: "SingleChoice",
  },
  {
    type: "boolean",
    label: "Doğru / Yanlış",
    icon: HelpCircle,
    component: "BooleanChoice",
  },
  {
    type: "multiChoice",
    label: "Çoklu Seçim",
    icon: Check,
    component: "MultiChoice",
  },
];
