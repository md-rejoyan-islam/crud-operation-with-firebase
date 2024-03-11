export const timeAgo = (sec) => {
  const date = new Date(sec * 1000);
  const secondsElapsed = Math.floor((Date.now() - date) / 1000);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (secondsElapsed < 60) {
    return rtf.format(-secondsElapsed, "second");
  }

  const minutesElapsed = Math.floor(secondsElapsed / 60);
  if (minutesElapsed < 60) {
    return rtf.format(-minutesElapsed, "minute");
  }

  const hoursElapsed = Math.floor(minutesElapsed / 60);
  if (hoursElapsed < 24) {
    return rtf.format(-hoursElapsed, "hour");
  }

  const daysElapsed = Math.floor(hoursElapsed / 24);
  if (daysElapsed < 30) {
    return rtf.format(-daysElapsed, "day");
  }

  const monthsElapsed = Math.floor(daysElapsed / 30);
  if (monthsElapsed < 12) {
    return rtf.format(-monthsElapsed, "month");
  }

  const yearsElapsed = Math.floor(monthsElapsed / 12);

  return rtf.format(-yearsElapsed, "year");
};
