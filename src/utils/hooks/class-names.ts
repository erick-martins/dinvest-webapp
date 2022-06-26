type ClassNameConditionals = [
	className: string,
	conditionals?: boolean | boolean[],
	elseClass?: string
];

export const useClassNames = (...classes: (string | ClassNameConditionals)[]) => {
	return classes
		.map((item) => {
			if (typeof item === 'string') return item;

			const [className, conditionals, elseClass] = item;
			if (typeof conditionals === 'undefined') return className;
			return [conditionals].flat().every(Boolean) ? className : elseClass;
		})
		.filter(Boolean)
		.join(' ');
};
