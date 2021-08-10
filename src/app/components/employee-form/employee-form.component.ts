import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { EmployeeService } from 'src/app/service/employee.service';
import { EmployeeModal } from '../../modal/employee.modal';
import * as moment from 'moment'; // import moment.

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  @Input() editMode:      string ;
  @Input() employeeId:    string ;
  @Input() employeeIndex: string;

  employeeData: EmployeeModal;

  genderValue = 'Male';
  employeeForm: FormGroup;

  isEmployeeExist = false;

  constructor(
    private modalController: ModalController,
    private employeeService: EmployeeService
    ) { }

  ngOnInit() {
    this.initForm();
    console.log('this.editMode =>', this.editMode);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.editMode ? this.initUpdateForm(this.employeeId) : '';
  }

  /**
   * initialize register form
   */
  initForm(){
    this.employeeForm = new FormGroup({
      name:    new FormControl('', Validators.required),
      job:     new FormControl('', Validators.required),
      email:   new FormControl('', [Validators.required, ]),
      phone:   new FormControl('', [Validators.required, ]),
      gender:  new FormControl('', ),
      notes:   new FormControl('', Validators.required),
    });
  }

  async initUpdateForm(employeeId){
    const employee = await this.employeeService.getEmployeeById(employeeId);
    this.employeeForm.patchValue({
      name:   employee.name,
      job:    employee.job,
      email:  employee.email,
      phone:  employee.phone,
      gender: employee.gender,
      notes:  employee.notes,
    });
    this.employeeData = employee;
  }

  onGenderChangeHandler($event) {
    this.genderValue = $event.target.value;
  }

  /**
   * @param event
   *
   * check Email Input value is email exist
   */
    checkEmailInput(email) {
      this.isEmployeeExist = this.employeeService.isEmployeeExist(email) ? true : false;
  }

  /**
   * @returns Date And Time
   */
  getCurrentTime(){
    return moment().format('DD MMM YYYY HH:mm:ss');
  }

  /**
   *
   * @param length
   * @returns
   */
  getRandomStringId(length) {
    let result      = '';
    const characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  /**
   * @returns
   */
  async onSubmitEmployee() {
    const employeeFormData: EmployeeModal = {
      id:        this.editMode ? this.employeeId : await this.getRandomStringId(11),
      job:       this.employeeForm.value.job,
      name:      this.employeeForm.value.name,
      notes:     this.employeeForm.value.notes,
      email:     this.employeeForm.value.email,
      phone:     this.employeeForm.value.phone,
      gender:    this.employeeForm.value.gender,
      createdAt: this.editMode ? this.employeeData.createdAt : this.getCurrentTime(),
    };
    return this.modalController.dismiss({newData: employeeFormData});
  }

  /**
   *
   */
  closeEmployeeFormModal() {
    this.modalController.dismiss({});
  }


}
