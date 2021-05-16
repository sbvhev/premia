import { useEffect, useState } from 'react';
import moment from 'moment';

export function useExpirations() {
  const [expirations, setExpirations] = useState<Date[]>([]);

  function weekOfMonth(input = moment()) {
    const firstDayOfMonth = input.clone().startOf('month');
    const firstDayOfWeek = firstDayOfMonth.clone().startOf('week');

    const offset = firstDayOfMonth.diff(firstDayOfWeek, 'days');

    return Math.ceil((input.date() + offset) / 7);
  }

  useEffect(() => {
    if (expirations.length > 0) return;

    const result: Date[] = [];

    const now = moment();
    let target = moment().utc().endOf('day');

    const oneMonth = moment().add(1, 'month');
    const threeMonths = moment().add(3, 'months');
    const sixMonths = moment().add(6, 'months');

    const friday = 5;
    const today = target.isoWeekday();

    target = target.isoWeekday(friday);
    // if we haven't yet passed the day of the week that I need:
    if (today <= friday) {
      // then just give me this week's instance of that day
      target = target.isoWeekday(friday);
    } else {
      // otherwise, give me *next week's* instance of that same day
      target = target.add(1, 'week').isoWeekday(friday);
    }

    result.push(target.toDate());

    const schedule = [1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 8, 8, 8, 8, 16, 16];

    let it = 1;

    target = target.add(1, 'week');
    while (target.diff(now, 'days') < 365) {
      // We always add 4 next weeks
      if (target.isAfter(oneMonth)) {
        const week = weekOfMonth(target);

        // Past one month, we skip week 2 and week 4
        if ([2, 4, 5].includes(week)) {
          target = target.add(1, 'week');
          continue;
        }

        // Past three months, we skip week 1
        if (week === 1 && target.isAfter(threeMonths)) {
          target = target.add(1, 'week');
          continue;
        }

        // Past six months, we only keep even months
        if (
          target.isAfter(sixMonths) &&
          ((target.month() + 1) % 2 === 1 || week !== 3)
        ) {
          target = target.add(1, 'week');
          continue;
        }
      }

      result.push(target.toDate());
      target = target.add(schedule[it], 'week');
      it += 1;
    }

    setExpirations(result);
  }, [expirations.length]);

  return expirations;
}
