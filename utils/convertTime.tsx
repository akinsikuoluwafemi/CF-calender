function changeTime(time: Date | string) {
  return new Date(`${time}`).toJSON().split('T')[1].substring(0, 5);
}

export const convertTimeToStr = (time: Date | string) => {
  return new Date(`${time}`).toDateString();
};

export default changeTime;
