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
		name: 'Jeb',
		jobTitle: 'CTO',
		boss: 'Sarah',
		salary: '0',
	};
	console.log('\n\n\n\n\n\n\n\n');
	hireEmployee(tree, employeeToHire, 'Sarah');
	fireEmployee(tree, 'Alicia');
	promoteEmployee(tree, 'Jared');

	demoteEmployee(tree, 'Xavier', 'Maria');
	console.log('\n');
	getBoss(tree, 'Bill', 'Jared');
	getSubordinates(tree, 'Maria');
	console.log('\n');
}

main();
