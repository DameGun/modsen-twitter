import { ChangeEvent, useMemo, useState } from 'react';

import { CustomSelect, FormField, Heading3, Paragraph } from '@/components/ui';
import { DateOfBirthMonths } from '@/constants/dateOfBirth';
import { getDateOfBirthDays, getDateOfBirthYears } from '@/utils/dateOfBirth';

import { DateOfBirthWrapper } from './styled';

type DateOfBirthControlProps = {
  defaultValue?: Date;
  onChange(value: Date): void;
  errorText?: string;
};

export function DateOfBirthControl({ defaultValue, onChange, errorText }: DateOfBirthControlProps) {
  const [day, setDay] = useState(defaultValue?.getDate() ?? 1);
  const [month, setMonth] = useState(defaultValue?.getMonth() ?? 0);
  const [year, setYear] = useState(defaultValue?.getFullYear() ?? new Date().getFullYear());

  const currentMonthDays = getDateOfBirthDays(month, year);
  const years = useMemo(() => getDateOfBirthYears(), []);

  const handleDay = (e: ChangeEvent<HTMLSelectElement>) => {
    const newDay = +e.target.value;
    const newDate = new Date(year, month, newDay);

    setDay(newDay);
    onChange(newDate);
  };

  const handleMonth = (e: ChangeEvent<HTMLSelectElement>) => {
    const newMonth = DateOfBirthMonths.findIndex((month) => month === e.target.value);
    const newDate = new Date(year, newMonth, day);

    setMonth(newMonth);
    onChange(newDate);
  };

  const handleYear = (e: ChangeEvent<HTMLSelectElement>) => {
    const newYear = +e.target.value;
    const newDate = new Date(newYear, month, day);

    setYear(newYear);
    onChange(newDate);
  };

  return (
    <>
      <Heading3>Date of birth</Heading3>
      <Paragraph>
        This information will not be publicly available. Confirm your age, even if this account is
        for a company, pet, etc.
      </Paragraph>
      <FormField errorText={errorText}>
        <DateOfBirthWrapper>
          <CustomSelect
            id='month'
            name='month'
            placeholder='Month'
            onChange={handleMonth}
            items={DateOfBirthMonths}
          />
          <CustomSelect
            id='day'
            name='day'
            placeholder='Day'
            onChange={handleDay}
            items={currentMonthDays}
          />
          <CustomSelect
            id='year'
            name='year'
            placeholder='Year'
            onChange={handleYear}
            items={years}
          />
        </DateOfBirthWrapper>
      </FormField>
    </>
  );
}
