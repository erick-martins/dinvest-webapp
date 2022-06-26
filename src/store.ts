import { profileReducer } from '@domains/user/reducer';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: {
		profile: profileReducer
	}
});
