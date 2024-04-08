function createEmployeeRecord(employeeInfo) {
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employees) {
    return employees.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return employee;
}

function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return employee;
}

function hoursWorkedOnDate(employee, workDate) {
    const timeIn = employee.timeInEvents.find(event => event.date === workDate);
    const timeOut = employee.timeOutEvents.find(event => event.date === workDate);
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked;
}

function wagesEarnedOnDate(employee, workDate) {
    const hoursWorked = hoursWorkedOnDate(employee, workDate);
    const wage = hoursWorked * employee.payPerHour;
    return wage;
}

function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
}

function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}
