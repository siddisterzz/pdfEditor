import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const PDFSlice = createSlice({
  name: "PDF",
  initialState: [],
  reducers: {
    setPDF(state, action) {
      state.push(action.payload);
    },
    updatePDFPosition(state, action) {
      const { position, value } = action.payload;
      state[position] = value;
    },
  },
});

export default PDFSlice.reducer;
export const { setPDF, updatePDFPosition } = PDFSlice.actions;
