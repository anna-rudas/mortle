import { calculatePercentage } from "../src/utilities/helpers";

test("calculates integer percentage", () => {
  expect(calculatePercentage(10, 100)).toEqual(10);
  expect(calculatePercentage(5, 5)).toEqual(100);
  expect(calculatePercentage(105, 1000)).toEqual(11);
  expect(calculatePercentage(10, 0)).toEqual(0);
});
