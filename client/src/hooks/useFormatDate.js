
export const useFormat = () => {
    const dateFormat = (date) => {
        const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const month = parseInt(date.substring(5, 7), 10) - 1;
        const day = date.substring(8, 10);
        const year = date.substring(0, 4);
    
        return `${day} ${monthName[month]} ${year}`
      }

    const formatTime = (time) => {
        const hour = time.substring(0, 2);
        const period = hour >= 12 ? 'PM' : 'AM';
        const minutes = time.substring(3, 5);

        // convert to 12 hour format
        const formatedHour = hour % 12 === 0 ? 12 : hour % 12;

        return `${formatedHour}:${minutes} ${period}`
    }

    return {
        dateFormat,
        formatTime
    }

}

