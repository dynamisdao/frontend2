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

export function getMonthsQuantity(positionList) {
  const workPeriods = positionList.map(p =>
    ({ fromValue: calculationDate(p.from),
      toValue: calculationDate(p.to, p.isCurrentWork)
  }));
  const monthsList = [];
  let quantity = 0;
  for (let year = 2013; year <= 2016; year++) {
    for (let month = 1; month <= 12; month++) {
      let isSelect = false;
      for (const p of workPeriods) {
        if ((p.fromValue.year < year && year < p.toValue.year) ||
          (p.fromValue.year == year && year == p.toValue.year && p.fromValue.month <= month && month <= p.toValue.month) ||
          (p.fromValue.year == year && year < p.toValue.year && p.fromValue.month <= month) ||
          (p.fromValue.year < year && year == p.toValue.year && month <= p.toValue.month)) {
          isSelect = true;
          quantity++;
        }
      }
      monthsList.push({ year, month, isSelect });
    }
  }
  return { monthsList, quantity };
}

export function getMonthtStringByNumber(number) {
  switch (number) {
    case '01':
      return 'Jan';
    case '02':
      return 'Feb';
    case '03':
      return 'Mar';
    case '04':
      return 'Apr';
    case '05':
      return 'May';
    case '06':
      return 'June';
    case '07':
      return 'July';
    case '08':
      return 'Aug';
    case '09':
      return 'Sept';
    case '10':
      return 'Oct';
    case '11':
      return 'Nov';
    case '12':
      return 'Dec';
    default:
      return null;
  }
}

export function getSignApplication(data, user, isJSON) {
  let obj = {
    identity: {
      verification_method: 'keybase',
      verification_data: {
        username: user.username,
        proofs: []
      },
      employmentHistory: {
        jobs: data
      },
      requestedPremiumAmount: '238'
    }
  };
  if (isJSON) obj = JSON.stringify(obj);
  return obj;
}
