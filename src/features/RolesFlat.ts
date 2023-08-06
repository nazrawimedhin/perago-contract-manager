import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  rolesFlat: [],
  error: "",
};

export const fetchRolesFlat = createAsyncThunk("fetchRolesFlat", async () => {
  const response = await axios.get("http://localhost:3000/roles?flat=true");
  return response.data;
});

export const rolesFlatSlice = createSlice({
  name: "rolesFlat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRolesFlat.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRolesFlat.fulfilled, (state, action) => {
        state.loading = false;
        state.rolesFlat = action.payload;
      })
      .addCase(fetchRolesFlat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default rolesFlatSlice.reducer;
