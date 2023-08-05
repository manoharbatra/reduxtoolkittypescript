import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { RootState } from './index';
import { Post, PostsState } from './types';


const initialState: PostsState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.data = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error occurred.';
            });
    },
});

export const selectPosts = (state: RootState) => state.posts.data;
export default postsSlice.reducer;