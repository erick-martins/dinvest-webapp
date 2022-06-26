/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExtractProps } from '@definitions/types';
import React from 'react';

type ProviderWithProps<C extends React.ComponentType = any> = [C, ExtractProps<C>];

export type ProvidersType = ProviderWithProps | React.ComponentType | React.FC<any>;

interface Props extends React.HTMLProps<HTMLDivElement> {
	providers: ProvidersType[];
}

export const ProvidersComposer: React.FC<Props> = ({ providers, children, ...props }) => (
	<div {...props}>
		{providers.reduceRight((acc, curr) => {
			const [Provider, providerProps] = Array.isArray(curr) ? curr : [curr, {}];
			return <Provider {...providerProps}>{acc}</Provider>;
		}, children)}
	</div>
);
