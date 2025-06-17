import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { blue } from "@mui/material/colors";

const TOTAL_TIME = 3 * 60; // 3 minutes in seconds
const sampleQuestions = [
  {
    id: 1,
    question: "React'te state yönetimi için hangi hook kullanılır?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "JSX nedir?",
    options: [
      "JavaScript XML",
      "Java Syntax Extension",
      "JSON XML",
      "JavaScript Extension",
    ],
    correctAnswer: 0,
  },
  {
    id: 3,
    question: "React bileşenleri nasıl tanımlanır?",
    options: [
      "Sadece class ile",
      "Sadece function ile",
      "Hem class hem function ile",
      "Hiçbiri",
    ],
    correctAnswer: 2,
  },
];

const QuizCard = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(TOTAL_TIME);
  const [isTimeUp, setIsTimeUp] = useState(false);
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

  const currentQuestionData = sampleQuestions[currentQuestion];

  const handleAnswerSelect = (event) => {
    setSelectedAnswer(Number(event.target.value));
  };
  const handleNextQuestion = () => {
    // Doğru cevabı kontrol et
    if (selectedAnswer === sampleQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    // Sonraki soruya geç veya sonucu göster
    if (currentQuestion + 1 < sampleQuestions.length) {
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
  if (showResults) {
    return (
      <Card sx={{ maxWidth: 600, mx: "auto", my: 4, p: 2 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            {isTimeUp ? "Süre Doldu!" : "Quiz Tamamlandı!"}
          </Typography>
          <Typography variant="h6">
            Skorunuz: {score} / {sampleQuestions.length}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Yeniden Başla
          </Button>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card sx={{ maxWidth: 600, mx: "auto", my: 4, p: 2 }}>
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" align="center" gutterBottom>
            Kalan Süre: {formatTime(timeRemaining)}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(timeRemaining / TOTAL_TIME) * 100}
            sx={{
              height: 8,
              borderRadius: 5,
              "& .MuiLinearProgress-bar": {
                backgroundColor: blue[500],
              },
            }}
          />
        </Box>
        <Typography variant="h6" gutterBottom>
          Soru:{currentQuestion + 1} / {sampleQuestions.length}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {currentQuestionData.question}
        </Typography>

        <RadioGroup
          value={selectedAnswer}
          onChange={handleAnswerSelect}
          sx={{ my: 2 }}
        >
          {currentQuestionData.options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={index}
              label={option}
              control={<Radio />}
              sx={{ mb: 1 }}
            />
          ))}
        </RadioGroup>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Typography variant="body2">Skor: 0</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
          >
            {currentQuestion === sampleQuestions.length - 1 ? "Bitir" : "İleri"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuizCard;
