import React from "react";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import Swal from "sweetalert2";
import "./Style/PdfInput.css";
import { useDispatch } from "react-redux";
import { setPDF, updatePDFPosition } from "../../../Store/Slices/PDFSlice";
import { initializeState } from "../../../Store/Slices/ImageSlice";
const PdfInput = () => {
  const dispatch = useDispatch();
  const sendPDFData = (pdf) => {
    const file = pdf.currentTarget.files[0];
    if (file.type != "application/pdf") {
      return Swal.fire({
        icon: "error",
        title: "Invalid file format",
        text: "Only PDF files are allowed",
      });
    }
    dispatch(updatePDFPosition({ position: 0, value: pdf.currentTarget.files[0]}));
    dispatch(updatePDFPosition({ position: 1, value: 1 }));
    dispatch(updatePDFPosition({ position: 2, value: 0 }));
    dispatch(updatePDFPosition({ position: 3, value: 1 }));
    dispatch(updatePDFPosition({ position: 4, value: 0 }));
    dispatch(updatePDFPosition({ position: 5, value: 0 }));
    dispatch(updatePDFPosition({ position: 6, value: false }));
    dispatch(updatePDFPosition({ position: 7, value: false }));
    dispatch(updatePDFPosition({ position: 8, value: 1 }));
    dispatch(updatePDFPosition({ position: 9, value: 1 }));
  };

  return (
    <div className="PDF-Input-Div">
      <div className="PDF-Input-Option">
        <UploadFileOutlinedIcon id="PDF-Input-Icon" />
        <p>
          <span className="PDF-Input-Content">Upload PDF file</span> or drag and
          drop PDF
        </p>
        <input
          type="file"
          accept=".pdf"
          id="pdfInput"
          name="pdfInput"
          className="PDF-Input"
          onChange={(pdf) => {
            sendPDFData(pdf);
          }}
        />
      </div>
    </div>
  );
};

export default PdfInput;
