import useDemoConfig from './useDemoConfig';
import React from 'react';
import { AxisOptions, Chart } from 'react-charts';

export default function BarHorizontalStacked() {
	const { data } = useDemoConfig({
		series: 10,
		dataType: 'ordinal'
	});

	const primaryAxis = React.useMemo<AxisOptions<typeof data[number]['data'][number]>>(
		() => ({
			position: 'left',
			getValue: (datum) => datum.primary
		}),
		[]
	);

	const secondaryAxes = React.useMemo<AxisOptions<typeof data[number]['data'][number]>[]>(
		() => [
			{
				position: 'bottom',
				getValue: (datum) => datum.secondary,
				stacked: true
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
