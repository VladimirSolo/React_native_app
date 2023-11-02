import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDetails = createAsyncThunk(
  "details/fetchDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );

      if (!response) {
        throw new Error();
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue("Error");
    }
  }
);

const detailsSlice = createSlice({
  name: "details",
  initialState: { data: {}, status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchDetails.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default detailsSlice;
