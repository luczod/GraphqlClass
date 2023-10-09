export const createDate = (datestring) => {
  let date1;
  if (!datestring) {
    date1 = new Date();
  } else {
    date1 = new Date(datestring);
  }

  date1 = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "medium",
  }).format(new Date());

  return date1;
};

export const dateToMySql = (datastring) => {
  const dataArg = createDate(datastring);
  const [date, time] = dataArg.split(", ");
  const [day, mouth, year] = date.split("/");

  return `${year}-${mouth}-${day} ${time}`;
};
