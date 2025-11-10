import { useQuery } from '@tanstack/react-query';

import env from '@config/env';

import fetchEmployees from '../api';
import type { Employee } from '../types';

export const EMPLOYEES_QUERY_KEY = ['employees'];

export function useEmployees() {
    return useQuery<Employee[]>({
        queryKey: EMPLOYEES_QUERY_KEY,
        queryFn: fetchEmployees,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes
        retry: env.isProd ? 2 : 0,
    });
}

export default useEmployees;
