import { store } from '@app/store';
import React from 'react';

export interface FCProps {
	children?: React.ReactNode | React.ReactNode[];
}

export type AppDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;

export type ExtractProps<TComponentOrTProps> = TComponentOrTProps extends React.Component<
	infer TProps,
	unknown
>
	? TProps
	: TComponentOrTProps;
