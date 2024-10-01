import { DATE_OF_BIRTH_YEARS_RANGE } from '../constants';

export const getCurrentYear = new Date().getFullYear();

export const getDateOfBirthDays = (month: number, year: number) => {
  const daysCount = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: daysCount }, (_, i) => ++i);
};

export const getDateOfBirthYears = () => {
  let currentYear = new Date().getFullYear();
  return Array.from({ length: DATE_OF_BIRTH_YEARS_RANGE }, () => (currentYear -= 1));
};
