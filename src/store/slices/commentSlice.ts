import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Comment} from '../../types';
import {getCommentsFromResidencyId} from "../../api/commentApi.ts";

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
)

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        addComment: (state, action: PayloadAction<Comment>) => {
            state.comments.push(action.payload);
        },
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
            });
    }
});

export const {addComment, upvoteComment, downvoteComment} = commentSlice.actions;
export default commentSlice.reducer;