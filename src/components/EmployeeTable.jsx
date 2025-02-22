import React from 'react';
import { format } from 'date-fns';

function EmployeeTable({ employees, handleEdit, handleDelete }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            First Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Last Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Birthdate
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Salary
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {employees.length > 0 ? (
                        employees.map(employee => (
                            <tr key={employee.employee_id}>
                                <td className="px-6 py-4 whitespace-nowrap">{employee.first_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{employee.last_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>

                                <td className="px-6 py-4 whitespace-nowrap">
    {employee.birthdate ? 
        (() => {
            try {
                return format(new Date(employee.birthdate), 'MM/dd/yyyy');
            } catch (error) {
                console.error('Invalid date:', employee.birthdate);
                return 'Invalid Date';
            }
        })()
    : ''}
</td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    ${Number(employee.salary).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => handleEdit(employee.employee_id)}
                                        className="text-blue-600 hover:text-blue-900 mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(employee.employee_id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-6 py-4 text-center">
                                No employees found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeTable;
