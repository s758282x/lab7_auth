// Import required libraries
import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bodyParser from 'body-parser';

// Initialize Express app
const app = express();

// Middleware to parse JSON data
app.use(cors());  // Allow cross-origin requests from frontend (React)
app.use(bodyParser.json());  // Parse incoming JSON requests

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: 'database-1.cnqe00p5d1ax.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Timndbpw10!',
    database: 'anthonydb',
    port: 3306, // MySQL port, make sure MySQL is running on this port
});

// Connect to the MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1); // Exit if database connection fails
    }
    console.log('Connected to the MySQL database');
});

// GET route to fetch all employees
app.get('/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: err.message });
        }
        console.log('Fetched employees:', results); // Log the results
        res.json(results);
    });
});

// POST route to create a new employee
app.post('/employees', (req, res) => {
    const { first_name, last_name, email, birthdate, salary } = req.body;
    const query = 'INSERT INTO employees (first_name, last_name, email, birthdate, salary) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [first_name, last_name, email, birthdate, salary], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Respond with the newly created employee data
        res.status(201).json({
            id: results.insertId,
            first_name,
            last_name,
            email,
            birthdate,
            salary,
        });
    });
});

// PUT route to update an existing employee
app.put('/employees/:id', (req, res) => {
    const { first_name, last_name, email, birthdate, salary } = req.body;
    const employeeId = req.params.id;
    const query = 'UPDATE employees SET first_name = ?, last_name = ?, email = ?, birthdate = ?, salary = ? WHERE employee_id = ?';
    db.query(query, [first_name, last_name, email, birthdate, salary, employeeId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            employee_id: employeeId,
            first_name,
            last_name,
            email,
            birthdate,
            salary,
        });
    });
});

// DELETE route to remove an employee
app.delete('/employees/:id', (req, res) => {
    const employeeId = req.params.id;
    db.query('DELETE FROM employees WHERE employee_id = ?', [employeeId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Employee deleted successfully' });
    });
});

// Start the server and listen on a port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
