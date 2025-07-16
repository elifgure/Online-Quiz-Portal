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
  TextField,
  Checkbox,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


const OrnekQuiz = () => {
  const activeQuiz = useSelector((state) => state.activeQuiz);
  const questions = activeQuiz?.elements || [];
  console.log("activeQuiz:", activeQuiz);
console.log("questions:", questions);
  const duration = Number(activeQuiz?.duration) || 60; // dakika
  const TOTAL_TIME = duration * 60; // saniye
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(TOTAL_TIME);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeQuiz || !questions.length) {
      navigate("/student-quizzes");
    }
    // eslint-disable-next-line
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
        Quiz bilgisi yüklenemedi. Lütfen <Link to="/student-quizzes">buraya</Link> tıklayarak tekrar deneyin.
      </Typography>
    );
  }

  const currentQuestionData = questions[currentQuestion];

  const handleAnswerSelect = (event) => {
    setSelectedAnswer(Number(event.target.value));
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
                label={`${optionLetters[index] || ""}) ${option}`}
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
            <FormControlLabel value="false" control={<Radio />} label="Yanlış" />
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

  if (showResults) {
    return (
      <Card sx={{ maxWidth: 600, mx: "auto", my: 4, p: 2 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            {isTimeUp ? "Süre Doldu!" : "Quiz Tamamlandı!"}
          </Typography>
          <Typography variant="h6">
            Skorunuz: {score} / {questions.length}
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
          Soru: {currentQuestion + 1} / {questions.length}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {currentQuestionData.label || currentQuestionData.question}
        </Typography>
        {renderAnswerInput()}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
    
          <Button
            variant="contained"
            color="primary"
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
