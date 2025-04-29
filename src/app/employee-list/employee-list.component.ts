import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule,],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent {
  employees = signal<any[]>([]);
  errorMessage = signal<string>('');

  constructor(private employeeService: EmployeeService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    await this.loadEmployees();
  }

  async loadEmployees() {
    try {
      this.employees.set(await this.employeeService.getAllEmployees());
    } catch (error) {
      this.errorMessage.set('Failed to load employees.');
    }
  }

  async deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      try {
        await this.employeeService.deleteEmployee(id);
        this.loadEmployees(); // Refresh the list
      } catch (error) {
        this.errorMessage.set('Failed to delete employee.');
      }
    }
  }
}