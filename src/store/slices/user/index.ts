import { createSlice } from "@reduxjs/toolkit";

export interface ICollegeState {
  college: any;
  user: any;
}

const initialState: ICollegeState = {
  college: {},
  user: {},
};

export const collegeSlice = createSlice({
  name: "college",
  initialState,
  reducers: {
    setCollege: (state, action) => {
      state.college = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCollege, setUser } = collegeSlice.actions;

export default collegeSlice.reducer;
