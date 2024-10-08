import { parseUserName, parseUserRegisterDate } from '@/entities/user/lib/mappings';

describe('User mapping functions', () => {
  it('should return user name with @ prefix', () => {
    const mappedName = parseUserName('John');

    expect(mappedName).toContain('@');
  });

  it('should return long month and year', () => {
    const date = new Date();
    const mappedDate = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const result = parseUserRegisterDate(date.valueOf());

    expect(mappedDate).toBe(result);
  });
});
