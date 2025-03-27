// Create employee records
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeeData) {
  return employeeData.map(createEmployeeRecord);
}

// Time event functions
function createTimeInEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(" ");

  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date,
  });

  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(" ");

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date,
  });

  return employee;
}

// Hours calculation
function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find((event) => event.date === date);
  const timeOut = employee.timeOutEvents.find((event) => event.date === date);

  return (timeOut.hour - timeIn.hour) / 100;
}

// Wage calculations
function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  return hoursWorked * employee.payPerHour;
}

function allWagesFor(employee) {
  const datesWorked = employee.timeInEvents.map((event) => event.date);
  return datesWorked.reduce((total, date) => {
    return total + wagesEarnedOnDate(employee, date);
  }, 0);
}

// Payroll calculation
function calculatePayroll(employees) {
  return employees.reduce((total, employee) => {
    return total + allWagesFor(employee);
  }, 0);
}
// Your code here
