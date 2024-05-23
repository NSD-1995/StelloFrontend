import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CurrentSalary(props) {
    const [listEmployee, setEmployee] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/employee/api/')
            .then(response => {
                console.log(response.data.EmployeeData);
                setEmployee(response.data.EmployeeData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <div>
            <h1>List of Employees Reporting to a Manager</h1>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Employee Name</th>
                        <th style={thStyle}> CurrentSalary</th>
                    </tr>
                </thead>
                <tbody>
                    {listEmployee?.map((item) => (
                        <tr key={item._id} style={trStyle}>
                            <td style={tdStyle}>{item.empName}</td>
                            <td style={tdStyle}>{item.empSalary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
};

const thStyle = {
    borderBottom: '2px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
    backgroundColor: '#f2f2f2'
};

const trStyle = {
    borderBottom: '1px solid #dddddd'
};

const tdStyle = {
    textAlign: 'left',
    padding: '8px'
};

export default CurrentSalary;
