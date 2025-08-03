import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { ChevronDown, Award, Clock, Book, User } from "lucide-react";

const StudentReports = ({ result }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  const getScoreColor = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "success";
    if (percentage >= 60) return "warning";
    return "error";
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleChange}
      sx={{
        mb: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "8px !important",
        "&:before": { display: "none" },
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        paddingTop: "8px",
        paddingBottom: "8px",
      }}
    >
      <AccordionSummary
        expandIcon={<ChevronDown />}
        sx={{
          borderBottom: expanded ? "1px solid" : "none",
          borderColor: "divider",
          "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
            <Book className="w-5 h-5 text-purple-500" />
            <Typography
              variant="h6"
              sx={{ fontSize: "1rem", color: "#044c5c" }}
            >
              {result.quizTitle}
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}
            >
              <User className="w-3 h-3 text-gray-500 " />
              <Typography
                variant="caption"
                color="text.secondary"
                fontSize={15}
              >
                {result.studentName || "Bilinmiyor"}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mr: 3 }}>
            <Chip
              icon={<Award className="w-4 h-4" />}
              label={`${result.score}/${result.totalQuestions}`}
              color={getScoreColor(result.score, result.totalQuestions)}
              size="small"
            />
          </Box>
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ bgcolor: "rgba(0,0,0,0.01)" }}>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          fontSize={15}
          gutterBottom
        >
          Soru Detayları:
        </Typography>

        <Box sx={{ mt: 2 }}>
          {result.details?.map((detail, index) => (
            <Box
              key={index}
              sx={{
                mb: 3,
                p: 2,
                bgcolor: "background.paper",
                borderRadius: 1,
                border: "1px solid",
                borderColor: detail.isCorrect ? "success.light" : "error.light",
                position: "relative",
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                <strong>Soru {index + 1}:</strong> {detail.question}
              </Typography>

              <Box sx={{ mt: 1, pl: 2 }}>
                <Typography
                  variant="body2"
                  color={detail.isCorrect ? "success.main" : "error.main"}
                >
                  <strong>Öğrenci Cevabı:</strong> {detail.userAnswer}
                </Typography>
                <Typography variant="body2" color="primary" sx={{ mt: 0.5 }}>
                  <strong>Doğru Cevap:</strong> {detail.correctAnswer}
                </Typography>
              </Box>

              <Chip
                label={detail.isCorrect ? "Doğru" : "Yanlış"}
                color={detail.isCorrect ? "success" : "error"}
                size="small"
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                }}
              />
            </Box>
          ))}
        </Box>

        {/* Quiz Detayları */}
        <Box sx={{ mt: 2, p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            gutterBottom
            fontSize={15}
          >
            Quiz Özeti
          </Typography>
          <Typography variant="body2">
            Toplam Puan:{" "}
            {Math.round((result.score / result.totalQuestions) * 100)}%
          </Typography>
          <Typography variant="body2">
            Tamamlanma Tarihi:{" "}
            {result.createdAt
              ? new Date(result.createdAt).toLocaleString()
              : "Tarih bulunamadı"}
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default StudentReports;
