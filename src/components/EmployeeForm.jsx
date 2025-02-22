import React, { useState } from 'react';
import { Button, TextField, Box, InputAdornment } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function EmployeeForm({ initialEmployee, onSubmit, onCancel }) {
    const [newEmployee, setNewEmployee] = useState(initialEmployee || {
        employee_id: '',
        first_name: '',
        last_name: '',
        email: '',
        birthdate: '',
        salary: ''
    });
    const [error, setError] = useState('');

    const validateForm = () => {
        if (!newEmployee.first_name.trim()) {
            setError('First name is required');
            return false;
        }
        if (!newEmployee.last_name.trim()) {
            setError('Last name is required');
            return false;
        }
        if (!newEmployee.email.trim()) {
            setError('Email is required');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmployee.email)) {
            setError('Invalid email format');
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        onSubmit(newEmployee); // Pass the new employee data to the parent
        clearForm();
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
        onCancel(); // Notify the parent component to clear the form
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexDirection: 'column' }}>
                <TextField
                    label="First Name"
                    variant="outlined"
                    value={newEmployee.first_name}
                    onChange={(e) => setNewEmployee({ ...newEmployee, first_name: e.target.value })}
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                        width: '100%'
                    }}
                    placeholder="First Name"
                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    value={newEmployee.last_name}
                    onChange={(e) => setNewEmployee({ ...newEmployee, last_name: e.target.value })}
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                        width: '100%'
                    }}
                    placeholder="Last Name"
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                        width: '100%'
                    }}
                    placeholder="Email"
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Birthdate"
                        format="MM/dd/yyyy"
                        value={newEmployee.birthdate}
                        onChange={(date) => setNewEmployee({ ...newEmployee, birthdate: date })}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                            width: '100%'
                        }}
                    />
                </LocalizationProvider>
                <TextField
                    label="Salary"
                    variant="outlined"
                    type="number"
                    value={newEmployee.salary}
                    onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                        '& .MuiOutlinedInput-root:focus .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                        width: '100%'
                    }}
                    placeholder="Salary"
                />
            </Box>
            <div className="flex gap-2">
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    {newEmployee.employee_id ? 'Update Employee' : 'Add Employee'}
                </Button>
                {newEmployee.employee_id && (
                    <Button
                        variant="outlined"
                        color="secondary"
                        type="button"
                        onClick={clearForm}
                    >
                        Cancel
                    </Button>
                )}
            </div>
        </form>
    );
}

export default EmployeeForm;
