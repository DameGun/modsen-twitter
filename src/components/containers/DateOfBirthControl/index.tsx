import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import { CustomSelect, FlexContainer, FormField, Heading3, Paragraph } from '@/components/ui';
import { DateOfBirthMonths } from '@/constants/dateOfBirth';
import { getDateOfBirthDays, getDateOfBirthYears } from '@/utils/dateOfBirth';

import { DateOfBirthWrapper } from './styled';

type DateOfBirthControlProps = {
  defaultValue?: number;
  onChange(name: 'dateOfBirth', value: number, options: { shouldValidate: boolean }): void;
  errorText?: string;
};

export function DateOfBirthControl({ defaultValue, onChange, errorText }: DateOfBirthControlProps) {
  const [day, setDay] = useState(defaultValue ? new Date(defaultValue).getDate() : 1);
  const [month, setMonth] = useState(defaultValue ? new Date(defaultValue).getMonth() : 0);
  const [year, setYear] = useState(
    defaultValue ? new Date(defaultValue).getFullYear() : new Date().getFullYear()
  );

  const currentMonthDays = getDateOfBirthDays(month, year);
  const years = useMemo(() => getDateOfBirthYears(), []);

  const handleDateChange = (date: Date) =>
    onChange('dateOfBirth', date.valueOf(), { shouldValidate: true });

  const handleDay = (e: ChangeEvent<HTMLSelectElement>) => {
    const newDay = +e.target.value;
    const newDate = new Date(year, month, newDay);

    setDay(newDay);
    handleDateChange(newDate);
  };

  const handleMonth = (e: ChangeEvent<HTMLSelectElement>) => {
    const newMonth = DateOfBirthMonths.findIndex((month) => month === e.target.value);
    const newDate = new Date(year, newMonth, day);

    setMonth(newMonth);
    handleDateChange(newDate);
  };

  const handleYear = (e: ChangeEvent<HTMLSelectElement>) => {
    const newYear = +e.target.value;
    const newDate = new Date(newYear, month, day);

    setYear(newYear);
    handleDateChange(newDate);
  };

  useEffect(() => {
    handleDateChange(new Date(year, month, day));
  }, []);

  return (
    <>
      <FlexContainer direction='column' gap='sm' align='start'>
        <Heading3>Date of birth</Heading3>
        <Paragraph>
          This information will not be publicly available. Confirm your age, even if this account is
          for a company, pet, etc.
        </Paragraph>
      </FlexContainer>
      <FormField errorText={errorText}>
        <DateOfBirthWrapper>
          <CustomSelect
            id='month'
            name='month'
            placeholder='Month'
            onChange={handleMonth}
            items={DateOfBirthMonths}
            defaultValue={DateOfBirthMonths[month]}
          />
          <CustomSelect
            id='day'
            name='day'
            placeholder='Day'
            onChange={handleDay}
            items={currentMonthDays}
            defaultValue={day}
          />
          <CustomSelect
            id='year'
            name='year'
            placeholder='Year'
            onChange={handleYear}
            items={years}
            defaultValue={year}
          />
        </DateOfBirthWrapper>
      </FormField>
    </>
  );
}
