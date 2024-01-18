import { createSlice } from "@reduxjs/toolkit";

const ImageSlice = createSlice({
  name: "Image",
  initialState: [],
  reducers: {
    addImage(state, action) {
      if (state.length == 0) {
        const newArray = Array.from(
          { length: action.payload.len },
          (_, index) => [action.payload.object]
        );
        return newArray;
      } else {
        state.forEach((element) => {
          element.push(action.payload.object);
        });
      }
    },
    updateDimensions(state, action) {
      const { page, position, value } = action.payload;
      state[page - 1][position - 1].width = value.width;
      state[page - 1][position - 1].height = value.height;
    },
    updateDropPosition(state, action) {
      const { page, position, value } = action.payload;
      state[page - 1][position - 1].left = value.x;
      state[page - 1][position - 1].top = value.y;
    },
    updateAllDropPosition(state, action) {
      const { currentScale, prevScale } = action.payload;
      state.forEach((element) => {
        element.forEach((object) => {
          object.left = (object.left * currentScale) / prevScale;
          object.top = (object.top * currentScale) / prevScale;
          object.height = (object.height * currentScale) / prevScale;
          object.width = (object.width * currentScale) / prevScale;
        });
      });
    },
    updateRotation(state, action) {
      const { page, position, value } = action.payload;
      state[page - 1][position - 1].rotation = value;
    },
    updateOpacity(state, action) {
      const { page, position, value } = action.payload;
      state[page - 1][position - 1].opacity = value;
    },
    removeImage(state, action) {
      const { page, position } = action.payload;
      if (state[page - 1][position - 1].connected) {
        state.forEach((element) => {
          element.splice(position - 1, 1);
        });
      } else {
        let sum = 0;
        state.forEach((element) => {
          if (element[position - 1].visibility == false) {
            sum = sum + 1;
          }
        });
        if (sum > 1) {
          state[page - 1][position - 1].visibility = true;
        } else {
          state.forEach((element) => {
            element.splice(position - 1, 1);
          });
        }
      }
    },
    removeAllImage(state, action) {
      const { Remove } = action.payload;
      state.forEach((element) => {
        element.splice(0, element.length);
      });
    },
    updateConnected(state, action) {
      const {
        page,
        position,
        top,
        left,
        width,
        height,
        zindex,
        scale,
        rotation,
        opacity,
        section,
        connected,
        falseConnected,
      } = action.payload;
      if (connected) {
        state.forEach((element) => {
          element[position - 1].top = top;
          element[position - 1].left = left;
          element[position - 1].width = width;
          element[position - 1].height = height;
          element[position - 1].zindex = zindex;
          element[position - 1].scale = scale;
          element[position - 1].rotation = rotation;
          element[position - 1].opacity = opacity;
          element[position - 1].section = section;
          element[position - 1].connected = connected;
          element[position - 1].visibility = false;
          element[position - 1].falseConnected = falseConnected;
        });
      } else {
        state.forEach((element) => {
          element[position - 1].top = top;
          element[position - 1].left = left;
          element[position - 1].width = width;
          element[position - 1].height = height;
          element[position - 1].zindex = zindex;
          element[position - 1].scale = scale;
          element[position - 1].rotation = rotation;
          element[position - 1].opacity = opacity;
          element[position - 1].section = section;
          element[position - 1].connected = connected;
          element[position - 1].falseConnected = falseConnected;
        });
      }
    },
    setFalseConnectedValue(state, action) {
      const { data, position } = action.payload;
      state.forEach((element) => {
        if(element[position - 1].falseOnClickValue){
          element[position - 1].top = data.top;
          element[position - 1].left = data.left;
          element[position - 1].width = data.width;
          element[position - 1].height = data.height;
          element[position - 1].zindex = data.zindex;
          element[position - 1].scale = data.scale;
          element[position - 1].rotation = data.rotation;
          element[position - 1].opacity = data.opacity;
          element[position - 1].section = data.section;
        }
        
      });
      
    },
    updateConnectedAndFalseConnected(state, action) {
      state.forEach((element) => {
        element.forEach((object) => {
          object.falseConnected = false;
          object.falseOnClickValue = false;
        });
      });
    },
    updateFalseConnected(state, action) {
      const { page, position, falseConnected } = action.payload;
      state[page - 1][position - 1].falseConnected = falseConnected;
    },
    updateAllFalseConnected(state, action) {
      const { page, position, falseOnClickValue } = action.payload;
      state[page - 1][position - 1].falseOnClickValue = falseOnClickValue;
    },
  },
});

export default ImageSlice.reducer;
export const {
  addImage,
  initializeState,
  updateDimensions,
  updateDropPosition,
  updateAllDropPosition,
  updateRotation,
  updateOpacity,
  removeImage,
  removeAllImage,
  updateConnected,
  setFalseConnectedValue,
  updateConnectedAndFalseConnected,
  updateFalseConnected,
  updateAllFalseConnected,
} = ImageSlice.actions;
