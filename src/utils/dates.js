import dayjs from 'dayjs';
export const DATE_FORMATS = {
  FULL_MONTH: 'DD MMMM YYYY',
  SERVER_DATE: 'YYYY-MM-DDTHH:mm:ss',
  EU: 'DD.MM.YYYY',
};

export const toDate = (strDate, format) => {
  if (!strDate) return null;
  return dayjs(strDate).format(format);
};
