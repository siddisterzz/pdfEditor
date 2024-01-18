import React from "react";
import { useState, useEffect, useRef } from "react";
import "./Style/ImageToolBar.css";
import { useDispatch } from "react-redux";
import { addImage } from "../../../Store/Slices/ImageSlice";
import { updatePDFPosition } from "../../../Store/Slices/PDFSlice";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import opacity from "./Images/opacity.png";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  updateRotation,
  updateOpacity,
  removeImage,
} from "../../../Store/Slices/ImageSlice";
const ImageToolBar = ({MyRef}) => {
  const dispatch = useDispatch();
  const [iActive, setActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState(""); 
  const ToolBar = useRef();

  const PDFData = useSelector((state) => {
    return state.users;
  });
  const ImgData = useSelector((state) => {
    return state.usersImages;
  });

  useEffect(() => {
    if (PDFData[7]) {
      setSelectedOption(ImgData[PDFData[1] - 1][PDFData[5] - 1]["opacity"])
      setActive(true);
    } else {
      setActive(false);
    }
  }, [PDFData[7]]);

  const Visible = () => {
    dispatch(updatePDFPosition({ position: 7, value: true }));
  };

  const NotVisible = (event) => {
    if (ToolBar.current && !ToolBar.current.contains(event.target)) {
      dispatch(updatePDFPosition({ position: 7, value: false }));
    }
  };

  useEffect(() => {
    MyRef.addEventListener("mousedown", NotVisible);
    return () => {
      MyRef.removeEventListener("mousedown", NotVisible);
    };
  }, []);

  const UpdateOpacity = (event) => {
    setSelectedOption(event.target.value);
    if (ImgData[PDFData[1] - 1][PDFData[5] - 1].connected) {
      dispatch(
        updateOpacity({
          page: 1,
          position: PDFData[5],
          value: event.target.value,
        })
      );
    } else {
      dispatch(
        updateOpacity({
          page: PDFData[1],
          position: PDFData[5],
          value: event.target.value,
        })
      );
    }
  };

  const RotateLeft = () => {
    if (ImgData[PDFData[1] - 1][PDFData[5] - 1].connected) {
      if (ImgData[PDFData[1] - 1][PDFData[5] - 1].rotation == 350) {
        dispatch(updateRotation({ page: 1, position: PDFData[5], value: 0 }));
      } else {
        dispatch(
          updateRotation({
            page: 1,
            position: PDFData[5],
            value: ImgData[0][PDFData[5] - 1].rotation - 10,
          })
        );
      }
    } else {
      if (ImgData[PDFData[1] - 1][PDFData[5] - 1].rotation == 350) {
        dispatch(
          updateRotation({ page: PDFData[1], position: PDFData[5], value: 0 })
        );
      } else {
        dispatch(
          updateRotation({
            page: PDFData[1],
            position: PDFData[5],
            value: ImgData[PDFData[1] - 1][PDFData[5] - 1].rotation - 10,
          })
        );
      }
    }
  };

  const RotateRight = () => {
    if (ImgData[PDFData[1] - 1][PDFData[5] - 1].connected) {
      if (ImgData[PDFData[1] - 1][PDFData[5] - 1].rotation == 350) {
        dispatch(updateRotation({ page: 1, position: PDFData[5], value: 0 }));
      } else {
        dispatch(
          updateRotation({
            page: 1,
            position: PDFData[5],
            value: ImgData[0][PDFData[5] - 1].rotation + 10,
          })
        );
      }
    } else {
      if (ImgData[PDFData[1] - 1][PDFData[5] - 1].rotation == 350) {
        dispatch(
          updateRotation({ page: PDFData[1], position: PDFData[5], value: 0 })
        );
      } else {
        dispatch(
          updateRotation({
            page: PDFData[1],
            position: PDFData[5],
            value: ImgData[PDFData[1] - 1][PDFData[5] - 1].rotation + 10,
          })
        );
      }
    }
  };

  const DeleteImage = () => {
    if (ImgData[PDFData[1] - 1][PDFData[5] - 1].connected) {
      dispatch(removeImage({ page: 1, position: PDFData[5] }));
    } else {
      dispatch(removeImage({ page: PDFData[1], position: PDFData[5] }));
    }
    dispatch(updatePDFPosition({ position: 7, value: false }));
    setActive(false);
  };

  return (
    <div
      ref={ToolBar}
      onClick={Visible}
      className={
        iActive
          ? "ImageToolBar-Main-ToolbarEditor"
          : "None-ImageToolBar-Main-ToolbarEditor"
      }
    >
      <div className="ImageToolBar-ToolbarEditor-Tags">
        <div className="ImageToolBar-ToolbarEditor-Input">
          <img src={opacity} className="ImageToolBar-ToolbarAddImage" />
          <select
            className="ImageToolBar-Img-Input"
            id="opacitySelect"
            onChange={UpdateOpacity}
            value={selectedOption}
          >
            <option value="100">100%</option>
            <option value="75">75%</option>
            <option value="50">50%</option>
            <option value="25">25%</option>
          </select>
        </div>
        {" | "}
        <div className="ImageToolBar-ToolbarEditor-Zoom">
          <span className="ImageToolBar-Toolbar-Editor-Icon">
            <RotateLeftIcon
              id="ImageToolBar-ToolbarEditorZoom"
              onClick={RotateLeft}
            />
          </span>

          <span className="ImageToolBar-Toolbar-Editor-Icon">
            <RotateRightIcon
              id="ImageToolBar-ToolbarEditorZoom"
              onClick={RotateRight}
            />
          </span>
        </div>
        {" | "}
        <div className="ImageToolBar-ToolbarEditor-Zoom">
          <span className="ImageToolBar-Toolbar-Editor-Icon">
            <DeleteIcon
              id="ImageToolBar-ToolbarEditorZoom"
              onClick={DeleteImage}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImageToolBar;
