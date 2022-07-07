export const FormatNumber = (_num) => {
    return _num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}