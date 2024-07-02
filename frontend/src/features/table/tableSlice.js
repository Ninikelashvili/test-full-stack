import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tablesService from "./tableService";

const initialState = {
  tables: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getTables = createAsyncThunk(
  "api/get_tables",
  async (_, thunkAPI) => {
    try {
      return await tablesService.getTables();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue({
        message,
      });
    }
  }
);

export const createTable = createAsyncThunk(
  "api/create_table",
  async (tableData, thunkAPI) => {
    try {
      return await tablesService.createTable(tableData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue({
        message,
      });
    }
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTables.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTables.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tables = action.payload;
      })
      .addCase(getTables.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createTable.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTable.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tables.unshift(action.payload);
      })
      .addCase(createTable.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = tableSlice.actions;
export default tableSlice.reducer;
