import {
  Component,
  Palette,
  Search,
  ChevronDown,
  Tag,
  Type,
  FileText,
  Circle,
  HelpCircle,
  Check,
  Plus,
  Eye,
  Save,
  Share2,
  Layers,
} from "lucide-react";
import { useState } from "react";
import LogoField from "./FormElements/LogoField";
import { fieldTypes } from "../../data/fieldTypes";
import ShortText from "./FormElements/ShortText";
import LongText from "./FormElements/LongText";

const formElementComponents = {
LogoField,
ShortText,
LongText,
};

const FormCreate = () => {
  const [formElement, setFormElement] = useState([]);
  const[formTitle, setFormTitle] = useState("")


  const addFormElement = (element) => {
    const newElement = {
      id: Date.now(),
      type: element.type,
      label: `${element.label} Alanı`,
      required: false,
      placeholder: `${element.label} alanı giriniz...`,
    };
    setFormElement([...formElement, newElement]);
  };
  const renderFormElement = (element)=>{
    const fieldType = fieldTypes.find(ft => ft.type === element.type);
    const Component = formElementComponents[fieldType?.component];
    if(!Component) return null;
    return (
      <Component key={element.id}
      label={element.label}
      placeholder={element.placeholder}
      required={element.required}
      onDelete={()=> handleDeleteElement(element.id)}
      />
    )
  }
  const handleDeleteElement =(id)=>{
    setFormElement(prev => prev.filter(el => el.id !== id))   
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-white to-rose-50/50 relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-400/10 rounded-full blur-xl"></div>
      <div className="absolute top-40 right-20 w-48 h-48 bg-orange-400/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-400/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-[#33a393]/10 rounded-full blur-xl"></div>

      {/* Toolbar */}
      <div className="relative z-10 bg-white/90 backdrop-blur-sm border-b border-purple-200/30 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <input
              type="text"
              className="text-xl font-semibold bg-transparent border-none outline-none focus:bg-purple-50/50 px-3 py-2 rounded-lg transition-all duration-200 text-[#044c5c] placeholder-[#37747c]"
              placeholder="Quiz başlığı"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-[#044c5c] hover:bg-purple-50/70 rounded-lg transition-all duration-200 font-medium">
              <Eye className="w-4 h-4 text-purple-500" />
              Önizle
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-[#044c5c] hover:bg-orange-50/70 rounded-lg transition-all duration-200 font-medium">
              <Save className="w-4 h-4 text-orange-500" />
              Kaydet
            </button>
            <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <Share2 className="w-4 h-4" />
              Paylaş
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)] relative z-10">
        {/* Sidebar */}
        <div className="w-80 bg-white/90 backdrop-blur-sm border-r border-purple-200/30 flex shadow-sm">
          {/* Left Tab Navigation */}
          <div className="w-24 border-r border-purple-200/30 p-4 flex flex-col gap-4 bg-gradient-to-b from-purple-50/30 to-orange-50/30">
            {/* Elementler Tab - Active */}
            <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-b from-purple-100 to-purple-50 border border-purple-200 cursor-pointer shadow-sm">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 shadow-sm">
                <Component className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-semibold text-purple-900 text-center">
                Elementler
              </span>
            </div>

            {/* Tasarım Tab */}
            <div className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-purple-50/50 cursor-pointer transition-all duration-200">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white shadow-sm border border-purple-200/50">
                <Palette className="w-4 h-4 text-[#37747c]" />
              </div>
              <span className="text-xs font-medium text-[#37747c] text-center">
                Tasarım
              </span>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-purple-200/30">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-purple-400" />
                <input
                  type="text"
                  placeholder="Element ara"
                  className="w-full pl-10 pr-4 py-2.5 border border-purple-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 bg-white/80 backdrop-blur-sm transition-all duration-200 text-[#044c5c] placeholder-[#37747c]"
                />
              </div>
            </div>

            {/* Elements List */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Temel Alanlar Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between w-full p-3 text-left hover:bg-purple-50/50 rounded-xl cursor-pointer transition-all duration-200">
                  <span className="font-bold text-[#044c5c]">
                    Quiz Elementleri
                  </span>
                  <ChevronDown className="w-4 h-4 text-purple-500" />
                </div>

                <div className="mt-4 space-y-3">
                  {/* Kategori */}
                  <div onClick={()=> addFormElement({type:"kategori", label:"Kategori"})} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50/70 hover:to-pink-50/70 cursor-pointer group transition-all duration-200 border border-transparent hover:border-purple-200/50 hover:shadow-sm">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 shadow-sm group-hover:scale-105 transition-transform duration-200">
                      <Layers className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#044c5c] font-semibold">
                      Kategori
                    </span>
                  </div>

                  {/* Soru Başlığı */}
                  <div onClick={()=> addFormElement({type:"logo", label:"Logo"})} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-orange-50/70 hover:to-yellow-50/70 cursor-pointer group transition-all duration-200 border border-transparent hover:border-orange-200/50 hover:shadow-sm">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-orange-500 to-yellow-500 shadow-sm group-hover:scale-105 transition-transform duration-200">
                      <Tag className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#044c5c] font-semibold">
                      Logo
                    </span>
                  </div>

                  {/* Kısa Cevap */}
                  <div onClick={()=> addFormElement({type:"shortText", label:"Kısa Metin"})}className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50/70 hover:to-cyan-50/70 cursor-pointer group transition-all duration-200 border border-transparent hover:border-blue-200/50 hover:shadow-sm">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 shadow-sm group-hover:scale-105 transition-transform duration-200">
                      <Type className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#044c5c] font-semibold">
                      Kısa Metin
                    </span>
                  </div>

                  {/* Uzun Cevap */}
                  <div onClick={()=> addFormElement({type: "longText", label:"Uzun Metin"})}className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-green-50/70 hover:to-emerald-50/70 cursor-pointer group transition-all duration-200 border border-transparent hover:border-green-200/50 hover:shadow-sm">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-500 shadow-sm group-hover:scale-105 transition-transform duration-200">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#044c5c] font-semibold">
                      Uzun Metin
                    </span>
                  </div>

                  {/* Tek Seçim */}
                  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50/70 hover:to-purple-50/70 cursor-pointer group transition-all duration-200 border border-transparent hover:border-indigo-200/50 hover:shadow-sm">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 shadow-sm group-hover:scale-105 transition-transform duration-200">
                      <Circle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#044c5c] font-semibold">
                      Tek Seçim
                    </span>
                  </div>

                  {/* Doğru / Yanlış */}
                  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-rose-50/70 hover:to-pink-50/70 cursor-pointer group transition-all duration-200 border border-transparent hover:border-rose-200/50 hover:shadow-sm">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-rose-500 to-pink-500 shadow-sm group-hover:scale-105 transition-transform duration-200">
                      <HelpCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#044c5c] font-semibold">
                      Doğru / Yanlış
                    </span>
                  </div>

                  {/* Çoklu Seçim */}
                  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-teal-50/70 hover:to-cyan-50/70 cursor-pointer group transition-all duration-200 border border-transparent hover:border-teal-200/50 hover:shadow-sm">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-teal-500 to-cyan-500 shadow-sm group-hover:scale-105 transition-transform duration-200">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#044c5c] font-semibold">
                      Çoklu Seçim
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 bg-gradient-to-br from-white/50 to-purple-50/30">
          <div className="max-w-3xl mx-auto h-full flex items-center justify-center">
           {formElement.length === 0 ? (
             <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-3xl border border-purple-200/30 shadow-lg px-12">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Plus className="w-10 h-10 text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold text-[#044c5c] mb-4">
                Quiz Oluşturmaya Başlayın
              </h3>
              <p className="text-[#37747c] text-lg leading-relaxed max-w-md mx-auto">
                Sol panelden quiz elementlerini seçerek interaktif quizinizi
                oluşturun
              </p>

              {/* Decorative dots */}
              <div className="flex justify-center gap-2 mt-8">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              </div>
            </div>
           ) : (
            <div className="space-y-4 w-full">
              {formElement.map((element) =>renderFormElement(element))}
            </div>
           )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCreate;
