import dayjs from "dayjs";
import "dayjs/locale/ru";

dayjs.locale("ru");

export const formatDateTime = (date: Date): string =>
  dayjs(date).format("DD MMM YYYY, HH:mm");
