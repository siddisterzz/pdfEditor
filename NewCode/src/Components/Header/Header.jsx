import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "./Images/main-logo.svg";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import "./Style/Header.css";
import html2canvas from 'html2canvas';
import { useEffect } from "react";
import { PDFDocument } from 'pdf-lib';
import { useDispatch,useSelector } from "react-redux";
import { updatePDFPosition } from "../../Store/Slices/PDFSlice";
const Header = ({sendDataToParent}) => {
  const dispatch = useDispatch()
  const PDFData = useSelector((state)=>{
    return state.users;
  })
  const navigate = useNavigate();
  const GoToHome = () => {
    return navigate("/");
  }
  const fileDownload = async () => {
    console.log(PDFData[3])
    const PDFDoc = await PDFDocument.create();
    const pageElements = document.querySelectorAll(".Pdf-Page");
    for (let i = 0; i < pageElements.length; i++) {
      const pageRect = pageElements[i].getBoundingClientRect()
      const canvas = await html2canvas(pageElements[i], {height:pageRect.height,width:pageRect.width,format: 'jpeg', quality: 1.0,});
      const imageBytes = canvas.toDataURL('image/png');
      const pngImage = await PDFDoc.embedPng(imageBytes);
      const page = PDFDoc.addPage([canvas.width, canvas.height]);
      page.drawImage(pngImage, {
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height,
      });
    }
    dispatch(updatePDFPosition({position:3,value:1}))
    dispatch(updatePDFPosition({ position: 5, value: 0 }));
    const pdfBytes = await PDFDoc.save();
    downloadFile(pdfBytes, 'modified_file.pdf');
  }
  const downloadFile = (data, filename)=>{
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    dispatch(updatePDFPosition({ position: 12, value: false }));
  }
  const handleDownloadClick = () => {
    dispatch(updatePDFPosition({ position: 3, value: 3 }));
    dispatch(updatePDFPosition({ position: 5, value: -1 }));
  };
  useEffect(()=>{
    if(PDFData[12]){
      fileDownload()
    }
  },[PDFData[12]])
  return (
    <div className="Header">
      <div className="Header-Content">
        <div className="Header-Logo" onClick={GoToHome}>
          <img src={Image} />
        </div>
        <div className="Header-Download">
          <button className="Header-Download-Button" onClick={handleDownloadClick}>
            {" "}
            <FileDownloadOutlinedIcon />{" "} Free Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
