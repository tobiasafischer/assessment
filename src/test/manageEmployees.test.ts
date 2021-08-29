import {
	generateCompanyStructure,
	hireEmployee,
	fireEmployee,
	promoteEmployee,
	demoteEmployee,
} from '../manageEmployees';
import { findEmployee } from '../getEmployees';
import { Employee } from '../types';
import { employees } from '../employees.json';
const tree = generateCompanyStructure(employees as Array<Employee>);
test("Expects new employee Tobias' boss to be Sarah", () => {
	const employeeToHire: Employee = {
		name: 'Tobias',
		jobTitle: 'CTO',
		boss: 'Sarah',
		salary: '0',
	};
	hireEmployee(tree, employeeToHire, 'Sarah');
	expect(findEmployee(tree, 'Tobias').cur.boss.name).toBe('Sarah');
});

test('Expects fired employee to not exist', () => {
	fireEmployee(tree, 'Jared');
	expect(findEmployee(tree, 'Jared')).toBe(undefined);
});

test('Expects Xavier to be promoted and replace Sarah', () => {
	expect(promoteEmployee(tree, 'Nick').boss.name).toBe('Xavier');
});

test('Expects Xavier to be promoted and replace Sarah', () => {
	demoteEmployee(tree, 'Nick', 'Bill');
	expect(findEmployee(tree, 'Nick').cur.boss.name).toBe('Bill');
});
