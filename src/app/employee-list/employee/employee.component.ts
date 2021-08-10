import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EmployeeService } from 'src/app/service/employee.service';
import { EmployeeModal } from '../../modal/employee.modal';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  @Input() employeeId: string ;
  @Input() employeeIndex: string;

  employeeData: EmployeeModal;

  constructor(
    private employeeService: EmployeeService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.getEmployeeData(this.employeeId);
  }

  getEmployeeData(employeeId) {
    this.employeeData = this.employeeService.getEmployeeById(employeeId);
  }

  async closeEmployeeModal() {
    await this.modalController.dismiss({});
  }


}
