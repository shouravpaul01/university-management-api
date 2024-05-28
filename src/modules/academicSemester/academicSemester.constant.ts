import {
  TAcademicSemesterCodeMapper,
  TMonths,
} from './academicSemester.interface';

export const monthsSchema: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const academicSemesterCodeMapper: TAcademicSemesterCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
