import React from "react";
import { FileText } from "lucide-react";
import ShortText from "../Forms/FormElements/ShortText";
import LongText from "../Forms/FormElements/LongText";
import MultiChoice from "../Forms/FormElements/MultiChoice";
import BooleanField from "../Forms/FormElements/BooleanField";

import LogoField from "../Forms/FormElements/LogoField";

const elementComponentMap = {
  shortText: ShortText,
  longText: LongText,
  multiChoice: MultiChoice,
  boolean: BooleanField,
 
  logo: LogoField,
};

const SingleQuiz = ({ quiz }) => {


  if (!quiz) return <div>Quiz bulunamadı.</div>;

 

  return (
    <div className="max-w-2xl mx-auto bg-white/90 rounded-2xl shadow-lg p-8 mt-8">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-8 h-8 text-purple-500" />
        <h2 className="text-2xl font-bold text-[#044c5c]">{quiz.title}</h2>
        <span className="ml-auto bg-purple-50 px-3 py-1 rounded-lg text-[#37747c] text-sm">
          Süre: <span className="font-bold">{quiz.duration}</span> dk
        </span>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[#044c5c] mb-4">Sorular</h3>
        {quiz.elements && quiz.elements.length > 0 ? (
          <ul className="space-y-8">
            {quiz.elements.map((el, idx) => {
              const ElementComponent = elementComponentMap[el.type];
              return (
                <li key={el.id || idx} className="bg-purple-50/60 rounded-lg p-4 border border-purple-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-[#044c5c]">{idx + 1}.</span>
                    <span className="font-semibold text-[#044c5c]">{el.label || "(Başlıksız Soru)"}</span>
                  </div>
                  <div className="mt-2">
                    {ElementComponent ? (
                      <ElementComponent
                        {...el}
                        isPreview = {true}
                       
                      />
                    ) : (
                      <input
                        className="w-full border rounded px-3 py-2"
                        placeholder="Cevabınızı girin"
                       
                      />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-[#37747c]">Bu quizde henüz soru yok.</div>
        )}
      </div>
    </div>
  );
};

export default SingleQuiz;
