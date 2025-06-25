import React, { useState } from 'react';
import { 
  Plus, 
  Type, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  MapPin, 
  FileText, 
  CheckSquare, 
  Circle, 
  Star, 
  ThumbsUp, 
  Upload, 
  CreditCard, 
  Trash2, 
  GripVertical,
  Eye,
  Settings,
  Save,
  Share2,
} from 'lucide-react';

const FormBuilder = () => {
  const [formElements, setFormElements] = useState([]);
  const [formTitle, setFormTitle] = useState('Yeni Form');

  const fieldTypes = [
    { type: 'text', icon: Type, label: 'Metin', color: 'bg-blue-50 border-blue-200 text-blue-700' },
    { type: 'email', icon: Mail, label: 'E-posta', color: 'bg-green-50 border-green-200 text-green-700' },
    { type: 'phone', icon: Phone, label: 'Telefon', color: 'bg-purple-50 border-purple-200 text-purple-700' },
    { type: 'date', icon: Calendar, label: 'Tarih', color: 'bg-orange-50 border-orange-200 text-orange-700' },
    { type: 'time', icon: Clock, label: 'Saat', color: 'bg-pink-50 border-pink-200 text-pink-700' },
    { type: 'address', icon: MapPin, label: 'Adres', color: 'bg-red-50 border-red-200 text-red-700' },
    { type: 'textarea', icon: FileText, label: 'Uzun Metin', color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
    { type: 'checkbox', icon: CheckSquare, label: 'Çoklu Seçim', color: 'bg-teal-50 border-teal-200 text-teal-700' },
    { type: 'radio', icon: Circle, label: 'Tek Seçim', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
    { type: 'rating', icon: Star, label: 'Değerlendirme', color: 'bg-amber-50 border-amber-200 text-amber-700' },
    { type: 'like', icon: ThumbsUp, label: 'Beğeni', color: 'bg-cyan-50 border-cyan-200 text-cyan-700' },
    { type: 'file', icon: Upload, label: 'Dosya Yükleme', color: 'bg-gray-50 border-gray-200 text-gray-700' },
    { type: 'payment', icon: CreditCard, label: 'Ödeme', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' }
  ];

  const addFormElement = (fieldType) => {
    const newElement = {
      id: Date.now(),
      type: fieldType.type,
      label: `${fieldType.label} Alanı`,
      required: false,
      placeholder: `${fieldType.label} giriniz...`
    };
    setFormElements([...formElements, newElement]);
  };

  const removeElement = (id) => {
    setFormElements(formElements.filter(el => el.id !== id));
  };

  const updateElement = (id, property, value) => {
    setFormElements(formElements.map(el => 
      el.id === id ? { ...el, [property]: value } : el
    ));
  };

  const renderFormElement = (element) => {
    const fieldType = fieldTypes.find(ft => ft.type === element.type);
    const IconComponent = fieldType?.icon || Type;
   console.log('Rendering element:', element);

    return (
      <div key={element.id} className="bg-white border border-gray-200 rounded-lg p-4 mb-4 group hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
            <IconComponent className="w-4 h-4 text-gray-600" />
            <input
              type="text"
              value={element.label}
              onChange={(e) => updateElement(element.id, 'label', e.target.value)}
              className="font-medium text-gray-800 bg-transparent border-none outline-none focus:bg-gray-50 px-2 py-1 rounded"
              placeholder="Alan adı"
            />
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <Settings className="w-4 h-4" />
            </button>
            <button 
              onClick={() => removeElement(element.id)}
              className="p-1 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {element.type === 'textarea' ? (
            <textarea
              placeholder={element.placeholder}
              className="w-full p-3 border border-gray-200 rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled
            />
          ) : element.type === 'checkbox' || element.type === 'radio' ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type={element.type} name={`field_${element.id}`} disabled />
                <span className="text-gray-600">Seçenek 1</span>
              </div>
              <div className="flex items-center gap-2">
                <input type={element.type} name={`field_${element.id}`} disabled />
                <span className="text-gray-600">Seçenek 2</span>
              </div>
            </div>
          ) : element.type === 'rating' ? (
            <div className="flex gap-1">
              {[1,2,3,4,5].map(star => (
                <Star key={star} className="w-6 h-6 text-gray-300 hover:text-yellow-400 cursor-pointer" />
              ))}
            </div>
          ) : element.type === 'file' ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <span className="text-gray-600">Dosya yüklemek için tıklayın</span>
            </div>
          ) : (
            <input
              type={element.type === 'text' ? 'text' : element.type}
              placeholder={element.placeholder}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled
            />
          )}
          
          <div className="flex items-center gap-4 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={element.required}
                onChange={(e) => updateElement(element.id, 'required', e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-gray-600">Zorunlu alan</span>
            </label>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
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

      <div className="flex">
        {/* Sidebar - Field Types */}
        <div className="w-80 bg-white border-r border-gray-200 p-6 h-screen overflow-y-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Form Alanları</h3>
          <div className="space-y-2">
            {fieldTypes.map((fieldType) => {
              const IconComponent = fieldType.icon;
              return (
                <button
                  key={fieldType.type}
                  onClick={() => addFormElement(fieldType)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 border-dashed transition-all hover:shadow-sm ${fieldType.color}`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{fieldType.label}</span>
                  <Plus className="w-4 h-4 ml-auto" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content - Form Builder */}
        <div className="flex-1 p-6">
          <div className="max-w-2xl mx-auto">
            {formElements.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Form oluşturmaya başlayın</h3>
                <p className="text-gray-600">Sol panelden form alanlarını seçerek formunuzu oluşturun</p>
              </div>
            ) : (
              <div>
                <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{formTitle}</h2>
                  <p className="text-gray-600">Form açıklaması buraya gelecek...</p>
                </div>
                
                {formElements.map(renderFormElement)}
                
                <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
                  <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Gönder
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;