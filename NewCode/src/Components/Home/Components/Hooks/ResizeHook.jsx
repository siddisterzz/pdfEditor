import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateDimensions } from "../../../../Store/Slices/ImageSlice";
const ResizeHook = (
  PDFData,
  ImgData,
  setImgDragging,
  dropPosition,
  visiblePageRef,
  checkConstraintsAndUpdate,
  image
) => {
  const dispatch = useDispatch();
  const [holdingPosition, setHoldingPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const scale = image.height/image.width;
  const selectedDiv = useRef("RightBottomCornerDiv");

  const handleMouseDown = (event, div) => {
    selectedDiv.current = div;
    event.preventDefault();
    setDragging(true);
    setHoldingPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event) => {
    if (dragging) {
      setImgDragging(false);
      event.preventDefault();
      const reliefPosition = { x: event.clientX, y: event.clientY };
      const delta = { X: 0, Y: 0 };
      if (
        (image.rotation <= 0 && image.rotation > -30) ||
        (image.rotation <= 360 && image.rotation > 330)
      ) {
        if (selectedDiv.current === "RightBottomCornerDiv") {
          delta.X = reliefPosition.x - holdingPosition.x;
          delta.Y = (reliefPosition.x - holdingPosition.x)*scale;
        }
        if (selectedDiv.current === "RightTopCornerDiv") {
          delta.X = reliefPosition.x - holdingPosition.x;
          delta.Y = (reliefPosition.x - holdingPosition.x)*scale;
          checkConstraintsAndUpdate(
            image.connected ? ImgData[0][PDFData[5] - 1].left : image.left,
            (image.connected ? ImgData[0][PDFData[5] - 1].top : image.top) -
              delta.Y
          );
        }
        if (selectedDiv.current === "LeftTopCornerDiv") {
          delta.X = holdingPosition.x - reliefPosition.x;
          delta.Y = (holdingPosition.x - reliefPosition.x)*scale;
          checkConstraintsAndUpdate(
            (image.connected ? ImgData[0][PDFData[5] - 1].left : image.left) -
              delta.X,
            (image.connected ? ImgData[0][PDFData[5] - 1].top : image.top) -
              delta.Y
          );
        }
        if (selectedDiv.current === "LeftBottomCornerDiv") {
          delta.X = holdingPosition.x - reliefPosition.x;
          delta.Y = (holdingPosition.x - reliefPosition.x)*scale;
          checkConstraintsAndUpdate(
            (image.connected ? ImgData[0][PDFData[5] - 1].left : image.left) -
              delta.X,
            image.connected ? ImgData[0][PDFData[5] - 1].top : image.top
          );
        }
      }
      if (
        (image.rotation <= -30 && image.rotation > -80) ||
        (image.rotation <= 330 && image.rotation > 280)
      ) {
        if (selectedDiv.current === "RightBottomCornerDiv") {
          delta.X = reliefPosition.x - holdingPosition.x;
          delta.Y = (reliefPosition.x - holdingPosition.x)*scale;
        }
        if (selectedDiv.current === "RightTopCornerDiv") {
          delta.X = holdingPosition.y - reliefPosition.y;
          delta.Y = (holdingPosition.y - reliefPosition.y)*scale;
          checkConstraintsAndUpdate(
            image.connected ? ImgData[0][PDFData[5] - 1].left : image.left,
            (image.connected ? ImgData[0][PDFData[5] - 1].top : image.top) -
              delta.Y
          );
        }
        if (selectedDiv.current === "LeftTopCornerDiv") {
          delta.X = holdingPosition.x - reliefPosition.x;
          delta.Y = (holdingPosition.x - reliefPosition.x)*scale;
          checkConstraintsAndUpdate(
            (image.connected ? ImgData[0][PDFData[5] - 1].left : image.left) -
              delta.X,
            (image.connected ? ImgData[0][PDFData[5] - 1].top : image.top) -
              delta.Y
          );
        }
        if (selectedDiv.current === "LeftBottomCornerDiv") {
          delta.X = reliefPosition.y - holdingPosition.y;
          delta.Y = (reliefPosition.y - holdingPosition.y)*scale;
          checkConstraintsAndUpdate(
            (image.connected ? ImgData[0][PDFData[5] - 1].left : image.left) -
              delta.X,
            image.connected ? ImgData[0][PDFData[5] - 1].top : image.top
          );
        }
      }
      if (
        (image.rotation <= -80 && image.rotation > -120) ||
        (image.rotation <= 280 && image.rotation > 240)
      ) {
        if (selectedDiv.current === "LeftBottomCornerDiv") {
          delta.X = reliefPosition.x - holdingPosition.x;
          delta.Y = (reliefPosition.x - holdingPosition.x)*scale;
        }

        if (selectedDiv.current === "RightTopCornerDiv") {
          delta.X = holdingPosition.x - reliefPosition.x;
          delta.Y = (holdingPosition.x - reliefPosition.x)*scale;
          checkConstraintsAndUpdate(
            (image.connected ? ImgData[0][PDFData[5] - 1].left : image.left) -
              delta.X,
            (image.connected ? ImgData[0][PDFData[5] - 1].top : image.top) -
              delta.Y
          );
        }
        if (selectedDiv.current === "RightBottomCornerDiv") {
          delta.X = reliefPosition.x - holdingPosition.x;
          delta.Y = (reliefPosition.x - holdingPosition.x)*scale;
          checkConstraintsAndUpdate(
            image.connected ? ImgData[0][PDFData[5] - 1].left : image.left,
            (image.connected ? ImgData[0][PDFData[5] - 1].top : image.top) -
              delta.Y
          );
        }
        if (selectedDiv.current === "LeftTopCornerDiv") {
          delta.X = holdingPosition.x - reliefPosition.x;
          delta.Y = (holdingPosition.x - reliefPosition.x)*scale;
          checkConstraintsAndUpdate(
            (image.connected ? ImgData[0][PDFData[5] - 1].left : image.left) -
              delta.X,
            image.connected ? ImgData[0][PDFData[5] - 1].top : image.top
          );
        }
      }
      if (
        (image.rotation <= -120 && image.rotation > -160) ||
        (image.rotation <= 240 && image.rotation > 200)
      ) {
        if (selectedDiv.current === "RightBottomCornerDiv") {
          delta.X = holdingPosition.y - reliefPosition.y;
          delta.Y = (holdingPosition.y - reliefPosition.y)*scale;
          checkConstraintsAndUpdate(
            image.connected ? ImgData[0][PDFData[5] - 1].left : image.left,
            (image.connected ? ImgData[0][PDFData[5] - 1].top : image.top) -
              delta.Y
          );
        }
        if (selectedDiv.current === "RightTopCornerDiv") {
          delta.X = holdingPosition.x - reliefPosition.x;
          delta.Y = (holdingPosition.x - reliefPosition.x)*scale;
          checkConstraintsAndUpdate(
            (image.connected ? ImgData[0][PDFData[5] - 1].left : image.left) -
              delta.X,
            (image.connected ? ImgData[0][PDFData[5] - 1].top : image.top) -
              delta.Y
          );
        }
        if (selectedDiv.current === "LeftTopCornerDiv") {
          delta.X = reliefPosition.y - holdingPosition.y;
          delta.Y = (reliefPosition.y - holdingPosition.y)*scale;
          checkConstraintsAndUpdate(
            (image.connected ? ImgData[0][PDFData[5] - 1].left : image.left) -
              delta.X,
            image.connected ? ImgData[0][PDFData[5] - 1].top : image.top
          );
        }
        if (selectedDiv.current === "LeftBottomCornerDiv") {
          delta.X = reliefPosition.x - holdingPosition.x;
          delta.Y = (reliefPosition.x - holdingPosition.x)*scale;
        }
      }
      if (
        (image.rotation <= -160 && image.rotation > -210) ||
        (image.rotation <= 200 && image.rotation > 150)
      ) {
        if (selectedDiv.current === "RightBottomCornerDiv") {
          delta.X = holdingPosition.y - reliefPosition.y;
          delta.Y = (holdingPosition.y - reliefPosition.y)*scale;
          checkConstraintsAndUpdate(
            (image.connected ? ImgData[0][PDFData[5] - 1].left : image.left) -
              delta.X,
            (image.connected ? ImgData[0][PDFData[5] - 1].top : image.top) -
              delta.Y
          );
        }
        if (selectedDiv.current === "RightTopCornerDiv") {
          delta.X = holdingPosition.x - reliefPosition.x;
          delta.Y = (holdingPosition.x - reliefPosition.x)*scale;
          checkConstraintsAndUpdate(
            (image.connected ? ImgData[0][PDFData[5] - 1].left : image.left) -
              delta.X,
            image.connected ? ImgData[0][PDFData[5] - 1].top : image.top
          );
        }
        if (selectedDiv.current === "LeftTopCornerDiv") {
          delta.X = reliefPosition.y - holdingPosition.y;
          delta.Y = (reliefPosition.y - holdingPosition.y)*scale;
        }
        if (selectedDiv.current === "LeftBottomCornerDiv") {
          delta.X = reliefPosition.x - holdingPosition.x;
          delta.Y = (reliefPosition.x - holdingPosition.x)*scale;
          checkConstraintsAndUpdate(
            image.connected ? ImgData[0][PDFData[5] - 1].left : image.left,
            (image.connected ? ImgData[0][PDFData[5] - 1].top : image.top) -
              delta.Y
          );
        }
      }
      if (
        (image.rotation <= -210 && image.rotation > -250) ||
        (image.rotation <= 150 && image.rotation > 110)
      ) {
        if (selectedDiv.current === "RightBottomCornerDiv") {
          delta.X = holdingPosition.x - reliefPosition.x;
          delta.Y = (holdingPosition.x - reliefPosition.x)*scale;
          checkConstraintsAndUpdate(
            (image.connected ? ImgData[0][PDFData[5] - 1].left : image.left) -
              delta.X,
            (image.connected ? ImgData[0][PDFData[5] - 1].top : image.top) -
              delta.Y
          );
        }
        if (selectedDiv.current === "RightTopCornerDiv") {
          delta.X = reliefPosition.y - holdingPosition.y;
          delta.Y = (reliefPosition.y - holdingPosition.y)*scale;
          checkConstraintsAndUpdate(
            (image.connected ? ImgData[0][PDFData[5] - 1].left : image.left) -
              delta.X,
            image.connected ? ImgData[0][PDFData[5] - 1].top : image.top
          );
        }
        if (selectedDiv.current === "LeftTopCornerDiv") {
          delta.X = reliefPosition.x - holdingPosition.x;
          delta.Y = (reliefPosition.x - holdingPosition.x)*scale;
        }
        if (selectedDiv.current === "LeftBottomCornerDiv") {
          delta.X = holdingPosition.y - reliefPosition.y;
          delta.Y = (holdingPosition.y - reliefPosition.y)*scale;
          checkConstraintsAndUpdate(
            image.connected ? ImgData[0][PDFData[5] - 1].left : image.left,
            (image.connected ? ImgData[0][PDFData[5] - 1].top : image.top) -
              delta.Y
          );
        }
      }
      if (
        (image.rotation <= -250 && image.rotation > -300) ||
        (image.rotation <= 110 && image.rotation > 60)
      ) {
        if (selectedDiv.current === "RightBottomCornerDiv") {
          delta.X = holdingPosition.x - reliefPosition.x;
          delta.Y = (holdingPosition.x - reliefPosition.x)*scale;
          checkConstraintsAndUpdate(
            (image.connected ? ImgData[0][PDFData[5] - 1].left : image.left) -
              delta.X,
            image.connected ? ImgData[0][PDFData[5] - 1].top : image.top
          );
        }
        if (selectedDiv.current === "RightTopCornerDiv") {
          delta.X = reliefPosition.y - holdingPosition.y;
          delta.Y = (reliefPosition.y - holdingPosition.y)*scale;
        }
        if (selectedDiv.current === "LeftTopCornerDiv") {
          delta.X = reliefPosition.x - holdingPosition.x;
          delta.Y = (reliefPosition.x - holdingPosition.x)*scale;
          checkConstraintsAndUpdate(
            image.connected ? ImgData[0][PDFData[5] - 1].left : image.left,
            (image.connected ? ImgData[0][PDFData[5] - 1].top : image.top) -
              delta.Y
          );
        }
        if (selectedDiv.current === "LeftBottomCornerDiv") {
          delta.X = holdingPosition.y - reliefPosition.y;
          delta.Y = (holdingPosition.y - reliefPosition.y)*scale;
          checkConstraintsAndUpdate(
            (image.connected ? ImgData[0][PDFData[5] - 1].left : image.left) -
              delta.X,
            (image.connected ? ImgData[0][PDFData[5] - 1].top : image.top) -
              delta.Y
          );
        }
      }
      if (
        (image.rotation <= -300 && image.rotation > -340) ||
        (image.rotation <= 60 && image.rotation > 20)
      ) {
        if (selectedDiv.current === "RightBottomCornerDiv") {
          delta.X = reliefPosition.y - holdingPosition.y;
          delta.Y = (reliefPosition.y - holdingPosition.y)*scale;
          checkConstraintsAndUpdate(
            (image.connected ? ImgData[0][PDFData[5] - 1].left : image.left) -
              delta.X,
            image.connected ? ImgData[0][PDFData[5] - 1].top : image.top
          );
        }
        if (selectedDiv.current === "RightTopCornerDiv") {
          delta.X = reliefPosition.x - holdingPosition.x;
          delta.Y = (reliefPosition.x - holdingPosition.x)*scale;
        }
        if (selectedDiv.current === "LeftTopCornerDiv") {
          delta.X = holdingPosition.y - reliefPosition.y;
          delta.Y = (holdingPosition.y - reliefPosition.y)*scale;
          checkConstraintsAndUpdate(
            image.connected ? ImgData[0][PDFData[5] - 1].left : image.left,
            (image.connected ? ImgData[0][PDFData[5] - 1].top : image.top) -
              delta.Y
          );
        }
        if (selectedDiv.current === "LeftBottomCornerDiv") {
          delta.X = holdingPosition.x - reliefPosition.x;
          delta.Y = (holdingPosition.x - reliefPosition.x)*scale;
          checkConstraintsAndUpdate(
            (image.connected ? ImgData[0][PDFData[5] - 1].left : image.left) -
              delta.X,
            (image.connected ? ImgData[0][PDFData[5] - 1].top : image.top) -
              delta.Y
          );
        }
      }
      if (
        (image.rotation <= -340 && image.rotation > -360) ||
        (image.rotation <= 20 && image.rotation > 0)
      ) {
        if (selectedDiv.current === "RightBottomCornerDiv") {
          delta.X = reliefPosition.y - holdingPosition.y;
          delta.Y = (reliefPosition.y - holdingPosition.y)*scale;
        }
        if (selectedDiv.current === "RightTopCornerDiv") {
          delta.X = reliefPosition.x - holdingPosition.x;
          delta.Y = (reliefPosition.x - holdingPosition.x)*scale;
          checkConstraintsAndUpdate(
            image.connected ? ImgData[0][PDFData[5] - 1].left : image.left,
            (image.connected ? ImgData[0][PDFData[5] - 1].top : image.top) -
              delta.Y
          );
        }
        if (selectedDiv.current === "LeftTopCornerDiv") {
          delta.X = holdingPosition.y - reliefPosition.y;
          delta.Y = (holdingPosition.y - reliefPosition.y)*scale;
          checkConstraintsAndUpdate(
            (image.connected ? ImgData[0][PDFData[5] - 1].left : image.left) -
              delta.X,
            (image.connected ? ImgData[0][PDFData[5] - 1].top : image.top) -
              delta.Y
          );
        }
        if (selectedDiv.current === "LeftBottomCornerDiv") {
          delta.X = holdingPosition.x - reliefPosition.x;
          delta.Y = (holdingPosition.x - reliefPosition.x)*scale;
          checkConstraintsAndUpdate(
            (image.connected ? ImgData[0][PDFData[5] - 1].left : image.left) -
              delta.X,
            image.connected ? ImgData[0][PDFData[5] - 1].top : image.top
          );
        }
      }
      setHoldingPosition(reliefPosition);
      const updatedDim = {
        height:
          (image.connected ? ImgData[0][PDFData[5] - 1].height : image.height) +
          delta.Y,
        width:
          (image.connected ? ImgData[0][PDFData[5] - 1].width : image.width) +
          delta.X,
      };
      if(updatedDim.height>50 && updatedDim.width>50){
        const visiblePageRect = visiblePageRef.current.getBoundingClientRect();
        const UpdatedWidth = Math.max(
          50,
          Math.min(
            visiblePageRect.width -
              (image.connected ? ImgData[0][PDFData[5] - 1].left : image.left),
            updatedDim.width
          )
        );
        const UpdatedHeight = Math.max(
          50,
          Math.min(
            visiblePageRect.height -
              (image.connected ? ImgData[0][PDFData[5] - 1].top : image.top),
            updatedDim.height
          )
        );
        if (image.connected) {
          dispatch(
            updateDimensions({
              page: 1,
              position: PDFData[5],
              value: { height: UpdatedHeight, width: UpdatedWidth },
            })
          );
        } else {
          dispatch(
            updateDimensions({
              page: PDFData[1],
              position: PDFData[5],
              value: { height: UpdatedHeight, width: UpdatedWidth },
            })
          );
        }
      }
    }
  };
  const handleMouseUp = () => {
    setDragging(false);
  };
  useEffect(() => {
    const visiblePage = visiblePageRef.current;
    if (visiblePage){
      visiblePage.addEventListener("mousemove", handleMouseMove);
      visiblePage.addEventListener("mouseup", handleMouseUp);
      visiblePage.addEventListener("mouseleave", handleMouseUp);
      return () => {
        visiblePage.removeEventListener("mousemove", handleMouseMove);
        visiblePage.removeEventListener("mouseup", handleMouseUp);
        visiblePage.removeEventListener("mouseleave", handleMouseUp);
      };
    }
  }, [dragging, selectedDiv.current]);
  const [PointerOne, setPointerOne] = useState("se-resize");
  const [PointerTwo, setPointerTwo] = useState("ne-resize");

  useEffect(() => {
    if (
      (image.rotation <= 0 && image.rotation > -30) ||
      (image.rotation <= 360 && image.rotation > 330)
    ) {
      setPointerTwo("ne-resize");
      setPointerOne("se-resize");
    }
    if (
      (image.rotation <= -30 && image.rotation > -80) ||
      (image.rotation <= 330 && image.rotation > 280)
    ) {
      setPointerTwo("n-resize");
      setPointerOne("e-resize");
    }
    if (
      (image.rotation <= -80 && image.rotation > -120) ||
      (image.rotation <= 280 && image.rotation > 240)
    ) {
      setPointerTwo("nw-resize");
      setPointerOne("ne-resize");
    }
    if (
      (image.rotation <= -120 && image.rotation > -160) ||
      (image.rotation <= 240 && image.rotation > 200)
    ) {
      setPointerTwo("ew-resize");
      setPointerOne("ns-resize");
    }
    if (
      (image.rotation <= -160 && image.rotation > -210) ||
      (image.rotation <= 200 && image.rotation > 150)
    ) {
      setPointerTwo("ne-resize");
      setPointerOne("se-resize");
    }
    if (
      (image.rotation <= -210 && image.rotation > -250) ||
      (image.rotation <= 150 && image.rotation > 110)
    ) {
      setPointerTwo("ns-resize");
      setPointerOne("ew-resize");
    }
    if (
      (image.rotation <= -250 && image.rotation > -300) ||
      (image.rotation <= 110 && image.rotation > 60)
    ) {
      setPointerTwo("se-resize");
      setPointerOne("sw-resize");
    }
    if (
      (image.rotation <= -300 && image.rotation > -340) ||
      (image.rotation <= 60 && image.rotation > 20)
    ) {
      setPointerTwo("ew-resize");
      setPointerOne("ns-resize");
    }
    if (
      (image.rotation <= -340 && image.rotation > -360) ||
      (image.rotation <= 20 && image.rotation > 0)
    ) {
      setPointerTwo("ne-resize");
      setPointerOne("se-resize");
    }
  }, [image.rotation]);

  return { handleMouseDown, PointerOne, PointerTwo };
};
export default ResizeHook;
