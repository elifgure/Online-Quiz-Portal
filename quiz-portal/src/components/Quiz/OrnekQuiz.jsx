import { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  LinearProgress,
  TextField,
  Checkbox,
} from "@mui/material";
import { blue, purple } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { saveStudentResult } from "../../features/Quizzes/resultService";

const OrnekQuiz = () => {
  const activeQuiz = useSelector((state) => state.activeQuiz);
  const { user } = useAuth();

  // her renderda gereksiz tetiklememesi için.
  const questions = useMemo(
    () => activeQuiz?.elements || [],
    [activeQuiz?.elements]
  );

  const duration = Number(activeQuiz?.duration) || 60; // dakika
  const TOTAL_TIME = duration * 60; // saniye
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(TOTAL_TIME);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (!activeQuiz || !questions.length) {
      navigate("/student-quizzes");
    }
    // Eğer activeQuiz veya questions boşsa, öğrenci quizlerine yönlendir
  }, [activeQuiz, questions, navigate]);

  useEffect(() => {
    if (timeRemaining > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeRemaining === 0 && !showResults) {
      setShowResults(true);
      setIsTimeUp(true);
    }
  }, [timeRemaining, showResults]);

  if (!activeQuiz || !questions.length) {
    return (
      <Typography align="center" mt={10} variant="h6">
        Quiz bilgisi yüklenemedi. Lütfen{" "}
        <Link to="/student-quizzes">buraya</Link> tıklayarak tekrar deneyin.
      </Typography>
    );
  }

  const currentQuestionData = questions[currentQuestion];

  const handleAnswerSelect = (event) => {
    const value =
      currentQuestionData.type === "MultiChoice"
        ? Number(event.target.value)
        : event.target.value;
    setSelectedAnswer(value);
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: value,
    }));
  };

  const handleNextQuestion = () => {
    // Doğru cevabı kontrol et (eğer correctAnswer varsa)
    if (
      typeof currentQuestionData.correctAnswer !== "undefined" &&
      selectedAnswer === currentQuestionData.correctAnswer
    ) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const optionLetters = ["A", "B", "C", "D", "E", "F", "G"];
  const renderAnswerInput = () => {
    switch (currentQuestionData.type) {
      case "multiChoice":
        return (
          <RadioGroup
            value={selectedAnswer}
            onChange={handleAnswerSelect}
            sx={{ my: 2 }}
          >
            {currentQuestionData.options?.map((option, index) => (
              <FormControlLabel
                key={index}
                value={index}
                label={`${optionLetters[index] || ""} ${option}`}
                control={<Radio />}
                sx={{ mb: 1 }}
              />
            ))}
          </RadioGroup>
        );
      case "shortText":
        return (
          <TextField
            fullWidth
            variant="outlined"
            label="Cevabınız"
            value={selectedAnswer || ""}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            sx={{ my: 2 }}
          />
        );
      case "longText":
        return (
          <TextField
            fullWidth
            variant="outlined"
            label="Cevabınız"
            multiline
            minRows={3}
            value={selectedAnswer || ""}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            sx={{ my: 2 }}
          />
        );
      case "boolean":
        return (
          <RadioGroup
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            sx={{ my: 2 }}
          >
            <FormControlLabel value="true" control={<Radio />} label="Doğru" />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="Yanlış"
            />
          </RadioGroup>
        );
      default:
        return (
          <TextField
            fullWidth
            variant="outlined"
            label="Cevabınız"
            value={selectedAnswer || ""}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            sx={{ my: 2 }}
          />
        );
    }
  };

  const checkAnswers = () => {
    let totalScore = 0;
    const results = questions.map((question, index) => {
      const userAnswer = answers[index] || selectedAnswer;
      const teacherAnswer = question.value; // Değişiklik burada

      const isCorrect =
        userAnswer.toLowerCase() === teacherAnswer.toLowerCase();

      if (isCorrect) totalScore++;

      return {
        questionNumber: index + 1,
        question: question.label,
        userAnswer: userAnswer || "Cevap verilmedi",
        correctAnswer: teacherAnswer,
        isCorrect: isCorrect,
      };
    });

    return { score: totalScore, details: results };
  };

  // showResults true olduğunda çalışacak useEffect
  useEffect(() => {
    if (showResults) {
      const quizResults = checkAnswers();
      const resultToSave = {
        studentId: user.uid,
        studentName: user.displayName,
        quizId: activeQuiz.id || "unknown",
        quizTitle: activeQuiz.title || "Bilinmeyen Quiz",
        category: activeQuiz.category || "Genel",
        score: quizResults.score,
        totalQuestions: questions.length,
        details: quizResults.details,
        studentEmail: user.email,
      };
      console.log("Sonuç kaydediliyor:", resultToSave);
      saveStudentResult(resultToSave);
    }
  }, [showResults]); // sadece showResults true olduğunda çalışır

  // showResults true olduğunda gösterilecek kart
  if (showResults) {
    const quizResults = checkAnswers();

    return (
      <Card
        sx={{
          maxWidth: 900,
          mx: "auto",
          my: 4,
          p: 3,
          borderRadius: 6,
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
            zIndex: 1,
          },
        }}
      >
        <CardContent sx={{ position: "relative", zIndex: 2 }}>
          <Box
            sx={{
              textAlign: "center",
              mb: 4,
              p: 3,
              borderRadius: 4,
              background: "rgba(255,255,255,0.9)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                background: "linear-gradient(135deg, #0d6efd 0%, #6f42c1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 800,
                mb: 2,
              }}
            >
              {isTimeUp ? (
                <>
                  <span style={{ color: "#dc3545" }}>⏰</span> Süre Doldu!
                </>
              ) : (
                <>
                  <span style={{ color: "#ffc107" }}>🎉</span> Quiz Tamamlandı!
                </>
              )}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: "#4a5568",
                fontWeight: 600,
                mb: 1,
              }}
            >
              Puanınız: {quizResults.score} / {questions.length}
            </Typography>

            <Box
              sx={{
                display: "inline-block",
                px: 3,
                py: 1,
                borderRadius: 20,
                background: `linear-gradient(135deg, ${
                  quizResults.score / questions.length >= 0.8
                    ? "#10b981"
                    : quizResults.score / questions.length >= 0.6
                    ? "#f59e0b"
                    : "#ef4444"
                } 0%, ${
                  quizResults.score / questions.length >= 0.8
                    ? "#059669"
                    : quizResults.score / questions.length >= 0.6
                    ? "#d97706"
                    : "#dc2626"
                } 100%)`,
                color: "white",
                fontWeight: 600,
                fontSize: 14,
                mt: 1,
              }}
            >
              {Math.round((quizResults.score / questions.length) * 100)}% Başarı
            </Box>
          </Box>

          <Box sx={{ mt: 4 }}>
            {quizResults.details.map((result, index) => (
              <Box
                key={index}
                sx={{
                  mb: 3,
                  p: 3,
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.95)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  border: `3px solid ${
                    result.isCorrect ? "#10b981" : "#ef4444"
                  }`,
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "4px",
                    background: result.isCorrect
                      ? "linear-gradient(90deg, #10b981 0%, #059669 100%)"
                      : "linear-gradient(90deg, #ef4444 0%, #dc2626 100%)",
                  },
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: result.isCorrect ? "#10b981" : "#ef4444",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  {result.isCorrect ? "✓" : "✗"}
                </Box>

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    color: "#2d3748",
                    pr: 5,
                    mb: 3,
                  }}
                >
                  Soru {result.questionNumber}: {result.question}
                </Typography>

                <Box
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    background: "#f8f9fa",
                    border: "1px solid #e9ecef",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#6c757d",
                      fontWeight: 600,
                      fontSize: 14,
                      mb: 1,
                    }}
                  >
                    Sizin Cevabınız:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: result.isCorrect ? "#059669" : "#dc2626",
                      fontWeight: 600,
                      fontSize: 16,
                      mb: 2,
                    }}
                  >
                    {result.userAnswer}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#6c757d",
                      fontWeight: 600,
                      fontSize: 14,
                      mb: 1,
                    }}
                  >
                    Doğru Cevap:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#0d6efd",
                      fontWeight: 600,
                      fontSize: 16,
                    }}
                  >
                    {result.correctAnswer}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Button
            variant="contained"
            onClick={() => navigate("/results")}
            sx={{
              mt: 4,
              py: 2,
              px: 2,
              borderRadius: 50,
              background: "linear-gradient(to right, #a855f7, #ec4899)",
              color: "white",
              fontWeight: 600,
              fontSize: 20,
              textTransform: "none",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(to right, #9333ea, #db2777)",
                transform: "translateY(-1px)",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              },
            }}
            fullWidth
          >
            Sonuçlarımı Gör
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        maxWidth: 600,
        mx: "auto",
        my: 4,
        p: { xs: 1, sm: 3 },
        borderRadius: 4,
        boxShadow: 4,
        background: "linear-gradient(135deg, #f8fafc 0%, #f3e8ff 100%)",
      }}
    >
      <CardContent>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="subtitle2"
            align="center"
            gutterBottom
            sx={{
              color: purple[700],
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: 1,
            }}
          >
            Kalan Süre
          </Typography>
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            sx={{ color: blue[700], fontWeight: 700, fontSize: 20, mb: 0.5 }}
          >
            {formatTime(timeRemaining)}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(timeRemaining / TOTAL_TIME) * 100}
            sx={{
              height: 8,
              borderRadius: 5,
              width: "100%",
              background: "#e0e7ff",
              "& .MuiLinearProgress-bar": {
                backgroundColor: blue[500],
              },
            }}
          />
        </Box>
        <Box
          sx={{
            background: "linear-gradient(90deg, #f9fafb 0%, #f3e8ff 100%)",
            borderRadius: 3,
            boxShadow: 2,
            p: { xs: 2, sm: 3 },
            mb: 3,
            border: "1px solid #e0e7ff",
            position: "relative",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: 12,
              left: 16,
              color: "#7c3aed",
              fontWeight: 600,
              fontSize: 13,
              opacity: 0.8,
            }}
          >
            Soru {currentQuestion + 1} / {questions.length}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            align="center"
            sx={{ color: "#3b0764", fontWeight: 600, fontSize: 18, mt: 2 }}
          >
            {currentQuestionData.label || currentQuestionData.question}
          </Typography>
        </Box>
        {renderAnswerInput()}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button
            variant="contained"
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 700,
              background: "linear-gradient(90deg, #60a5fa 0%, #6366f1 100%)",
              color: "#fff",
              boxShadow: "0 2px 8px #e0e7ff",
              fontSize: 16,
              letterSpacing: 0.5,
              textTransform: "none",
              "&:hover": {
                background: "linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)",
              },
            }}
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
          >
            {currentQuestion === questions.length - 1 ? "Bitir" : "İleri"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrnekQuiz;
