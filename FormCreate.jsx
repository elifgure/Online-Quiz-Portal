import React from 'react';
import { 
  Component,
  Palette,
  Shuffle,
  Search,
  ChevronDown,
  Tag,
  Type,
  FileText,
  Circle,
  HelpCircle,
  Check,
  ChevronUp,
  Plus,
  Eye,
  Save,
  Share2
} from 'lucide-react';

const FormCreate = () => {
//    const [formElement, setFormElement]= useState([])
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <input
              type="text"
              className="text-xl font-semibold bg-transparent border-none outline-none focus:bg-gray-50 px-2 py-1 rounded"
              placeholder="Form başlığı"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Eye className="w-4 h-4" />
              Önizle
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Save className="w-4 h-4" />
              Kaydet
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors">
              <Share2 className="w-4 h-4" />
              Paylaş
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex">
          {/* Left Tab Navigation */}
          <div className="w-24 border-r border-gray-200 p-4 flex flex-col gap-4">
            {/* Elementler Tab - Active */}
            <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-blue-50 border border-blue-200 cursor-pointer">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-100">
                <Component className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-blue-900 text-center">Elementler</span>
            </div>

            {/* Tasarım Tab */}
            <div className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100">
                <Palette className="w-4 h-4 text-gray-600" />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center">Tasarım</span>
            </div>

            {/* Mantık Tab */}
            <div className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100">
                <Shuffle className="w-4 h-4 text-gray-600" />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center">Mantık</span>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Formatı ara"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Elements List */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Temel Alanlar Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between w-full p-2 text-left hover:bg-gray-50 rounded-lg cursor-pointer">
                  <span className="font-semibold text-gray-800">Temel Alanlar</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>

                <div className="mt-3 space-y-2">
                  {/* Logo */}
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer group">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-100">
                      <Tag className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-gray-700 font-medium">Logo</span>
                  </div>

                  {/* Kısa metin */}
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer group">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-100">
                      <Type className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-gray-700 font-medium">Kısa metin</span>
                  </div>

                  {/* Uzun Metin */}
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer group">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-100">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-gray-700 font-medium">Uzun Metin</span>
                  </div>

                  {/* Tek Seçim */}
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer group">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-100">
                      <Circle className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-gray-700 font-medium">Tek Seçim</span>
                  </div>

                  {/* Evet / Hayır */}
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer group">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-100">
                      <HelpCircle className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-gray-700 font-medium">Evet / Hayır</span>
                  </div>

                  {/* Çoklu Seçim */}
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer group">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-100">
                      <Check className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-gray-700 font-medium">Çoklu Seçim</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Form oluşturmaya başlayın</h3>
              <p className="text-gray-600">Sol panelden form alanlarını seçerek formunuzu oluşturun</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCreate;