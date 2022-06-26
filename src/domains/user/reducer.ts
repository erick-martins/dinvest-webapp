import { ApiError } from '@app/api/errors';
import { ThunkRejection } from '@domains/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserService } from '@services/user.service';
import { UserProfile, UsersState } from './types';

const fetchProfile = createAsyncThunk<UserProfile, undefined, ThunkRejection>(
	'users/fetchProfile',
	async (_, { rejectWithValue }) => {
		try {
			return await UserService.profile();
		} catch (error: unknown) {
			return rejectWithValue(error as ApiError);
		}
	}
);

const initialState: UsersState = {
	loading: 'idle'
};

export const profileSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setProfile: (state, action: PayloadAction<UserProfile>) => {
			state.loading = 'succeeded';
			state.error = undefined;
			state.profile = action.payload;
		},
		reset: (state) => {
			state.loading = 'idle';
			state.error = undefined;
			state.profile = undefined;
		}
	},
	extraReducers: (builder) => {
		// Fetch
		builder.addCase(fetchProfile.pending, (state) => {
			state.loading = 'pending';
		});
		builder.addCase(fetchProfile.fulfilled, (state, action) => {
			state.profile = action.payload;
			state.loading = 'succeeded';
		});
		builder.addCase(fetchProfile.rejected, (state, action) => {
			state.error = action.payload;
			state.loading = 'failed';
		});
	}
});

const { setProfile, reset } = profileSlice.actions;

export const UserActions = {
	setProfile,
	fetchProfile,
	reset
};

export const profileReducer = profileSlice.reducer;
