import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeListPageRoutingModule } from './employee-list-routing.module';

import { EmployeeListPage } from './employee-list.page';
import { EmployeeFormComponent } from '../components/employee-form/employee-form.component';
import { HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';

import { EmployeeComponent } from './employee/employee.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeListPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatRadioModule,
    MatFormFieldModule
  ],
  declarations: [EmployeeListPage, EmployeeFormComponent, EmployeeComponent]
})
export class EmployeeListPageModule {}
