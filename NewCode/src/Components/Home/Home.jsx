import React from "react";
import { useRef } from "react";
import { useState, useEffect } from "react";
import LeftNav from "./Components/LeftNav";
import WorkSpace from "./Components/Workspace";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ToolbarEditor from "./Components/ToolbarEditor";
import ImageToolBar from "./Components/ImageToolBar";
import "./Style/Home.css";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import {
  removeAllImage,
  updateConnected,
  updateFalseConnected,
  updateAllFalseConnected,
  updateConnectedAndFalseConnected,
  setFalseConnectedValue,
} from "../../Store/Slices/ImageSlice";
import { updatePDFPosition } from "../../Store/Slices/PDFSlice";
import Swal from "sweetalert2";
import { removeImage } from "../../Store/Slices/ImageSlice";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Checkbox from "@mui/material/Checkbox";
const Home = () => {
  const dispatch = useDispatch();
  const PDFData = useSelector((state) => {
    return state.users;
  });
  const ImgData = useSelector((state) => {
    return state.usersImages;
  });

  const [pdf, setPdf] = useState(null);
  const [isActive, setActive] = useState(true);
  const [isActiveDelete, setActiveDelete] = useState(false);
  const [isActiveDeleteItem, setActiveDeleteItem] = useState(false);
  const [navStatus, setNavStatus] = useState(true);
  const [pageNumberArray, setPageNumberArray] = useState([]);
  const RightNav = useRef();
  const MainRightNav = useRef();
  const CenterRef = useRef();

  useEffect(() => {
    setPdf(PDFData[0]);
  }, [PDFData]);

  useEffect(() => {
    const array = Array.from({ length: PDFData[2] }, (_, index) => index + 1);
    setPageNumberArray(array);
  }, [PDFData[2]]);

  useEffect(() => {
    if (RightNav.current) {
      const number = PDFData[1];
      MainRightNav.current.scrollTop = 0;
      MainRightNav.current.scrollTop =
        RightNav.current.clientHeight * (number - 1) - 50;
      if (
        ImgData.length > 0 &&
        ImgData[PDFData[9] - 1][PDFData[5] - 1] &&
        ImgData[PDFData[9] - 1][PDFData[5] - 1].connected == false
      ) {
        dispatch(
          setFalseConnectedValue({
            data: ImgData[PDFData[9] - 1][PDFData[5] - 1],
            position: PDFData[5],
          })
        );
      }
      dispatch(updatePDFPosition({ position: 9, value: PDFData[1] }));
      dispatch(updateConnectedAndFalseConnected());
    }
  }, [PDFData[1]]);

  useEffect(() => {
    if (PDFData[7]) {
      setActiveDelete(true);
      if (
        ImgData.length > 0 &&
        ImgData[PDFData[1] - 1][PDFData[5] - 1] &&
        ImgData[PDFData[1] - 1][PDFData[5] - 1].connected == false
      ) {
        dispatch(
          updateFalseConnected({
            page: PDFData[1],
            position: PDFData[5],
            falseConnected: true,
          })
        );
      }
    } else {
      setActiveDelete(false);
      if (
        ImgData.length > 0 &&
        ImgData[PDFData[1] - 1][PDFData[5] - 1] &&
        ImgData[PDFData[1] - 1][PDFData[5] - 1].connected == false
      ) {
        dispatch(
          updateFalseConnected({
            page: PDFData[1],
            position: PDFData[5],
            falseConnected: false,
          })
        );
      }
    }
  }, [PDFData[7]]);

  useEffect(() => {
    let Sum = 0;
    ImgData.map((element) => {
      if (element.length > 0) {
        Sum = Sum + 1;
      }
    });
    if (Sum > 0) {
      setActiveDeleteItem(true);
    } else {
      dispatch(updatePDFPosition({ position: 8, value: 1 }));
      setActiveDeleteItem(false);
      setActiveDelete(false);
    }
  }, [ImgData]);

  const handleCheckBox = (ImageIndex, PageIndex) => {
    if (
      ImgData.length > 0 &&
      ImgData[PageIndex - 1][ImageIndex] &&
      ImgData[PageIndex - 1][ImageIndex].connected == false &&
      ImgData[PageIndex - 1][ImageIndex].falseConnected == false
    ) {
      if (ImgData[PageIndex - 1][ImageIndex].falseOnClickValue == false) {
        dispatch(
          updateAllFalseConnected({
            page: PageIndex,
            position: ImageIndex + 1,
            falseOnClickValue: true,
          })
        );
      } else {
        if (
          ImgData.length > 0 &&
          ImgData[PDFData[1] - 1][PDFData[5] - 1] &&
          ImgData[PDFData[1] - 1][PDFData[5] - 1].connected == false
        ) {
          dispatch(
            setFalseConnectedValue({
              data: ImgData[PDFData[1] - 1][PDFData[5] - 1],
              position: PDFData[5],
            })
          );
        }
        dispatch(
          updateAllFalseConnected({
            page: PageIndex,
            position: ImageIndex + 1,
            falseOnClickValue: false,
          })
        );
      }
    }
  };

  const handleSwitchChange = () => {
    if (ImgData[PDFData[1] - 1][PDFData[5] - 1].connected) {
      dispatch(
        updateConnected({
          page: PDFData[1],
          position: PDFData[5],
          top: ImgData[0][PDFData[5] - 1].top,
          left: ImgData[0][PDFData[5] - 1].left,
          width: ImgData[0][PDFData[5] - 1].width,
          height: ImgData[0][PDFData[5] - 1].height,
          zindex: ImgData[0][PDFData[5] - 1].zindex,
          scale: ImgData[0][PDFData[5] - 1].scale,
          rotation: ImgData[0][PDFData[5] - 1].rotation,
          opacity: ImgData[0][PDFData[5] - 1].opacity,
          section: ImgData[0][PDFData[5] - 1].section,
          connected: false,
          falseConnected: false,
        })
      );
    } else {
      dispatch(
        updateConnected({
          page: PDFData[1],
          position: PDFData[5],
          top: ImgData[PDFData[1] - 1][PDFData[5] - 1].top,
          left: ImgData[PDFData[1] - 1][PDFData[5] - 1].left,
          width: ImgData[PDFData[1] - 1][PDFData[5] - 1].width,
          height: ImgData[PDFData[1] - 1][PDFData[5] - 1].height,
          zindex: ImgData[PDFData[1] - 1][PDFData[5] - 1].zindex,
          scale: ImgData[PDFData[1] - 1][PDFData[5] - 1].scale,
          rotation: ImgData[PDFData[1] - 1][PDFData[5] - 1].rotation,
          opacity: ImgData[PDFData[1] - 1][PDFData[5] - 1].opacity,
          section: ImgData[PDFData[1] - 1][PDFData[5] - 1].section,
          connected: true,
          falseConnected: false,
        })
      );
    }
  };

  const SetMyNavborStatus = () => {
    setActive(!isActive);
    setNavStatus(!navStatus);
  };

  const SetActivePageNumber = (number) => {
    dispatch(updatePDFPosition({ position: 1, value: number }));
    dispatch(updatePDFPosition({ position: 4, value: number }));
  };

  const handleRemoveAll = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove All!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updatePDFPosition({ position: 8, value: 1 }));
        dispatch(updatePDFPosition({ position: 7, value: false }));
        dispatch(removeAllImage({ Remove: "Done" }));
        Swal.fire({
          title: "Deleted!",
          text: "All images have been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="Main-App">
      <div className={isActive ? "Left-Navbar" : "None-Left-Navbar"}>
        {pdf ? <LeftNav /> : <></>}
      </div>
      {pdf ? (
        <div onClick={SetMyNavborStatus} className="Left-Navbar-Controll">
          {navStatus ? (
            <ArrowLeftIcon id="Left-Navbar-Icon" />
          ) : (
            <ArrowRightIcon id="Left-Navbar-Icon" />
          )}
        </div>
      ) : (
        <></>
      )}
      <div
        ref={CenterRef}
        className={isActive ? "Work-Space" : "Visible-Work-Space"}
      >
        {pdf ? (
          <div className="Toolbar">
            <div className="Toolbar-Editor">
              <ToolbarEditor />
            </div>
            <div className="ImageToolBar-Editor">
              <ImageToolBar MyRef={CenterRef.current} />
            </div>
          </div>
        ) : (
          <></>
        )}

        <WorkSpace />
      </div>
      <div className="Tool-Tip">
        {pdf ? (
          <>
            <div className="Tool-Tip-Dummy">
              <div className="Tool-Tip-Headinging">TOOL-TIP</div>
              <div className="Tool-Tip-Content">
                If a user adds an image and since our app automatically applies
                image to all pages and then user goes and changes the rotation
                or opacity.
              </div>
            </div>
            <div className="Tool-Tip-Layers">
              <div className="Tool-Tip-Heading">
                <span className="Tool-Tip-Heading-Layers">LAYERS</span>
                {isActiveDelete ? (
                  <span className="Tool-Tip-Heading-Apply">
                    APPLY ALL{" "}
                    <Switch
                      id="Tool-Tip-Heading-Switch"
                      onChange={handleSwitchChange}
                      checked={
                        ImgData[PDFData[1] - 1][PDFData[5] - 1]
                          ? ImgData[PDFData[1] - 1][PDFData[5] - 1].connected
                          : false
                      }
                    />
                  </span>
                ) : (
                  <></>
                )}
              </div>
              <div className="Tool-Tip-Layer-Page">
                <div ref={MainRightNav} className="Tool-Tip-Layer-Section">
                  {pageNumberArray.map((number) => (
                    <div ref={RightNav}>
                      <div
                        onClick={() => SetActivePageNumber(number)}
                        className={
                          PDFData[1] == number
                            ? "Tool-Tip-Layer-Page-Number-Active"
                            : "Tool-Tip-Layer-Page-Number"
                        }
                      >
                        Page {number}
                      </div>
                      {ImgData[number - 1] ? (
                        ImgData[number - 1].map((image, index) => (
                          <div
                            className={
                              image.visibility
                                ? "None-Tool-Tip-Layer-Stamp"
                                : "Tool-Tip-Layer-Stamp"
                            }
                          >
                            <span className="Tool-Tip-Layer-Stamp-Number">
                              <span className="Tool-Tip-Layer-Iconing">
                                <img
                                  className="Tool-Tip-Layer-Image"
                                  src={image.url}
                                />
                              </span>
                              Stamp {image["section"]}
                            </span>
                            {PDFData[5] - 1 == index && isActiveDelete ? (
                              <span className="Tool-Tip-Layer-Delete">
                                <Checkbox
                                  onClick={() => handleCheckBox(index, number)}
                                  id="Tool-Tip-Heading-Switch"
                                  size="small"
                                  checked={
                                    image["connected"] ||
                                    image["falseConnected"] ||
                                    image["falseOnClickValue"]
                                      ? true
                                      : false
                                  }
                                />
                              </span>
                            ) : (
                              <></>
                            )}
                          </div>
                        ))
                      ) : (
                        <></>
                      )}
                    </div>
                  ))}
                </div>
                <div className="Tool-Tip-Layer-Button">
                  {isActiveDeleteItem ? (
                    <Button
                      onClick={handleRemoveAll}
                      variant="outlined"
                      color="error"
                      id="Tool-Tip-Button"
                    >
                      Remove All
                    </Button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Home;
