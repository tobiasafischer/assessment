import { employees } from './employees.json';
import { findEmployee, getBoss, getSubordinates, findLowestEmployee } from './getEmployees';
import {
	generateCompanyStructure,
	hireEmployee,
	fireEmployee,
	promoteEmployee,
	demoteEmployee,
} from './manageEmployees';
import { Employee } from './types';

// Main code goes here
function main() {
	const tree = generateCompanyStructure(employees as Array<Employee>);
	const employeeToHire: Employee = {
		name: 'Tobias',
		jobTitle: 'CTO',
		boss: 'Sarah',
		salary: '0',
	};
	hireEmployee(tree, employeeToHire, 'Sarah');
	fireEmployee(tree, 'Xavier');
	promoteEmployee(tree, 'Nick');
}

main();
