import React, { useEffect, useState, useMemo } from "react"; // useMemo'yu import edin
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


const OrnekQuiz = () => {
  const activeQuiz = useSelector((state) => state.activeQuiz);
  
  // her renderda gereksiz tetiklememesi için.
  const questions = useMemo(() => 
    activeQuiz?.elements || [], 
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
      <Card sx={{ maxWidth: 600, mx: "auto", my: 4, p: 2, borderRadius: 4, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom color="primary" align="center">
            {isTimeUp ? "Süre Doldu!" : "Quiz Tamamlandı!"}
          </Typography>
          <Typography variant="h6" align="center">
            Skorunuz: {score} / {questions.length}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/student-quizzes")}
            sx={{ mt: 2, borderRadius: 2 }}
          >
            BİTİR
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", my: 4, p: { xs: 1, sm: 3 }, borderRadius: 4, boxShadow: 4, background: 'linear-gradient(135deg, #f8fafc 0%, #f3e8ff 100%)' }}>
      <CardContent>
        <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="subtitle2" align="center" gutterBottom sx={{ color: purple[700], fontWeight: 700, fontSize: 16, letterSpacing: 1 }}>
            Kalan Süre
          </Typography>
          <Typography variant="h6" align="center" gutterBottom sx={{ color: blue[700], fontWeight: 700, fontSize: 20, mb: 0.5 }}>
            {formatTime(timeRemaining)}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(timeRemaining / TOTAL_TIME) * 100}
            sx={{
              height: 8,
              borderRadius: 5,
              width: '100%',
              background: '#e0e7ff',
              '& .MuiLinearProgress-bar': {
                backgroundColor: blue[500],
              },
            }}
          />
        </Box>
        <Box sx={{
          background: 'linear-gradient(90deg, #f9fafb 0%, #f3e8ff 100%)',
          borderRadius: 3,
          boxShadow: 2,
          p: { xs: 2, sm: 3 },
          mb: 3,
          border: '1px solid #e0e7ff',
          position: 'relative',
        }}>
          <Typography variant="caption" sx={{ position: 'absolute', top: 12, left: 16, color: '#7c3aed', fontWeight: 600, fontSize: 13, opacity: 0.8 }}>
            Soru {currentQuestion + 1} / {questions.length}
          </Typography>
          <Typography variant="body1" gutterBottom align="center" sx={{ color: '#3b0764', fontWeight: 600, fontSize: 18, mt: 2 }}>
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
              background: 'linear-gradient(90deg, #60a5fa 0%, #6366f1 100%)',
              color: '#fff',
              boxShadow: '0 2px 8px #e0e7ff',
              fontSize: 16,
              letterSpacing: 0.5,
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)',
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
