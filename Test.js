//var domain = "http://127.0.0.1:58588/fake-server”

function getData(path)
{
return new Promise((resolve, reject)=>{
const xhr = new XMLHttpRequest();
xhr.open('GET', domain + path);
xhr.onload = function()
{
if (this.status == 200) {
const jsonResponse = JSON.parse(xhr.responseText);
resolve(jsonResponse)
} else {
reject("Error while fetching data from server")
}

}

xhr.send();
});
}

async function getEmployees(sortAscending) {
salaries = await getData("/salaries.json")
employees = await getData("/employees.json")

    const employeesMap = employees.reduce(function (map, employee) {
    map[employee.id] = employee.name
    return map;
    }, {})

    const employeesWithSalaries = []
    salaries.forEach((salary) => {
    employeesWithSalaries.push({
    "id": salary.employeeId,
    "name": employeesMap[salary.employeeId],
    "salary": Number(salary.salary)
    })
    })
    const sorted = employeesWithSalaries.sort((a,b) => {
    if (sortAscending) {
    return a.salary - b.salary
    } else {
    return b.salary - a.salary
    }

    })

    return sorted
}

const result = getEmployees(false)
console.log(result)
