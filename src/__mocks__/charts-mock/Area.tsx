import useDemoConfig from './useDemoConfig';
import React from 'react';
import { AxisOptions, Chart } from 'react-charts';

export default function Bar() {
	const { data } = useDemoConfig({
		series: 10,
		dataType: 'time'
	});

	const primaryAxis = React.useMemo<AxisOptions<typeof data[number]['data'][number]>>(
		() => ({
			getValue: (datum) => datum.primary as Date
		}),
		[]
	);

	const secondaryAxes = React.useMemo<AxisOptions<typeof data[number]['data'][number]>[]>(
		() => [
			{
				getValue: (datum) => datum.secondary,
				stacked: true
				// OR
				// elementType: "area",
			}
		],
		[]
	);

	return (
		<>
			<Chart
				options={{
					data,
					primaryAxis,
					secondaryAxes
				}}
			/>
		</>
	);
}
