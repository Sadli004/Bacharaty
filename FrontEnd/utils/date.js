export const formatTime = (date) => {
  const d = new Date(date);
  const hours = d.getHours();
  const minutes = d.getMinutes();
  return `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
};
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = months[d.getMonth()];
  const day = d.getDate();
  return `${day <= 9 ? `0` + day : day} ${month} ${year}`;
};

export const AppDate = (date) => {
  const d = new Date(date);
  const day = d.getDate();
  const dayName = days[d.getDay()];
  const year = d.getFullYear();
  const month = months[d.getMonth()];
  return `${dayName}, ${day <= 9 ? "0" + day : day} ${month}, ${year}`;
};

export const fromLastMsg = (date) => {
  const d = new Date(date);
  const now = new Date();
  const diff = (now.getTime() - d.getTime()) / 1000;
  // console.log(diff);
  if (diff < 60) return "Just now";
  if (diff < 3600 && diff > 60) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff > 3600 && diff < 86400)
    return `${Math.floor(diff / 3600)} hours ago`;
  if (diff > 86400) return `${Math.floor(diff / 86400)} days ago`;
};

export const getWeekDays = (current) => {
  console.log(current);
  const currentDay = current.getDay();
  const week = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(current);
    day.setDate(current.getDate() + i - currentDay);
    week.push({
      id: i + 1,
      day: days[day.getDay()],
      date: day.getDate(),
      current: day,
    });
  }
  return week;
};
