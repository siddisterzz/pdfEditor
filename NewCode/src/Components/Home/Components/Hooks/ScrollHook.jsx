import { useDispatch } from "react-redux";
import { updatePDFPosition } from "../../../../Store/Slices/PDFSlice";
import { useEffect } from "react";
const ScrollHook = (pdfViewerRef) => {
  const dispatch = useDispatch();

  const handleScroll = () => {
    const pdfViewerRect = pdfViewerRef.current.getBoundingClientRect();
    const pageElements = document.querySelectorAll(".Pdf-Page");
    let maxVisibleHeight = 0;
    let maxPageNumber = null;
    pageElements.forEach((pageElement, index) => {
      const visiblePageRect = pageElement.getBoundingClientRect();
      const visibleHeight =
        Math.min(visiblePageRect.bottom, pdfViewerRect.bottom) -
        Math.max(visiblePageRect.top, pdfViewerRect.top);

      if (visibleHeight > maxVisibleHeight) {
        maxVisibleHeight = visibleHeight;
        maxPageNumber = index + 1;
      }
    });
    if (maxPageNumber !== null) {
      dispatch(
        updatePDFPosition({ position: 1, value: parseInt(maxPageNumber) })
      );
    }
  };
  useEffect(() => {
    const pdfViewerContainer = pdfViewerRef.current;
    pdfViewerContainer.addEventListener("scroll", handleScroll);
    return () => {
      pdfViewerContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return true;
};
export default ScrollHook;
