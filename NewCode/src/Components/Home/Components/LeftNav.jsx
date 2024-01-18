import { useState, useEffect, useRef } from "react";
import { Document, Page } from "react-pdf";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import "./Style/LeftNav.css";
import { useDispatch } from "react-redux";
import { updatePDFPosition } from "../../../Store/Slices/PDFSlice";
import { useSelector } from "react-redux";
const LeftNav = () => {
  const dispatch = useDispatch();
  const PDFData = useSelector((state) => {
    return state.users;
  });
  const ImgData = useSelector((state) => {
    return state.usersImages;
  });
  const [numPages, setNumPages] = useState(0);
  const leftNavRef = useRef();
  const selectedPageRef = useRef();
  const [selectedPageNumber, setSelectedPageNumber] = useState(0);
  const [pageNumberArray, setPageNumberArray] = useState([]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const pageSelectHandler = (number) => {
    dispatch(updatePDFPosition({ position: 1, value: number }));
    dispatch(updatePDFPosition({ position: 4, value: number }));
    setSelectedPageNumber(number);
  };
  useEffect(() => {
    const array = Array.from({ length: numPages }, (_, index) => index + 1);
    setPageNumberArray(array);
  }, [numPages]);

  useEffect(() => {
    setSelectedPageNumber(PDFData[1]);
    leftNavRef.current.scrollTop = 0;
    dispatch(updatePDFPosition({ position: 7, value: false }));
    if (PDFData[1] > 1) {
      const number = PDFData[1];
      leftNavRef.current.scrollTop =
        selectedPageRef.current.clientHeight * (number - 1) +
        20 * (number - 1) -
        60;
    }
  }, [PDFData[1]]);

  return (
    <div className="LeftNav-Pdf-Viewer" ref={leftNavRef}>
      <Document file={PDFData[0]} onLoadSuccess={onDocumentLoadSuccess}>
        {pageNumberArray.map((number) => (
          <div
            key={number}
            onClick={() => pageSelectHandler(number)}
            ref={number === selectedPageNumber ? selectedPageRef : null}
          >
            <Page
              key={number}
              pageNumber={number}
              height={175}
              width={175}
              className={`LeftNav-Pdf-Page ${
                number == selectedPageNumber ? "selected-Page" : ""
              }`}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            >
              {ImgData[number - 1] && ImgData[number - 1].length != 0 ? (
                ImgData[number - 1].filter((item) => item.visibility === false)
                  .length != 0 ? (
                  <div className="LeftNav-Number-Image">
                    <TaskAltIcon id="LeftNav-Number-Icon" />{" "}
                    {
                      ImgData[number - 1].filter(
                        (item) => item.visibility === false
                      ).length
                    }
                  </div>
                ) : (
                  <></>
                )
              ) : null}
            </Page>
          </div>
        ))}
      </Document>
    </div>
  );
};
export default LeftNav;
