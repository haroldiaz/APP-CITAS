import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import Navbar from "../Componentes/Navbar";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

export default function ExportarPdf() {
  const [citas, setCitas] = useState([]);
  const refVista = useRef();

  useEffect(() => {
    const guardadas = localStorage.getItem("citas");
    const parseadas = guardadas ? JSON.parse(guardadas) : [];
    setCitas(Array.isArray(parseadas) ? parseadas : []);
  }, []);

  const exportarPDF = () => {
    const doc = new jsPDF("p", "pt", "a4");
    let y = 40;

    doc.setFontSize(16);
    doc.text("Listado de Citas", 40, y);
    y += 30;

    citas.forEach((cita, index) => {
      doc.setFillColor(230, 247, 255);
      doc.rect(30, y, 530, 120, "F");

      doc.setTextColor(0);
      doc.setFontSize(10);
      doc.text(`Nombre: ${cita.nombre}`, 40, y + 20);
      doc.text(`Cédula: ${cita.cedula}`, 300, y + 20);
      doc.text(`Teléfono: ${cita.telefono}`, 40, y + 40);
      doc.text(`Fecha: ${cita.fecha}`, 300, y + 40);
      doc.text(`Hora: ${cita.hora}`, 40, y + 60);
      doc.text(`Motivo: ${cita.motivo}`, 300, y + 60);
      doc.text(`Nota: ${cita.nota}`, 40, y + 80);
      doc.text(`Estado: ${cita.estado || 'En espera'}`, 300, y + 80);

      y += 140;

      if (y > 750) {
        doc.addPage();
        y = 40;
      }
    });

    doc.save("citas_estilo_card.pdf");
  };

  const exportarExcel = () => {
    const datos = citas.map((cita) => ({
      Nombre: cita.nombre,
      Cédula: cita.cedula,
      Teléfono: cita.telefono,
      Fecha: cita.fecha,
      Hora: cita.hora,
      Motivo: cita.motivo,
      Nota: cita.nota,
      Estado: cita.estado || 'En espera',
    }));

    const hoja = XLSX.utils.json_to_sheet(datos);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Citas");

    XLSX.writeFile(libro, "citas.xlsx");
  };

  return (
    <div>
      <Navbar title="Exportar Datos" />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          {/* Panel izquierdo: info y botones */}
          <Box sx={{ flex: 1, minWidth: "300px" }}>
            <Card
              sx={{
                mb: 3,
                backgroundColor: "#e3f2fd",
                borderLeft: "6px solid #1976d2",
              }}
            >
              <CardContent>
                <Typography variant="h6">Total de Citas Registradas</Typography>
                <Typography variant="h4" color="primary">
                  {citas.length}
                </Typography>
              </CardContent>
            </Card>

            <Typography variant="h5" gutterBottom>
              Exportar listado de citas
            </Typography>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
              <Button variant="contained" color="primary" onClick={exportarPDF}>
                Exportar a PDF
              </Button>
              <Button variant="outlined" color="success" onClick={exportarExcel}>
                Exportar a Excel
              </Button>
            </Box>
          </Box>

          {/* Panel derecho: vista previa */}
          <Box
            sx={{
              flex: 1,
              minWidth: "300px",
              maxHeight: "80vh",
              overflowY: "auto",
              borderLeft: { md: "1px solid #ccc" },
              pl: { md: 3 },
            }}
            ref={refVista}
          >
            {citas.map((cita, i) => (
              <Card
                key={i}
                sx={{
                  mb: 2,
                  backgroundColor: "#f5f5f5",
                  borderLeft: "4px solid #1976d2",
                  boxShadow: 1,
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1">
                    <strong>Nombre:</strong> {cita.nombre}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Cédula:</strong> {cita.cedula}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Teléfono:</strong> {cita.telefono}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Fecha:</strong> {cita.fecha}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Hora:</strong> {cita.hora}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Motivo:</strong> {cita.motivo}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Nota:</strong> {cita.nota}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Estado:</strong> {cita.estado || 'En espera'}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </div>
  );
}
