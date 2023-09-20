export const convertISOToDDMMYYYY = (isoDateString) => {
    const [year, month, day] = isoDateString.slice(0, 10).split('-');
    return `${day}/${month}/${year}`;
}