import { Component, signal, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-edit-employee',
  standalone: true,
  imports: [FormsModule ,],
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css'],
})
export class AddEditEmployeeComponent {
  employee = signal<any>({ name: '', email: '', department: '' });
  isEditMode = signal<boolean>(false);
  errorMessage = signal<string>('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      await this.loadEmployee(Number(id));
    }
  }

  async loadEmployee(id: number) {
    try {
      this.employee.set(await this.employeeService.getEmployeeById(id));
    } catch (error) {
      this.errorMessage.set('Failed to load employee details.');
    }
  }

  async onSubmit() {
    try {
      if (this.isEditMode()) {
        await this.employeeService.updateEmployee(this.employee().id, this.employee());
      } else {
        await this.employeeService.addEmployee(this.employee());
      }
      this.router.navigate(['/']);
    } catch (error) {
      this.errorMessage.set('Failed to save employee details.');
    }
  }
}