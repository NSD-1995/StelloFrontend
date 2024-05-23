import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import './Manageracess.css'

function ManagerAccess(props) {
    const [listReporter, setReporter] = useState([]);
    const [error, setError] = useState(null); 
    const token = Cookies.get('auth');
    const [edit, setEdit] = useState(null);
    const [updateSalary, setUpdateSalary] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/employee/api/users', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setReporter(response.data.EmployeeData);
        })
        .catch(error => {
            console.error(error);
        });
    }, [token]);

    const updateEmployee = (id) => {
        const updatedData = { empSalary: updateSalary };

        axios.put(`http://localhost:3001/employee/api/users/${id}`, updatedData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setReporter(prevState =>
                prevState.map(item =>
                    item._id === id ? { ...item, empSalary: updateSalary } : item
                )
            );
            setEdit(null);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    function HandleLogout() {
        Cookies.remove("auth");
    }

    return (
        <div className="container">
            <h1 className="header">Manager Access</h1>
            <nav className="nav">
                <Link to="/" onClick={HandleLogout} className="button">Logout</Link>
            </nav>
            {error ? (
                <p className="error">{error}</p> 
            ) : (
                listReporter.map((item) => (
                    <div className="employee-container" key={item._id}>
                        <div className="employee-info">
                            <label>Employee Name: </label>
                            <span>{item.empName}</span>
                        </div>
                        <div className="employee-salary">
                            <label>Employee Salary: </label>
                            {edit === item._id ? (
                                <input
                                    type="text"
                                    value={updateSalary}
                                    onChange={(e) => setUpdateSalary(e.target.value)}
                                />
                            ) : (
                                <span>{item.empSalary}</span>
                            )}
                        </div>
                        <div className="employee-actions">
                            <button className="button" onClick={() => {
                                if (edit === item._id) {
                                    updateEmployee(item._id);
                                } else {
                                    setEdit(item._id);
                                    setUpdateSalary(item.empSalary);
                                }
                            }}>
                                {edit === item._id ? 'Save' : 'Update'}
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default ManagerAccess;


