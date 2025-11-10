import axiosInstance from '@api/axiosInstance';
import env from '@config/env';
import logger from '@lib/logger';

import type { Employee } from './types';

const mockEmployees: Employee[] = [
  {
    id: 1,
    firstName: 'Ava',
    lastName: 'Johnson',
    email: 'ava.johnson@example.com',
    jobTitle: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'San Francisco, USA',
    salary: 145000,
    hireDate: '2019-04-12',
  },
  {
    id: 2,
    firstName: 'Noah',
    lastName: 'Patel',
    email: 'noah.patel@example.com',
    jobTitle: 'Product Manager',
    department: 'Product',
    location: 'Austin, USA',
    salary: 132000,
    hireDate: '2020-08-24',
  },
  {
    id: 3,
    firstName: 'Mia',
    lastName: 'Garcia',
    email: 'mia.garcia@example.com',
    jobTitle: 'UX Researcher',
    department: 'Design',
    location: 'Toronto, Canada',
    salary: 98000,
    hireDate: '2021-02-15',
  },
  {
    id: 4,
    firstName: 'Ethan',
    lastName: 'Kim',
    email: 'ethan.kim@example.com',
    jobTitle: 'Backend Engineer',
    department: 'Engineering',
    location: 'Remote',
    salary: 138500,
    hireDate: '2018-11-03',
  },
  {
    id: 5,
    firstName: 'Isabella',
    lastName: 'Brown',
    email: 'isabella.brown@example.com',
    jobTitle: 'People Operations Lead',
    department: 'People',
    location: 'London, UK',
    salary: 89000,
    hireDate: '2017-06-18',
  },
];

function normalizeEmployees(data: unknown): Employee[] {
  if (Array.isArray(data)) {
    return data as Employee[];
  }

  if (data && typeof data === 'object' && 'data' in data) {
    const parsed = (data as { data: unknown }).data;
    if (Array.isArray(parsed)) {
      return parsed as Employee[];
    }
  }

  return mockEmployees;
}

export async function fetchEmployees(): Promise<Employee[]> {
  if (!env.apiBaseUrl) {
    // No API configured, return mock data immediately
    return mockEmployees;
  }

  try {
    const response = await axiosInstance.get('/employees');
    return normalizeEmployees(response.data);
  } catch (error) {
    logger.warn('Failed to fetch employees from API. Falling back to mock data.', error);
    return mockEmployees;
  }
}

export default fetchEmployees;
