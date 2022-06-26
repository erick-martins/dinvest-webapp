import { AppDispatch, StoreState } from '@definitions/types';
import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from './reducer';

export const useUserProfile = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { profile, loading, error } = useSelector(({ profile }: StoreState) => profile);

	const fetchProfile = async () => {
		dispatch(UserActions.fetchProfile());
	};

	return {
		profile,
		loading,
		error,
		fetchProfile
	};
};
