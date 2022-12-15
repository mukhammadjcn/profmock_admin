import { createSlice } from "@reduxjs/toolkit";

export interface ICollegeState {
  college: any;
}

const initialState: ICollegeState = {
  college: {},
};

export const collegeSlice = createSlice({
  name: "college",
  initialState,
  reducers: {
    setCollege: (state, action) => {
      state.college = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCollege } = collegeSlice.actions;

export default collegeSlice.reducer;
