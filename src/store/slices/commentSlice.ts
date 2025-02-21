import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Comment} from '../../types';
import {getCommentsFromResidencyId, addComment as addCommentApi} from "../../api/commentApi.ts";

interface CommentState {
    comments: Comment[];
    loading: boolean;
    error: string | null;
}

const initialState: CommentState = {
    comments: [],
    loading: false,
    error: null
};

export const getCommentsForResidency = createAsyncThunk(
    'comments/get',
    async (residencyId : string) => {
        const response = await getCommentsFromResidencyId(residencyId);
        return response.data;
    }
);

export const addComment = createAsyncThunk(
    'comments/add',
    async (comment: Comment, { rejectWithValue }) => {
        try {
            const response = await addCommentApi(comment);
            return response;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        upvoteComment: (state, action: PayloadAction<string>) => {
            const comment = state.comments.find(c => c.id === action.payload);
            if (comment) {
                comment.upVotes += 1;
            }
        },
        downvoteComment: (state, action: PayloadAction<string>) => {
            const comment = state.comments.find(c => c.id === action.payload);
            if (comment) {
                comment.downVotes += 1;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCommentsForResidency.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCommentsForResidency.fulfilled, (state,action)=>{
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(getCommentsForResidency.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comments.push(action.payload);
            })
            .addCase(addComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const {upvoteComment, downvoteComment} = commentSlice.actions;
export default commentSlice.reducer;