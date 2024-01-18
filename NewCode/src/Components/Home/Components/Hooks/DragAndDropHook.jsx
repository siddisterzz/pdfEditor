import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatePDFPosition } from "../../../../Store/Slices/PDFSlice";

const DragAndDropHook = (
  PDFData,
  ImgData,
  stampRef,
  visiblePageRef,
  checkConstraintsAndUpdate,
  dropPosition,
  setDropPosition
) => {
  const dispatch = useDispatch();
  const [holdingPosition, setHoldingPosition] = useState({ x: 0, y: 0 });
  const [imgDragging, setImageDragging] = useState(false);

  const handleMouseMove = (event) => {
    if (imgDragging) {
      event.preventDefault();
      const reliefPosition = { x: event.clientX, y: event.clientY };
      const delta = {
        X: reliefPosition.x - holdingPosition.x,
        Y: reliefPosition.y - holdingPosition.y,
      };
      if (visiblePageRef.current) {
        let updatedX =
          (ImgData[PDFData[1] - 1][PDFData[5] - 1].connected
            ? ImgData[0][PDFData[5] - 1].left
            : ImgData[PDFData[1] - 1][PDFData[5] - 1].left) + delta.X;
        let updatedY =
          (ImgData[PDFData[1] - 1][PDFData[5] - 1].connected
            ? ImgData[0][PDFData[5] - 1].top
            : ImgData[PDFData[1] - 1][PDFData[5] - 1].top) + delta.Y;
        checkConstraintsAndUpdate(updatedX, updatedY);
      }
    }
  };

  const handleMouseDown = (event, pageNo) => {
    event.preventDefault();
    setImageDragging(true);
    setHoldingPosition({ x: event.clientX, y: event.clientY });
    dispatch(updatePDFPosition({ position: 5, value: pageNo }));
  };

  const handleMouseUp = (event) => {
    setImageDragging(false);
  };

  useEffect(() => {
    const visiblePage = visiblePageRef.current;
    if (visiblePage) {
      if (imgDragging) {
        visiblePage.addEventListener("mousemove", handleMouseMove);
        visiblePage.addEventListener("mouseup", handleMouseUp);
        visiblePage.addEventListener("mouseleave", handleMouseUp);
      }
      return () => {
        visiblePage.removeEventListener("mousemove", handleMouseMove);
        visiblePage.removeEventListener("mouseup", handleMouseUp);
        visiblePage.removeEventListener("mouseleave", handleMouseUp);
      };
    }
  }, [imgDragging]);

  return { handleMouseUp, handleMouseDown, setImageDragging };
};

export default DragAndDropHook;
