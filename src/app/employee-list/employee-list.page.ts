import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { ModalController } from '@ionic/angular';
import { EmployeeFormComponent } from '../components/employee-form/employee-form.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeModal } from '../modal/employee.modal';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.page.html',
  styleUrls: ['./employee-list.page.scss'],
})
export class EmployeeListPage implements OnInit, OnDestroy {

  employeesList: EmployeeModal[] = [];

  constructor(
    private modalController: ModalController,
    private employeeService: EmployeeService,
    private alertController: AlertController
    ) { }

  ngOnInit() {
    this.getEmployeesList();
  }

  getEmployeesList() {
    this.employeesList = [...new Set(this.employeeService.getAllEmployees())] ;
  }

  async employeeFormModal() {
    const modal = await this.modalController.create({
      component: EmployeeFormComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        editMode: false
      }
    });
    modal.onWillDismiss()
    .then((data) => {
      if (data.data.newData) {
        this.employeeService.addEmployee(data.data.newData);
      }
    });
    modal.onDidDismiss()
    .then( () => {
      this.getEmployeesList();
    });
    return await modal.present();
  }

  async onEmployeeEdit(id, index) {
    const modal = await this.modalController.create({
      component: EmployeeFormComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        editMode: true,
        employeeId: id,
        employeeIndex: index
      }
    });
    modal.onWillDismiss()
    .then((data) => {
      if (data.data.newData) {
        this.employeeService.updateEmployee(index, data.data.newData);
      }
    });
    modal.onDidDismiss()
    .then( () => {
      this.getEmployeesList();
    });
    return await modal.present();
  }

  async onEmployeeView(id, index) {
    const modal = await this.modalController.create({
      component: EmployeeComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        employeeId: id,
        employeeIndex: index
      }
    });
    return await modal.present();
  }

  async onEmployeeDelete(id, index, name) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete Confirm!',
      message: `Do You Want To Delete <strong>${name}</strong>!!!`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => { }
        }, {
          text: 'Okay',
          handler: () => {
            this.employeeService.deleteEmployee(index);
            this.getEmployeesList();
          }
        }
      ]
    });
    await alert.present();
  }

  ngOnDestroy() {
  }

}
