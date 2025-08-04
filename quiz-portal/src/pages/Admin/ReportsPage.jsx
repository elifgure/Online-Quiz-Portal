import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllResults } from "../../redux/slices/resultsSlice";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Select,
  MenuItem,
  Modal,
  Paper,
  Button,
  IconButton,
  Chip,
} from "@mui/material";
import { Eye, X } from "lucide-react";

const ReportsPage = () => {
  const dispatch = useDispatch();
  const {
    items: results,
    status,
    error,
  } = useSelector((state) => state.results);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    dispatch(fetchAllResults());
  }, [dispatch]);

  const filteredResults = results.filter((result) => {
    const matchesSearch =
      result.studentName?.toLowerCase().includes(search.toLowerCase()) ||
      result.studentEmail?.toLowerCase().includes(search.toLowerCase());
    const matchesRole = filterRole === "all" || result.role === filterRole;

    return matchesRole && matchesSearch;
  });

  const handleDetailClick = (result) => {
    setSelectedResult(result);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedResult(null);
  };

  return (
    <Box className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-purple-200 p-6">
      {/* Başlık */}
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h4" className="text-2xl font-bold text-[#044c5c]">
          Tüm Kullanıcı Raporları
        </Typography>
      </Box>

      {/* Loading ve Error Durumları */}
      {status === "loading" && (
        <Box className="text-center py-4">
          <Typography className="text-[#37747c]">Yükleniyor...</Typography>
        </Box>
      )}
      {status === "failed" && (
        <Box className="text-center py-4">
          <Typography className="text-red-600">Hata: {error}</Typography>
        </Box>
      )}

      {/* Filtreleme Alanları */}
      <Box className="mb-6 flex flex-col sm:flex-row gap-4">
        <TextField
          value={search}
          label="İsim veya Email Ara"
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#a855f7",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#a855f7",
              },
            },
          }}
        />
        <Select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="sm:w-48"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#a855f7",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#a855f7",
            },
          }}
        >
          <MenuItem value="all">Tüm Roller</MenuItem>
          <MenuItem value="student">Öğrenci</MenuItem>
          <MenuItem value="teacher">Öğretmen</MenuItem>
        </Select>
      </Box>

      {/* Sonuç Sayısı */}
      <Box className="mb-4">
        <Typography className="text-sm text-[#37747c]">
          {filteredResults.length} sonuç bulundu
        </Typography>
      </Box>

      {/* Tablo Container */}
      <Box className="overflow-x-auto rounded-lg border border-purple-200">
        <Table
          sx={{ minWidth: 650, backgroundColor: "rgba(255, 255, 255, 0.5)" }}
        >
          <TableHead
            sx={{ background: "linear-gradient(to right, #faf5ff, #fff7ed)" }}
          >
            <TableRow>
              <TableCell
                sx={{
                  color: "#044c5c",
                  fontWeight: 600,
                  borderBottom: "1px solid #ddd6fe",
                  fontSize: "0.875rem",
                }}
              >
                Ad Soyad
              </TableCell>
              <TableCell
                sx={{
                  color: "#044c5c",
                  fontWeight: 600,
                  borderBottom: "1px solid #ddd6fe",
                  fontSize: "0.875rem",
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  color: "#044c5c",
                  fontWeight: 600,
                  borderBottom: "1px solid #ddd6fe",
                  fontSize: "0.875rem",
                }}
              >
                Quiz
              </TableCell>
              <TableCell
                sx={{
                  color: "#044c5c",
                  fontWeight: 600,
                  borderBottom: "1px solid #ddd6fe",
                  fontSize: "0.875rem",
                }}
              >
                Skor
              </TableCell>
              <TableCell
                sx={{
                  color: "#044c5c",
                  fontWeight: 600,
                  borderBottom: "1px solid #ddd6fe",
                  fontSize: "0.875rem",
                }}
              >
                Tarih
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#044c5c",
                  fontWeight: 600,
                  borderBottom: "1px solid #ddd6fe",
                  fontSize: "0.875rem",
                }}
              >
                İşlemler
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredResults.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  sx={{ py: 4, color: "#6b7280" }}
                >
                  Sonuç bulunamadı
                </TableCell>
              </TableRow>
            ) : (
              filteredResults.map((result, index) => (
                <TableRow
                  key={result.id}
                  sx={{
                    backgroundColor:
                      index % 2 === 0
                        ? "rgba(255, 255, 255, 0.3)"
                        : "rgba(255, 255, 255, 0.6)",
                    "&:hover": {
                      background:
                        "linear-gradient(to right, rgba(147, 51, 234, 0.05), rgba(251, 146, 60, 0.05))",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <TableCell
                    sx={{ color: "#2d6c74", borderBottom: "1px solid #e9d5ff" }}
                  >
                    {result.studentName || "Bilinmiyor"}
                  </TableCell>
                  <TableCell
                    sx={{ color: "#2d6c74", borderBottom: "1px solid #e9d5ff" }}
                  >
                    {result.studentEmail}
                  </TableCell>
                  <TableCell
                    sx={{ color: "#2d6c74", borderBottom: "1px solid #e9d5ff" }}
                  >
                    {result.quizTitle}
                  </TableCell>
                  <TableCell
                    sx={{ color: "#2d6c74", borderBottom: "1px solid #e9d5ff" }}
                  >
                    {result.score}/{result.totalQuestions}
                  </TableCell>
                  <TableCell
                    sx={{ color: "#2d6c74", borderBottom: "1px solid #e9d5ff" }}
                  >
                    {new Date(result.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ borderBottom: "1px solid #e9d5ff" }}
                  >
                    <Button
                      onClick={() => handleDetailClick(result)}
                      startIcon={<Eye size={16} />}
                      sx={{
                        color: "#0284c7",
                        "&:hover": {
                          color: "#075985",
                          backgroundColor: "transparent",
                        },
                        fontWeight: 500,
                        textTransform: "none",
                        transition: "colors 0.2s ease",
                      }}
                    >
                      Detay
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Box>

      {/* Detay Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            width: "90%",
            maxWidth: 600,
            maxHeight: "90vh",
            overflow: "auto",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            border: "1px solid #ddd6fe",
            borderRadius: "12px",
            p: 4,
            position: "relative",
          }}
        >
          {/* Modal Başlığı ve Kapatma Butonu */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography
              variant="h5"
              sx={{ color: "#044c5c", fontWeight: "bold" }}
            >
              Sonuç Detayları
            </Typography>
            <IconButton
              onClick={handleCloseModal}
              sx={{
                color: "#6b7280",
                "&:hover": {
                  color: "#374151",
                  backgroundColor: "rgba(107, 114, 128, 0.1)",
                },
              }}
            >
              <X size={20} />
            </IconButton>
          </Box>

          {selectedResult && (
            <Box>
              {/* Öğrenci Bilgileri */}
              <Box
                mb={3}
                p={3}
                sx={{
                  backgroundColor: "rgba(147, 51, 234, 0.05)",
                  borderRadius: "8px",
                  border: "1px solid #e9d5ff",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#044c5c", mb: 2, fontWeight: 600 }}
                >
                  Öğrenci Bilgileri
                </Typography>
                <Box display="flex" flexDirection="column" gap={1}>
                  <Typography sx={{ color: "#2d6c74" }}>
                    <strong>Ad Soyad:</strong>{" "}
                    {selectedResult.studentName || "Bilinmiyor"}
                  </Typography>
                  <Typography sx={{ color: "#2d6c74" }}>
                    <strong>Email:</strong> {selectedResult.studentEmail}
                  </Typography>
                  <Typography sx={{ color: "#2d6c74" }}>
                    <strong>Rol:</strong>{" "}
                    {selectedResult.role || "Belirtilmemiş"}
                  </Typography>
                </Box>
              </Box>

              {/* Quiz Bilgileri */}
              <Box
                mb={3}
                p={3}
                sx={{
                  backgroundColor: "rgba(251, 146, 60, 0.05)",
                  borderRadius: "8px",
                  border: "1px solid #fed7aa",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#044c5c", mb: 2, fontWeight: 600 }}
                >
                  Quiz Bilgileri
                </Typography>
                <Box display="flex" flexDirection="column" gap={1}>
                  <Typography sx={{ color: "#2d6c74" }}>
                    <strong>Quiz Başlığı:</strong> {selectedResult.quizTitle}
                  </Typography>
                  <Typography sx={{ color: "#2d6c74" }}>
                    <strong>Toplam Soru:</strong>{" "}
                    {selectedResult.totalQuestions}
                  </Typography>
                  <Typography sx={{ color: "#2d6c74" }}>
                    <strong>Doğru Cevap:</strong> {selectedResult.score}
                  </Typography>
                  <Typography sx={{ color: "#2d6c74" }}>
                    <strong>Başarı Oranı:</strong>{" "}
                    {Math.round(
                      (selectedResult.score / selectedResult.totalQuestions) *
                        100
                    )}
                    %
                  </Typography>
                </Box>
              </Box>

              {/* Zaman Bilgileri */}
              <Box
                p={3}
                sx={{
                  backgroundColor: "rgba(34, 197, 94, 0.05)",
                  borderRadius: "8px",
                  border: "1px solid #bbf7d0",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#044c5c", mb: 2, fontWeight: 600 }}
                >
                  Zaman Bilgileri
                </Typography>
                <Box display="flex" flexDirection="column" gap={1}>
                  <Typography sx={{ color: "#2d6c74" }}>
                    <strong>Tamamlanma Tarihi:</strong>{" "}
                    {new Date(selectedResult.createdAt).toLocaleString()}
                  </Typography>
                  <Typography sx={{ color: "#2d6c74" }}>
                    <strong>Süre:</strong>{" "}
                    {selectedResult.duration
                      ? `${selectedResult.duration} dakika`
                      : "Belirtilmemiş"}
                  </Typography>
                  <Typography sx={{ color: "#2d6c74" }}>
                    <strong>Kullanılan Süre:</strong>{" "}
                    {selectedResult.timeSpent
                      ? `${Math.floor(selectedResult.timeSpent / 60)} dakika ${
                          selectedResult.timeSpent % 60
                        } saniye`
                      : "Belirtilmemiş"}
                  </Typography>
                </Box>
              </Box>

              {/* Soru Detayları */}
              {selectedResult.details && selectedResult.details.length > 0 && (
                <Box mb={3}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#044c5c", mb: 2, fontWeight: 600 }}
                  >
                    Soru Detayları
                  </Typography>
                  {selectedResult.details.map((detail, index) => (
                    <Box
                      key={index}
                      sx={{
                        mb: 2,
                        p: 2,
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        borderRadius: "8px",
                        border: "1px solid",
                        borderColor: detail.isCorrect ? "#bbf7d0" : "#fecaca",
                        position: "relative",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{ color: "#044c5c", pr: 8 }}
                      >
                        <strong>Soru {index + 1}:</strong> {detail.question}
                      </Typography>

                      <Box sx={{ mt: 1, pl: 2 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: detail.isCorrect ? "#059669" : "#dc2626",
                            mb: 0.5,
                          }}
                        >
                          <strong>Öğrenci Cevabı:</strong> {detail.userAnswer}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#0284c7",
                            mt: 0.5,
                          }}
                        >
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
              )}

              {/* Kapatma Butonu */}
              <Box display="flex" justifyContent="flex-end" mt={4}>
                <Button
                  onClick={handleCloseModal}
                  variant="contained"
                  sx={{
                    background: "linear-gradient(to right, #a855f7, #9333ea)",
                    "&:hover": {
                      background: "linear-gradient(to right, #9333ea, #7c3aed)",
                    },
                    textTransform: "none",
                    fontWeight: 500,
                    px: 3,
                    py: 1,
                  }}
                >
                  Kapat
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
      </Modal>
    </Box>
  );
};

export default ReportsPage;
