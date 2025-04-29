import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { EmployeeListComponent } from './app/employee-list/employee-list.component';
import { AddEditEmployeeComponent } from './app/add-edit-employee/add-edit-employee.component';

const routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'add', component: AddEditEmployeeComponent },
  { path: 'edit/:id', component: AddEditEmployeeComponent },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
}).catch((err) => console.error(err));