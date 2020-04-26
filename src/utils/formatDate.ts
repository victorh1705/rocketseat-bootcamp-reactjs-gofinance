const formatDate = (date: string | Date): string =>
  new Date(date).toLocaleDateString();
export default formatDate;
