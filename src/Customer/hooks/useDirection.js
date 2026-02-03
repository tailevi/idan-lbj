import { useTranslation } from 'react-i18next';

export function useDirection() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'he';

  return {
    direction: isRTL ? 'rtl' : 'ltr',
    isRTL,
    sidebarSide: isRTL ? 'right' : 'left'
  };
}
