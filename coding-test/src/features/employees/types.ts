export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  department: string;
  location: string;
  salary: number;
  hireDate: string; // ISO string
}

export type EmployeeResponse = Employee[];
