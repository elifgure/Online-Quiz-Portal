import React from "react";
import { CheckCircle, XCircle, HelpCircle } from "lucide-react";

const ResultDetails = ({ result }) => {
  if (!result.details || result.details.length === 0) {
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-[#37747c]">Bu sonuç için detay bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 border-t border-purple-100 pt-6">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="w-6 h-6 text-[#37747c]" />
        <h3 className="text-lg font-semibold text-[#044c5c]">Soru Detayları</h3>
      </div>
      
      <div className="space-y-4">
        {result.details.map((item, index) => (
          <div key={index} className="bg-purple-50/60 rounded-lg p-4 border border-purple-100">
            <div className="flex items-start gap-3 mb-3">
              <span className="font-medium text-[#044c5c] min-w-fit">
                {item.questionNumber}.
              </span>
              <div className="flex-1">
                <p className="font-semibold text-[#044c5c] mb-2">
                  {item.question}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {item.isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className="text-[#044c5c]">
                      <strong>Senin Cevabın:</strong>{" "}
                      <span className={`font-medium ${item.isCorrect ? "text-green-600" : "text-red-600"}`}>
                        {item.userAnswer}
                      </span>
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-[#044c5c]">
                      <strong>Doğru Cevap:</strong>{" "}
                      <span className="font-medium text-green-600">
                        {item.correctAnswer}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultDetails;