import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css'],
})
export class AddEditEmployeeComponent implements OnInit {
  employee: any = { name: '', email: '', department: '' };
  isEditMode = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadEmployee(Number(id));
    }
  }

  async loadEmployee(id: number) {
    try {
      this.employee = await this.employeeService.getEmployeeById(id);
    } catch (error) {
      this.errorMessage = 'Failed to load employee details.';
    }
  }

  async onSubmit() {
    try {
      if (this.isEditMode) {
        await this.employeeService.updateEmployee(this.employee.id, this.employee);
      } else {
        await this.employeeService.addEmployee(this.employee);
      }
      this.router.navigate(['/']);
    } catch (error) {
      this.errorMessage = 'Failed to save employee details.';
    }
  }
}