export const StringifyNumber = number =>
  Math.round(number)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
