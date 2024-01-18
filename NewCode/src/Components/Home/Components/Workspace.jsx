import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PdfViewer from "./PdfViewer";
import PdfInputComp from "./PdfInput";
import { pdfjs } from "react-pdf";
import "./Style/Workspace.css";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const WorkSpace = () => {
  const [pdf, setPdf] = useState(null);

  const PDFData = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    setPdf(PDFData[0]);
  }, [PDFData]);

  return (
    <div className="Workspace-Container">
      {pdf ? <PdfViewer /> : <PdfInputComp />}
    </div>
  );
};

export default WorkSpace;
