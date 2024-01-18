import React from "react";
import { useState, useEffect } from "react";
import "./Style/ToolbarEditor.css";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import { useDispatch } from "react-redux";
import { addImage } from "../../../Store/Slices/ImageSlice";
import { updatePDFPosition } from "../../../Store/Slices/PDFSlice";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ToolbarEditor = () => {
  const dispatch = useDispatch();

  let PDFWidth = useSelector((state) => {
    return state.users;
  });
  let ImgData = useSelector((state) => {
    return state.usersImages;
  });

  const [isHovered, setHovered] = useState(false);

  const sendImgData = (image) => {
    const imageFile = image.currentTarget.files[0];
    if (imageFile.type != "image/jpeg" && imageFile.type != "image/png") {
      return Swal.fire({
        icon: "error",
        title: "Invalid Format",
        text: "Only image files are allowed",
      });
    }
    const img = new Image();
    img.src = URL.createObjectURL(imageFile);
    img.onload = () => {
      let scale = 0;
      let originalWidth = img.width;
      while (img.width > PDFWidth[11] * 0.25) {
        img.width = img.width - 1;
      }
      scale = img.width / originalWidth;
      img.height = scale * img.height;

      const ImageArrayObject = {
        url: URL.createObjectURL(imageFile),
        top: 0,
        left: 0,
        width: Math.max(50, img.width),
        height: Math.max(50, img.height),
        zindex: 1,
        scale: 1,
        rotation: 0,
        opacity: 100,
        section: PDFWidth[8],
        connected: true,
        visibility: false,
        falseConnected: false,
        falseOnClickValue: false,
      };
      dispatch(
        updatePDFPosition({
          position: 7,
          value: true,
        })
      );
      dispatch(addImage({ len: PDFWidth[2], object: ImageArrayObject }));
      dispatch(
        updatePDFPosition({
          position: 8,
          value: PDFWidth[8] + 1,
        })
      );
      dispatch(
        updatePDFPosition({
          position: 5,
          value: ImgData.length === 0 ? 1 : ImgData[0].length + 1,
        })
      );

      toast.success(`${PDFWidth[2]} pages stamped in 1 second`, {
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          backgroundColor: "black",
          width: "100%",
          borderRadius: "12px",
        },
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    };
  };

  const setToolbarZoomIn = () => {
    if (PDFWidth[3] < 3) {
      const total = PDFWidth[3] + 0.2;
      dispatch(updatePDFPosition({ position: 3, value: total }));
    }
  };

  const setToolbarZoomOut = () => {
    if (PDFWidth[3] > 0.6) {
      const total = PDFWidth[3] - 0.2;
      dispatch(updatePDFPosition({ position: 3, value: total }));
    }
  };

  return (
    <div className="Main-ToolbarEditor">
      <div className="ToolbarEditor-Tags">
        <div className="ToolbarEditor-Input">
          <input
            title=""
            type="file"
            accept="image/png, image/jpeg"
            id="ImgInput"
            name="ImgInput"
            className="Img-Input"
            onChange={(image) => {
              sendImgData(image);
            }}
            onClick={(event) => {
              event.target.value = null;
            }}
          />
          <PhotoSizeSelectActualIcon id="ToolbarAddImage" /> {" | "}
        </div>
        <div className="ToolbarEditor-Zoom">
          <span className="Toolbar-Editor-Icon" onClick={setToolbarZoomIn}>
            <ZoomInIcon id="ToolbarEditorZoom" />
          </span>

          {" | "}
          <span className="Toolbar-Editor-Icon" onClick={setToolbarZoomOut}>
            <ZoomOutIcon id="ToolbarEditorZoom" />
          </span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ToolbarEditor;
