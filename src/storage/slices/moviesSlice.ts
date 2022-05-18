import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import APIMovies from '../../utils/APIMovies';

import IMovie from '../../interfaces/IMovie';

export interface MovieState {
 // value: number;
  status: 'idle' | 'loading' | 'failed';
  movies: IMovie[]
  moviesLiked: IMovie[]
  moviesDisliked: IMovie[]
}

const initialState: MovieState = {
//  value: 0,
  status: 'idle',
  movies: [],
  moviesLiked: [],
  moviesDisliked: []
};

export const readMovies = createAsyncThunk(
  'movie/read',
  async () => {
    const response:any = await APIMovies();
     // console.log(response);
    return response;
  }
);

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    deleteMovie: (state, action: PayloadAction<string>) => {
      state.movies = state.movies.filter(m => m.id !== action.payload);
    },
    switchLike: (state, action: PayloadAction<IMovie>) => {
      let exist = state.moviesLiked.some( m => m.id === action.payload.id);
      if (exist) {
        state.moviesLiked = state.moviesLiked.filter(m => m.id !== action.payload.id);
      }else{
        state.moviesLiked.push(action.payload);
      }
    },
    switchDislike: (state, action: PayloadAction<IMovie>) => {
      let exist = state.moviesDisliked.some( m => m.id === action.payload.id);
      if (exist) {
        state.moviesDisliked = state.moviesDisliked.filter(m => m.id !== action.payload.id);
      }else{
        state.moviesDisliked.push(action.payload);
      }
    },
    
  },

    /*
    increment: (state) => {
      state.value += 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  */

  extraReducers: (builder) => {
    builder
      .addCase(readMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(readMovies.fulfilled, (state, action) => {
        state.status = 'idle';
        state.movies = action.payload;
      })
      .addCase(readMovies.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { deleteMovie, switchLike, switchDislike } = moviesSlice.actions;


export const selectMovies = (state: RootState) => state.movies.movies;
export const selectStatus = (state: RootState) => state.movies.status;
export const selectMoviesLiked = (state: RootState) => state.movies.moviesLiked;
export const selectMoviesDisliked = (state: RootState) => state.movies.moviesDisliked;


/*
export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch:any, getState:any) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };
  */

export default moviesSlice.reducer;
