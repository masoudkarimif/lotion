const currentDate = () => {
  const date = new Date();
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toJSON()
    .substring(0, 19);
};

export { currentDate };
