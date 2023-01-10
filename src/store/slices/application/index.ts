import { createSlice } from "@reduxjs/toolkit";
import { IApplication } from "src/types";

const initialState: IApplication = {
  user: {
    id: 0,
    fullName: "",
    phoneNumber: "",
    pinfl: "",
    gender: "",
    serialNumber: "",
    eduName: "",
    region: null,
    eduAddress: "",
    permanentAddress: "",
    photo: "",
    direction: "",
  },
  subjects: [],
};

export const orderSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSubjects: (state, action) => {
      state.subjects = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setSubjects } = orderSlice.actions;

export default orderSlice.reducer;
