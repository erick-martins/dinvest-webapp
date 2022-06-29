import { useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useDocumentTitle = (translationKey: string, prevailOnUnmount = false) => {
	const { t } = useTranslation();
	const defaultTitle = useRef(document.title);

	const prefix = useMemo(() => {
		return t('navigation.prefix');
	}, []);

	useEffect(() => {
		document.title = t(`navigation.titles.${translationKey}`, { prefix });
	}, [translationKey]);

	useEffect(
		() => () => {
			if (!prevailOnUnmount) {
				document.title = defaultTitle.current;
			}
		},
		[]
	);
};
