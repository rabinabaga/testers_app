import moment from 'moment';

export const getFormattedDate = (
  value: string | Date,
  format: string = 'YYYY/MM/DD hh:mm:ss',
): string | undefined => {
  if (!value) {
    return undefined;
  }
  return moment(value).format(format);
};
