import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  errorMessage: string = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  async loadEmployees() {
    try {
      this.employees = await this.employeeService.getAllEmployees();
    } catch (error) {
      this.errorMessage = 'Failed to load employees.';
    }
  }

  async deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      try {
        await this.employeeService.deleteEmployee(id);
        this.loadEmployees(); // Refresh the list
      } catch (error) {
        this.errorMessage = 'Failed to delete employee.';
      }
    }
  }
}