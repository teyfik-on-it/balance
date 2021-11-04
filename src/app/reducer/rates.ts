import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import latest from '../api/latest';

type Status = 'idle' | 'pending' | 'success' | 'failure';

interface State {
  data?: Record<string, number>;
  status: Status;
  error?: string;
}

const fetchRates = createAsyncThunk('rates/fetchRates', () => latest());

const initialState: State = {
  status: 'idle',
};

const rates = createSlice({
  name: 'rates',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRates.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchRates.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(fetchRates.rejected, (state, action) => {
        state.status = 'failure';
        state.error = action.error.message;
      });
  },
});

export { fetchRates };
export default rates.reducer;
