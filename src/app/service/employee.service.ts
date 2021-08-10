import { Injectable } from '@angular/core';
import { EmployeeModal } from '../modal/employee.modal';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeesList: EmployeeModal[] = [
    {createdAt: '31 Jul 2021 20:26:04',
    email: 'sd@ds.net',
    gender: 'male',
    id: 'kPEquXokyl5',
    job: 'job title',
    name: 'emp name',
    notes: 'some notes it\'s here ...',
    phone: 1155721425}
  ];

  constructor() { }

  getAllEmployees() {
    return this.employeesList;
  }

  getEmployeeById(employeeId: string) {
    return this.employeesList.find(employee => employee.id === employeeId );
  }

  getEmployeeByIndex(employeeIndex) {
    return this.employeesList[employeeIndex];
  }

  isEmployeeExist(employeesEmail: string) {
    return this.employeesList.find( employee => employee.email === employeesEmail );
  }

  addEmployee( employeeData: EmployeeModal ) {
    return this.employeesList.push(employeeData);
  }

  updateEmployee(employeeIndex, employeeNewData) {
    return this.employeesList[employeeIndex] = employeeNewData;
  }

  deleteEmployee(employeeIndex)  {
    return this.employeesList.splice(employeeIndex, 1);
  }


}
