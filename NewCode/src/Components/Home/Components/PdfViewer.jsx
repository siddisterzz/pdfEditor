import { useRef } from "react";
import { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import DragAndDropHook from "./Hooks/DragAndDropHook";

import "./Style/PdfViewer.css";
import { useDispatch } from "react-redux";
import { updatePDFPosition } from "../../../Store/Slices/PDFSlice";
import {
  updateDropPosition,
  updateAllDropPosition,
} from "../../../Store/Slices/ImageSlice";
import { useSelector } from "react-redux";
import ImgComponent from "./ImgComponent";
import ScrollHook from "./Hooks/ScrollHook";

const PdfViewer = () => {
  const dispatch = useDispatch();
  const PDFData = useSelector((state) => {
    return state.users;
  });
  const ImgData = useSelector((state) => {
    return state.usersImages;
  });

  const [numPages, setNumPages] = useState(0);
  const [pageNumberArray, setPageNumberArray] = useState([]);
  const [dropPosition, setDropPosition] = useState({ x: 0, y: 0 });
  const stampRef = useRef();
  const visiblePageRef = useRef();
  const pdfViewerRef = useRef();
  const [iActive, setActive] = useState(true);
  const [mainPageWidth, setmainPageWidth] = useState(1);

  useEffect(() => {
    const array = Array.from({ length: numPages }, (_, index) => index + 1);
    setPageNumberArray(array);
  }, [numPages]);

  useEffect(() => {
    if (visiblePageRef.current) {
      const number = PDFData[4];
      pdfViewerRef.current.scrollTop = 0;
      pdfViewerRef.current.scrollTop =
        visiblePageRef.current.clientHeight * (number - 1) +
        20 * (number - 1) -
        50;
    }
  }, [PDFData[4]]);

  useEffect(() => {
    if (visiblePageRef.current && ImgData.length > 0) {
      dispatch(
        updateAllDropPosition({
          currentScale: PDFData[3],
          prevScale: mainPageWidth,
        })
      );
    }
    dispatch(
      updatePDFPosition({ position: 10, value: PDFData[10] * PDFData[3] })
    );
    dispatch(
      updatePDFPosition({ position: 11, value: PDFData[11] * PDFData[3] })
    );
    setmainPageWidth(PDFData[3]);
  }, [PDFData[3]]);

  useEffect(() => {
    if(pdfViewerRef.current && visiblePageRef.current){
      const pdfViewerRect = pdfViewerRef.current.getBoundingClientRect();
      const ViewerRect = visiblePageRef.current.getBoundingClientRect();
      if (ViewerRect.width > pdfViewerRect.width) {
        setActive(false);
      } else {
        setActive(true);
      }
    }
  }, [mainPageWidth]);

  const checkConstraintsAndUpdate = (updatedleft, updatedtop) => {
    const imgRefRect = stampRef.current.getBoundingClientRect();
    const visiblePageRect = visiblePageRef.current.getBoundingClientRect();

    const newDropPosition = { x: updatedleft, y: updatedtop };

    let updatedright = newDropPosition.x + imgRefRect.width;
    let updatedbottom = newDropPosition.y + imgRefRect.height;

    const width = (imgRefRect.width - stampRef.current.offsetWidth) / 2;
    const height = (imgRefRect.height - stampRef.current.offsetHeight) / 2;

    if (ImgData[PDFData[1] - 1][PDFData[5] - 1].rotation !== 0) {
      updatedleft = updatedleft - width;
      updatedtop = updatedtop - height;
    }
    if (updatedleft < 0) {
      newDropPosition.x = width;
    }
    if (updatedtop < 0) {
      newDropPosition.y = height;
    }
    if (updatedright > visiblePageRect.width + width) {
      newDropPosition.x = visiblePageRect.width - imgRefRect.width + width;
    }
    if (updatedbottom > visiblePageRect.height + height) {
      newDropPosition.y = visiblePageRect.height - imgRefRect.height + height;
    }
    if (ImgData[PDFData[1] - 1][PDFData[5] - 1].connected) {
      dispatch(
        updateDropPosition({
          page: 1,
          position: PDFData[5],
          value: newDropPosition,
        })
      );
    } else {
      dispatch(
        updateDropPosition({
          page: PDFData[1],
          position: PDFData[5],
          value: newDropPosition,
        })
      );
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    dispatch(updatePDFPosition({ position: 2, value: numPages }));
    setNumPages(numPages);
  };

  const ScrollHookFunctions = ScrollHook(pdfViewerRef);

  const DNDHookFunctions = DragAndDropHook(
    PDFData,
    ImgData,
    stampRef,
    visiblePageRef,
    checkConstraintsAndUpdate,
    dropPosition,
    setDropPosition
  );

  const onPageLoadSuccess = (page) => {
    const { height } = page.getViewport({ scale: mainPageWidth });
    dispatch(updatePDFPosition({ position: 10, value: height }));
    dispatch(updatePDFPosition({ position: 11, value: 700 }));
  };

  return (
    <div
      className={iActive ? "Pdf-Viewer" : "None-Pdf-Viewer"}
      ref={pdfViewerRef}
    >
    <div className={PDFData[5]!==-1?"Pdf-Viewer-Download-Cover-Invisible":"Pdf-Viewer-Download-Cover"}>
      <button 
      style={{padding : '20px'}}
      onClick={()=>{
        dispatch(updatePDFPosition({ position: 12, value: true }));
      }}
      >Download</button>
    </div>
      <Document file={PDFData[0]} onLoadSuccess={onDocumentLoadSuccess}>
        {pageNumberArray.map((number) => (
          <div
            className={PDFData[1] == number ? "Border" : "None-Border"}
            key={number}
          >
            <Page
              key={number}
              pageNumber={number}
              width={700 * mainPageWidth}
              className="Pdf-Page"
              renderAnnotationLayer={false}
              renderTextLayer={false}
              onLoadSuccess={onPageLoadSuccess}
              inputRef={PDFData[1] == number ? visiblePageRef : null}
            >
              {ImgData[number - 1]
                ? ImgData[number - 1].map((image, index) => (
                    <ImgComponent
                      key={index}
                      index={index}
                      visibleImage={image.visibility}
                      image={image}
                      number={index + 1}
                      page={number}
                      xCoordinate={
                        image.connected
                          ? ImgData[0][index].left
                          : image.falseOnClickValue
                          ? ImgData[PDFData[1] - 1][PDFData[5] - 1].left
                          : image.left
                      }
                      yCoordinate={
                        image.connected
                          ? ImgData[0][index].top
                          : image.falseOnClickValue
                          ? ImgData[PDFData[1] - 1][PDFData[5] - 1].top
                          : image.top
                      }
                      height={
                        image.connected
                          ? ImgData[0][index].height
                          : image.falseOnClickValue
                          ? ImgData[PDFData[1] - 1][PDFData[5] - 1].height
                          : image.height
                      }
                      width={
                        image.connected
                          ? ImgData[0][index].width
                          : image.falseOnClickValue
                          ? ImgData[PDFData[1] - 1][PDFData[5] - 1].width
                          : image.width
                      }
                      rotation={
                        image.connected
                          ? ImgData[0][index].rotation
                          : image.falseOnClickValue
                          ? ImgData[PDFData[1] - 1][PDFData[5] - 1].rotation
                          : image.rotation
                      }
                      opacity={
                        image.connected
                          ? ImgData[0][index].opacity
                          : image.falseOnClickValue
                          ? ImgData[PDFData[1] - 1][PDFData[5] - 1].opacity
                          : image.opacity
                      }
                      scale={mainPageWidth}
                      activeImage={PDFData[5]}
                      stampRef={stampRef}
                      visiblePageRef={visiblePageRef}
                      PDFData={PDFData}
                      ImgData={ImgData}
                      setImgDragging={DNDHookFunctions.setImageDragging}
                      handleMouseDownOnImage={DNDHookFunctions.handleMouseDown}
                      handleMouseUpOnImage={DNDHookFunctions.handleMouseUp}
                      checkConstraintsAndUpdate={checkConstraintsAndUpdate}
                      dropPosition={dropPosition}
                    />
                  ))
                : null}
            </Page>
          </div>
        ))}
      </Document>
    </div>
  );
};

export default PdfViewer;
