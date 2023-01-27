function changeTime(time: Date | string) {
  return new Date(`${time}`).toJSON().split('T')[1].substring(0, 5);
}

export const convertTimeToStr = (time: Date | string) => {
  return new Date(`${time}`).toDateString();
};

export const isAmOrPm = (time: Date | string): string => {
  return new Date(`${time}`).getHours() >= 12 ? 'PM' : 'AM';
};

export default changeTime;
