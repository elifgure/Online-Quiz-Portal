import React, { useState } from "react";
import { sendResetEmail } from "../../features/Auth/authService";
import { auth } from "../../lib/fireBase";
import { Box, TextField, Typography, Alert, Container } from "@mui/material";
import Button from "../../components/UI/Button"; // Button bileşenini import edin

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendResetEmail(auth, email);
      setSuccessMsg(
        "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi."
      );
    } catch (error) {
      console.error("Şifre sıfırlama hatası:", error);
      setErrorMsg(
        "Geçerli bir e-posta adresi giriniz veya kullanıcı bulunamadı."
      );
    }
  };
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Şifremi Unuttum
        </Typography>
        <Typography variant="body1" gutterBottom>
          Şifre sıfırlama bağlantısı almak için e-posta adresinizi girin.
        </Typography>
        <form onSubmit={handleResetPassword}>
          <TextField
            label="E-posta"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />
          <Button
            type="submit"
            variant="danger"
            size="lg"
            className="w-full mt-4"
          >
            Şifre Sıfırlama E-postası Gönder
          </Button>
        </form>

        {successMsg && <Alert severity="success" sx={{ mt: 2 }}>{successMsg}</Alert>}
        {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;
