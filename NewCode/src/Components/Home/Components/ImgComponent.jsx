import { useState, useEffect, useRef } from "react";
import "./Style/ImgComponent.css";
import ResizeHook from "./Hooks/ResizeHook";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setPDF, updatePDFPosition } from "../../../Store/Slices/PDFSlice";
import { Event } from "@mui/icons-material";
const ImgComponent = ({
  index,
  image,
  number,
  visibleImage,
  page,
  scale,
  stampRef,
  visiblePageRef,
  PDFData,
  xCoordinate,
  yCoordinate,
  height,
  width,
  rotation,
  opacity,
  ImgData,
  activeImage,
  setImgDragging,
  handleMouseDownOnImage,
  handleMouseUpOnImage,
  checkConstraintsAndUpdate,
  dropPosition,
}) => {
  const ResizeHookFunctions = ResizeHook(
    PDFData,
    ImgData,
    setImgDragging,
    dropPosition,
    visiblePageRef,
    checkConstraintsAndUpdate,
    image
  );
  const dispatch = useDispatch();

  const PDFDataItem = useSelector((state) => {
    return state.users;
  });

  const [ActiveImagePosition, setActiveImagePosition] = useState(false);
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    if (ActiveImagePosition) {
      setHovered(false);
    } else {
      setHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleInsideClick = () => {
    dispatch(updatePDFPosition({ position: 7, value: true }));
    dispatch(updatePDFPosition({ position: 6, value: true }));
    setActiveImagePosition(true);
  };

  useEffect(() => {
      if(PDFDataItem[7]){
        dispatch(updatePDFPosition({ position: 6, value: true }));
        setActiveImagePosition(true);
      }
      else{
        dispatch(updatePDFPosition({ position: 6, value: false }));
        setActiveImagePosition(false);
      }
    }, [PDFDataItem[7]]);

  return (
    <div
      key={index}
      hidden={visibleImage}
      style={{
        height:height,
        width: width,
        position: "absolute",
        top: yCoordinate,
        left: xCoordinate,
        zIndex: "2",
        opacity: `${opacity / 100}`,
        transform: `rotate(${rotation}deg)`,
        border: isHovered ? "2px solid #4700a457" : "none",
      }}
      onClick={handleInsideClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={(event) => {
        handleMouseDownOnImage(event, number);
        handleMouseLeave();
      }}
      onMouseUp={handleMouseUpOnImage}
      ref={(node) =>
        PDFData[1] == page && activeImage == number
          ? (stampRef.current = node)
          : null
      }
    >
      <div
        style={{
          cursor: ResizeHookFunctions.PointerTwo,
        }}
        className={
          PDFData[1] == page && activeImage == number && ActiveImagePosition
            ? "PDFViewer-RightTopCornerDiv"
            : "None-PDFViewer-RightTopCornerDiv"
        }
        id="RightTopCornerDiv"
        onMouseDown={(event) =>
          ResizeHookFunctions.handleMouseDown(event, "RightTopCornerDiv")
        }
      ></div>
      <div
        style={{
          cursor: ResizeHookFunctions.PointerOne,
        }}
        className={
          PDFData[1] == page && activeImage == number && ActiveImagePosition
            ? "PDFViewer-LeftTopCornerDiv"
            : "None-PDFViewer-LeftTopCornerDiv"
        }
        id="LeftTopCornerDiv"
        onMouseDown={(event) =>
          ResizeHookFunctions.handleMouseDown(event, "LeftTopCornerDiv")
        }
      ></div>
      <div
        style={{
          cursor: ResizeHookFunctions.PointerOne,
        }}
        className={
          PDFData[1] == page && activeImage == number && ActiveImagePosition
            ? "PDFViewer-RightBottomCornerDiv"
            : "None-PDFViewer-RightBottomCornerDiv"
        }
        id="RightBottomCornerDiv"
        onMouseDown={(event) =>
          ResizeHookFunctions.handleMouseDown(event, "RightBottomCornerDiv")
        }
      ></div>
      <div
        style={{
          cursor: ResizeHookFunctions.PointerTwo,
        }}
        className={
          PDFData[1] == page && activeImage == number && ActiveImagePosition
            ? "PDFViewer-LeftBottomCornerDiv"
            : "None-PDFViewer-LeftBottomCornerDiv"
        }
        id="LeftBottomCornerDiv"
        onMouseDown={(event) =>
          ResizeHookFunctions.handleMouseDown(event, "LeftBottomCornerDiv")
        }
      ></div>
      <img
        key={index}
        src={image["url"]}
        alt="Nothing"
        className={
          PDFData[1] == page && activeImage == number && ActiveImagePosition
            ? "PDFViewer-Img"
            : "None-PDFViewer-Img"
        }
        onClick={() => setActiveImagePosition(ActiveImagePosition)}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
};
export default ImgComponent;
