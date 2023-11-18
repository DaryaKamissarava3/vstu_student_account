import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWeekName = createAsyncThunk(
  'weekData/fetchWeekName',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get('https://student.vstu.by/timetable/content/nameOfWeek');

      if (response.status !== 200) {
        throw new Error('Server error!');
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchWeekNumber = createAsyncThunk(
  'weekData/fetchWeekNumber',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get('https://student.vstu.by/timetable/content/numberOfWeek');

      if (response.status !== 200) {
        throw new Error('Server error!');
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

const initialState = {
  weekDay: null,
  weekNumber: null,
  weekName: null,
  status: null,
  error: null,
};

const weekDataSlice = createSlice({
  name: 'weekData',
  initialState,
  reducers: {
    getWeekDay(state,action){
      state.weekDay=action.payload;
    },
    getWeekName(state, action) {
      state.weekName = action.payload;
    },
    getWeekNumber(state, action) {
      state.weekNumber = action.payload;
    },
    setWeekDay(state, action) {
      state.weekDay = action.payload;
    },
    setWeekNumber(state, action) {
      state.weekNumber = action.payload;
    },
    setWeekName(state, action) {
      state.weekName = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeekName.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWeekName.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.weekName = action.payload;
      })
      .addCase(fetchWeekName.rejected, (state) => {
        state.status = 'rejected';
      })
      .addCase(fetchWeekNumber.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWeekNumber.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.weekNumber = action.payload;
      })
      .addCase(fetchWeekNumber.rejected, (state) => {
        state.status = 'rejected';
      });
  }
});

export const {
  getWeekDay,
  getWeekName,
  getWeekNumber,
  setWeekDay,
  setWeekNumber,
  setWeekName,
} = weekDataSlice.actions;

export const weekDataReducer = weekDataSlice.reducer;
