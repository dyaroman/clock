import {Clock} from './clock';


test('lead zero for 9, should return "09"', () => {
  const clock = new Clock();
  expect(clock.leadZero(9)).toBe('09');
});