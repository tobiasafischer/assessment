import { getBoss, getSubordinates, findLowestEmployee } from '../getEmployees';
import { generateCompanyStructure } from '../manageEmployees';
import { Employee } from '../types';
import { employees } from '../employees.json';
const tree = generateCompanyStructure(employees as Array<Employee>);

test('Boss of Sarah to be null', () => {
	expect(getBoss(tree, 'Sarah', '')).toBe(null);
});

test('Boss of Xavier to be Sarah', () => {
	expect(getBoss(tree, 'Xavier', '').name).toBe('Sarah');
});

test('Subordinates of Sarah to be Xavier, Alicia', () => {
	const subs = [];
	getSubordinates(tree, 'Sarah').forEach((sub) => {
		subs.push(sub.name);
	});
	expect(JSON.stringify(subs)).toBe('["Xavier","Alicia"]');
});

test('Lowest employee to be Nick and depth to be 3', () => {
	expect(JSON.stringify(findLowestEmployee(tree, 'Nick'))).toBe(
		JSON.stringify({ max: 3, employee: 'Nick' }),
	);
});
