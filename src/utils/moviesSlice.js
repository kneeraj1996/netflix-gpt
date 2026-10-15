import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({

    name: 'movies',
    initialState: {
        nowPlayingMovies: null,
        popularMovies: null,
        upcomingMovies: null,
        trailerVideo: null,
        selectedVideo: null,
        visibleMoreInfo: false
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        addUpcomingMovies: (state, action) => {
            state.upcomingMovies = action.payload;
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        },
        addSelectedVideo: (state, action) => {
            state.selectedVideo = action.payload;
        },
        setVisibleMoreInfo: (state) => {
            state.visibleMoreInfo = !state.visibleMoreInfo;
        }
        
    }
})

export const { addNowPlayingMovies, setVisibleMoreInfo, addPopularMovies,addUpcomingMovies, addSelectedVideo, addTrailerVideo } = moviesSlice.actions;
export default moviesSlice.reducer;
