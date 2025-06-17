import React, { useState, useEffect } from "react";
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
import { styled } from "@mui/material/styles";

// Constants
const TOTAL_TIME = 3 * 60; // 30 minutes in seconds
const WARNING_TIME = 100; // 5 minutes warning

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
const QuizCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: "20px auto",
  padding: theme.spacing(2),
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
}));

const OrnekQuiz2 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(TOTAL_TIME);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    if (timeRemaining > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeRemaining === 0 && !showResults) {
      setIsTimeUp(true);
      setShowResults(true);
    }
  }, [timeRemaining, showResults]);

  const handleAnswerSelect = (event) => {
    setSelectedAnswer(Number(event.target.value));
  };
  const handleNextQuestion = () => {
    if (selectedAnswer === currentQuestionData.correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < sampleQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      setShowResults(true);
    }
  };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getProgressColor = (timeLeft) => {
    if (timeLeft <= WARNING_TIME) return "error.main";
    if (timeLeft <= WARNING_TIME * 2) return "warning.main";
    return "primary.main";
  };

  if (showResults) {
    return (
      <QuizCard>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            {isTimeUp ? "Süre Doldu!" : "Quiz Tamamlandı!"}
          </Typography>
          <Typography variant="h6">
            Skorunuz: {score} / {sampleQuestions.length}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Kalan Süre: {formatTime(timeRemaining)}
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
      </QuizCard>
    );
  }
  const currentQuestionData = sampleQuestions[currentQuestion];
  return (
    <QuizCard>
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            align="center"
            color={timeRemaining <= WARNING_TIME ? "error" : "textPrimary"}
            gutterBottom
          >
            Kalan Süre: {formatTime(timeRemaining)}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(timeRemaining / TOTAL_TIME) * 100}
            sx={{
              height: 8,
              borderRadius: 5,
              "& .MuiLinearProgress-bar": {
                backgroundColor: getProgressColor(timeRemaining),
              },
            }}
          />
        </Box>

        <Typography variant="subtitle1" gutterBottom>
          İlerleme: {currentQuestion + 1} / {sampleQuestions.length}
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
              control={<Radio />}
              label={option}
              sx={{ mb: 1 }}
            />
          ))}
        </RadioGroup>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Typography variant="body2">Skor: {score}</Typography>
          <Button
            variant="contained"
            color="primary"
            disabled={selectedAnswer === null}
            onClick={handleNextQuestion}
          >
            {currentQuestion === sampleQuestions.length - 1 ? "Bitir" : "İleri"}
          </Button>
        </Box>
      </CardContent>
    </QuizCard>
  );
};

export default OrnekQuiz2;
