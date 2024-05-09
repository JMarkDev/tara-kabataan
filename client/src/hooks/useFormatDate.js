export const useFormat = () => {
  let monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dateFormat = (date) => {
    const month = parseInt(date.substring(5, 7), 10) - 1;
    const day = date.substring(8, 10);
    const year = date.substring(0, 4);

    return `${monthName[month]} ${day}, ${year}`;
  };

  const extractYear = (date) => {
    const month = parseInt(date.substring(5, 7), 10) - 1;
    const day = date.substring(8, 10);

    return `${monthName[month]} ${day}`;
  };

  const formatTime = (time) => {
    const hour = time.substring(0, 2);
    const period = hour >= 12 ? "PM" : "AM";
    const minutes = time.substring(3, 5);

    // convert to 12 hour format
    const formatedHour = hour % 12 === 0 ? 12 : hour % 12;

    return `${formatedHour}:${minutes} ${period}`;
  };

  const discountedPrice = (discountDate) => {
    const currentDate = new Date();
    const discountDated = new Date(discountDate);

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    const discountYear = discountDated.getFullYear();
    const discountMonth = discountDated.getMonth();
    const discountDay = discountDated.getDate();

    const isDiscountedDate =
      currentYear <= discountYear &&
      currentMonth <= discountMonth &&
      currentDay <= discountDay;

    if (isDiscountedDate) {
      return true;
    } else {
      false;
    }
  };

  return {
    dateFormat,
    formatTime,
    extractYear,
    discountedPrice,
  };
};
