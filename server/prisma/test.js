function addMonthsHandlingDayOverflow(startDate , monthsToAdd ) {
    const year = startDate.getFullYear();
    const month = startDate.getMonth();
    const day = startDate.getDate();

    const targetMonth = month + monthsToAdd;

    const tentativeDate = new Date(year, targetMonth, day);

    // getMonth() is zero-based (Jan = 0)
    // if day doesn't exist in target month, date overflows to next month
    // so if months don't match, return last day of target month
    if (tentativeDate.getMonth() !== (targetMonth % 12)) {
      return new Date(year, targetMonth + 1, 0);
    }
    return tentativeDate;
}
const newdate = new Date('2025-01-30')
console.error(addMonthsHandlingDayOverflow(newdate, 1))
