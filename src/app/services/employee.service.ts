import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = 'http://localhost:8080/api/employees'; // Backend API URL

  constructor() {}

  
  async getAllEmployees() {
    const response = await axios.get(this.baseUrl);
    return response.data;
  }

  
  async addEmployee(employee: any) {
    const response = await axios.post(this.baseUrl, employee);
    return response.data;
  }

  async getEmployeeById(id: number) {
    const response = await axios.get(`${this.baseUrl}/${id}`);
    return response.data;
  }
  
  async updateEmployee(id: number, updatedEmployee: any) {
    const response = await axios.put(`${this.baseUrl}/${id}`, updatedEmployee);
    return response.data;
  }

  
  async deleteEmployee(id: number) {
    await axios.delete(`${this.baseUrl}/${id}`);
  }
}