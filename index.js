// Your code here
let createEmployeeRecord = function (employee) {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

let createEmployeeRecords = function (employeeData) {
  return employeeData.map(function (employee) {
    return createEmployeeRecord(employee);
  });
};

let createTimeInEvent = function (employee, employeeDate) {
  let [date, hour] = employeeDate.split(" ");

  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });

  return employee;
};

let createTimeOutEvent = function (employee, employeeDate) {
  let [date, hour] = employeeDate.split(" ");

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });

  return employee;
};

let hoursWorkedOnDate = function (employee, dateEmployee) {
  let inEvent = employee.timeInEvents.find(function (e) {
    return e.date === dateEmployee;
  });

  let outEvent = employee.timeOutEvents.find(function (e) {
    return e.date === dateEmployee;
  });

  return (outEvent.hour - inEvent.hour) / 100;
};

let wagesEarnedOnDate = function (employee, dateSought) {
  let rawWage = hoursWorkedOnDate(employee, dateSought) * employee.payPerHour;
  return parseFloat(rawWage.toString());
};

let allWagesFor = function (employee) {
  let eligibleDates = employee.timeInEvents.map(function (e) {
    return e.date;
  });

  let payable = eligibleDates.reduce(function (memo, d) {
    return memo + wagesEarnedOnDate(employee, d);
  }, 0);

  return payable;
};

let calculatePayroll = function (employeePayRoll) {
  return employeePayRoll.reduce(function (memo, rec) {
    return memo + allWagesFor(rec);
  }, 0);
};
