import { configureStore } from "@reduxjs/toolkit";
import PDFSlice from "./Slices/PDFSlice";
import ImageSlice from "./Slices/ImageSlice";

const Store = configureStore({
    reducer: {
        users: PDFSlice,
        usersImages: ImageSlice,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

})

export default Store;