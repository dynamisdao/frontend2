export function getHeaders() {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  return headers;
}

export function calculationDate(date, current) {
  const d = new Date();
  const month = d.getMonth();
  const year = d.getFullYear();
  let value = {};
  if (current) {
    value = { year, month };
  } else {
    value = {
      year: parseInt(date.split('.')[1]),
      month: parseInt(date.split('.')[0])
    };
  }
  return value;
}
