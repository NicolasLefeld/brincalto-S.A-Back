function getDateFormated(date) {
  try {
    const month = date.getUTCMonth() + 1; //months from 1-12
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  } catch (error) {
    date = new Date(date);
    
    const month = date.getUTCMonth() + 1; //months from 1-12
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }
}

module.exports = getDateFormated;
