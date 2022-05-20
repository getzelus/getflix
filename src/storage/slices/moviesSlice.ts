import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState /*, AppThunk*/ } from '../store';
import APIMovies from '../../utils/APIMovies';
import IMovie from '../../interfaces/IMovie';

export interface MovieState {
  status: 'idle' | 'loading' | 'failed';
  movies: IMovie[]
  moviesLiked: IMovie[]
  moviesDisliked: IMovie[]
}

const initialState: MovieState = {
  status: 'idle',
  movies: [],
  moviesLiked: [],
  moviesDisliked: []
};

export const readMovies = createAsyncThunk(
  'movie/read', async () => {
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
      state.moviesLiked = state.moviesLiked.filter(m => m.id !== action.payload);
      state.moviesDisliked = state.moviesDisliked.filter(m => m.id !== action.payload);
    },
    updateMovie: (state, action: PayloadAction<IMovie>) => {
      state.movies = state.movies.map(m => m.id === action.payload.id ? action.payload : m);
    },
    switchLike: (state, action: PayloadAction<IMovie>) => {
      let some = state.moviesLiked.some(m => m.id === action.payload.id );
      let index = state.movies.findIndex( m => m.id === action.payload.id);
      if (some) {
        state.moviesLiked = state.moviesLiked.filter(m => m.id !== action.payload.id);
        state.movies[index].likes--;
      }else{
        state.moviesLiked.push(action.payload);
        state.movies[index].likes++;

        let other = state.moviesDisliked.some(m => m.id === action.payload.id );
        if (other) {
          state.moviesDisliked = state.moviesDisliked.filter(m => m.id !== action.payload.id);
          state.movies[index].dislikes--;
        }
      }
    },
    switchDislike: (state, action: PayloadAction<IMovie>) => {
      let some = state.moviesDisliked.some(m => m.id === action.payload.id );
      let index = state.movies.findIndex( m => m.id === action.payload.id);
      if (some) {
        state.moviesDisliked = state.moviesDisliked.filter(m => m.id !== action.payload.id);
        state.movies[index].dislikes--;
      }else{
        state.moviesDisliked.push(action.payload);
        state.movies[index].dislikes++;

        let other = state.moviesLiked.some(m => m.id === action.payload.id );
        if (other) {
          state.moviesLiked = state.moviesLiked.filter(m => m.id !== action.payload.id);
          state.movies[index].likes--;
         }
      }
  },

},

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
export const incrementIfOdd =  (amount: number): AppThunk =>
  (dispatch:any, getState:any) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };
  */

export default moviesSlice.reducer;
