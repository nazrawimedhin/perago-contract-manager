interface BaseRole {
  id: string;
  name: string;
  description?: string;
}

export interface Role extends BaseRole {
  children: Role[];
  employees: Employee[];
  reportsTo: Role;
}

export interface CreateRole extends BaseRole {
  parentId?: string;
}

export enum Gender {
  Male = "M",
  Female = "F",
}

export interface Employee {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  gender: Gender;
  birthDate: Date;
  hireDate: Date;
  role: Role;
  photo: string;
}

export interface EmployeeResults {
  page: number;
  pages: number;
  limit: number;
  total: number;
  results: Employee[];
}

export interface StatusState {
  title: string;
  message: string;
  type: string;
}
