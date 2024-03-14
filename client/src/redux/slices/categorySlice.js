import { createSlice } from "@reduxjs/toolkit";
let counter = 0;

const categorySlice = createSlice({
  name: "category",
  initialState: [],
  reducers: {
    add(state, action) {
      state.push({ id: counter, subItems: [], name: "" });
      counter = counter + 1;
    },
    remove(state, action) {
      // console.log(action);
      return state.filter((item) => item.id !== action.payload);
    },
    save(state, action) {
      // const subCategory = state.find((item) => item.id == action.payload.id);
      // console.log(action.payload.items);
      const saveSubCategory = state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            subItems: action.payload.items,
            name: action.payload.name,
          };
        }
        return item;
      });
      // console.log(saveSubCategory);
      return saveSubCategory;
    },
    update(state, action) {
      // console.log(action.payload);
      return [...action.payload];
    },
  },
});

export const { add, remove, save, update } = categorySlice.actions;

export default categorySlice.reducer;
