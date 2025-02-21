import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Comment} from '../../types';
import {getCommentsFromResidencyId, addComment as addCommentApi, updateComment as updateCommentApi, deleteComment as deleteCommentApi, upvoteComment as upvoteCommentApi, downvoteComment as downvoteCommentApi} from "../../api/commentApi.ts";

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
export const updateComment = createAsyncThunk(
    'comments/update',
    async ({commentId, comment}: { commentId: string, comment: Comment }, {rejectWithValue}) => {
        try {
            const response = await updateCommentApi(commentId, comment);
            return response;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const deleteComment = createAsyncThunk(
    'comments/delete',
    async (commentId: string, {rejectWithValue}) => {
        try {
            await deleteCommentApi(commentId);
            return commentId;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const upvoteComment = createAsyncThunk(
    'comments/upvote',
    async (commentId: string, {rejectWithValue}) => {
        try {
            const response = await upvoteCommentApi(commentId);
            return response;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const downvoteComment = createAsyncThunk(
    'comments/downvote',
    async (commentId: string, {rejectWithValue}) => {
        try {
            const response = await downvoteCommentApi(commentId);
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

    },
    extraReducers: (builder) => {
        builder
            .addCase(getCommentsForResidency.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCommentsForResidency.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(getCommentsForResidency.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.comments.push(action.payload);
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                const index = state.comments.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.comments[index] = action.payload;
                }
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.comments = state.comments.filter(c => c.id !== action.payload);
            })
            .addCase(upvoteComment.fulfilled, (state, action) => {
                const comment = state.comments.find(c => c.id === action.payload.id);
                if (comment) {
                    comment.upVotes = action.payload.upVotes;
                }
            })
            .addCase(downvoteComment.fulfilled, (state, action) => {
                const comment = state.comments.find(c => c.id === action.payload.id);
                if (comment) {
                    comment.downVotes = action.payload.downVotes;
                }
            });
    }
});

export default commentSlice.reducer;