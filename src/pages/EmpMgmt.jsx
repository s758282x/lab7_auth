import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Box, InputAdornment } from '@mui/material';
import EmployeeForm from '../components/EmployeeForm'; // Adjust path if needed
import EmployeeTable from '../components/EmployeeTable'; // Adjust path if needed


// Create axios instance with base URL
const api = axios.create({
    baseURL: 'http://localhost:3001'
});

function EmpMgmt() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newEmployee, setNewEmployee] = useState({
        employee_id: '',
        first_name: '',
        last_name: '',
        email: '',
        birthdate: '',
        salary: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const response = await api.get('/employees');
            if (Array.isArray(response.data)) {
                setEmployees(response.data);
                setError('');
            } else {
                throw new Error('Invalid data format received');
            }
        } catch (err) {
            setError(`Failed to fetch employees: ${err.response?.data?.error || err.message}`);
            setEmployees([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDelete = async (employee_id) => {
        try {
            await api.delete(`/employees/${employee_id}`);
            setEmployees(prevEmployees =>
                prevEmployees.filter(employee => employee.employee_id !== employee_id)
            );
            setSuccessMessage('Employee deleted successfully');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError(`Failed to delete employee: ${err.response?.data?.error || err.message}`);
        }
    };

    const handleEdit = (employee_id) => {
        const employeeToEdit = employees.find(emp => emp.employee_id === employee_id);
        if (employeeToEdit) {
            setNewEmployee({
                employee_id: employeeToEdit.employee_id,
                first_name: employeeToEdit.first_name,
                last_name: employeeToEdit.last_name,
                email: employeeToEdit.email,
                birthdate: employeeToEdit.birthdate || '',
                salary: employeeToEdit.salary || ''
            });
            setError('');
        }
    };

    const handleSubmit = async (newEmployeeData) => {
        try {
            let response;
            if (newEmployeeData.employee_id) {
                response = await api.put(`/employees/${newEmployeeData.employee_id}`, newEmployeeData);
                setEmployees(prevEmployees =>
                    prevEmployees.map(emp =>
                        emp.employee_id === newEmployeeData.employee_id ? response.data : emp
                    )
                );
                setSuccessMessage('Employee updated successfully');
            } else {
                response = await api.post('/employees', newEmployeeData);
                setEmployees(prevEmployees => [...prevEmployees, response.data]);
                setSuccessMessage('Employee added successfully');
            }

            setNewEmployee({
                employee_id: '',
                first_name: '',
                last_name: '',
                email: '',
                birthdate: '',
                salary: ''
            });
            setError('');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError(`Failed to ${newEmployeeData.employee_id ? 'update' : 'add'} employee: ${err.response?.data?.error || err.message}`);
        }
    };

    const clearForm = () => {
        setNewEmployee({
            employee_id: '',
            first_name: '',
            last_name: '',
            email: '',
            birthdate: '',
            salary: ''
        });
        setError('');
    };

    return (
        <section className="p-4">
            <h1 className="text-2xl font-bold mb-4">Employee Management</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {successMessage}
                </div>
            )}

            <EmployeeForm
                key={newEmployee.employee_id}
                initialEmployee={newEmployee}
                onSubmit={handleSubmit}
                onCancel={clearForm}

            />

            {loading ? (
                <div className="text-center py-4">Loading...</div>
            ) : (
                <EmployeeTable
                    employees={employees}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            )}
        </section>
    );
}

export default EmpMgmt;
