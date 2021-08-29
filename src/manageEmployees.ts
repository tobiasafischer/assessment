import { Employee } from './types';
import { getBoss, findEmployee } from './getEmployees';

export default class TreeNode {
	name: string;
	job: string;
	salary: number;
	boss: TreeNode;
	subordinates: TreeNode[];
	constructor(name = null, job = null, salary = null, boss = null) {
		this.name = name;
		this.job = job;
		this.salary = salary;
		this.boss = boss;
		this.subordinates = [];
	}
}

/**
 * Normalizes the provided JSON file and generates a tree of employees.
 *
 * @param {Object[]} employees array of employees
 * @returns {TreeNode}
 */

export const generateCompanyStructure = (employees: Array<Employee>) => {
	console.log('\nNormalizing JSON file...');
	const rootBoss = employees[0]; // getting root
	const root = new TreeNode(rootBoss.name, rootBoss.jobTitle, parseInt(rootBoss.salary), null); // establishing root node
	console.log('Generating employee tree...\n\n');
	employees.slice(1).forEach((employee: Employee) => {
		hireEmployee(root, employee, employee.boss);
	});
	return root;
};

/**
 * Adds a new employee to the team and places them under a specified boss.
 *
 * @param {TreeNode} tree
 * @param {Object} newEmployee
 * @param {string} bossName
 * @returns {void}
 */

export const hireEmployee = (tree: TreeNode, newEmployee: Employee, bossName: string) => {
	// cleaning names with email
	let ind = newEmployee.name.indexOf('@');
	if (ind > -1)
		newEmployee.name = newEmployee.name[0].toUpperCase() + newEmployee.name.substr(1, ind - 1);

	const bossNode: TreeNode = getBoss(tree, newEmployee.name, bossName); // finding boss node
	// establishing employee node
	const employeeNode = new TreeNode(
		newEmployee.name,
		newEmployee.jobTitle,
		parseInt(newEmployee.salary),
		bossNode,
	);
	bossNode.subordinates.push(employeeNode); // adding employee to boss's subordinates
	console.log(
		`[hireEmployee]: Added new employee (${newEmployee.name}) with ${bossName} as their boss\n`,
	);
};

/**
 * Removes an employee from the team by name.
 * If the employee has other employees below them, randomly selects one to take their place.
 *
 * @param {TreeNode} oldBoss
 * @param {TreeNode} newBoss
 * @param {boolean} swappingBoss do we add the old boss as a subordinate to new boss
 * @returns {void}
 */

const reorganizeSubordinates = (oldBoss: TreeNode, newBoss: TreeNode, swappingBoss: boolean) => {
	if (!newBoss) {
		for (let i = 0; i < oldBoss.boss.subordinates.length; i++) {
			let subordinate = oldBoss.boss.subordinates[i];
			if (subordinate.name === oldBoss.name) oldBoss.boss.subordinates.splice(i, 1);
		}
	} else {
		const newBossSubordinates = newBoss.subordinates;
		const oldBossSubordinates = oldBoss.subordinates;
		const oldBossBoss = oldBoss.boss;
		newBoss.boss = oldBoss.boss;
		oldBoss.boss = newBoss;

		if (swappingBoss) {
			/*
			 * if the newBoss and oldBoss is switching positions (not fired)
			 * we reset newBoss' subordinates
			 * then we let the oldBoss assume seniority only to newBoss' former subordinates
			 * then we put the oldBoss as a subordinate to the new boss
			 */
			newBoss.subordinates = [];
			oldBoss.subordinates = newBossSubordinates; // old boss inherets newBoss' former subordinates
			newBoss.subordinates.push(oldBoss); // old boss is made a subordinate of newBoss
		}

		/*
		 * else
		 * newBoss still is the direct report to previous subordinates
		 * oldBoss' former subordinates are inherited into newBoss' subordinates
		 */

		oldBossSubordinates.forEach((subordinate: TreeNode) => {
			if (subordinate.name !== newBoss.name) newBoss.subordinates.push(subordinate); // if not new boss, push subordinate
		});

		// replacing old boss with new boss in old boss' boss' subordinates
		for (let i = 0; i < oldBossBoss.subordinates.length; i++) {
			let subordinate = oldBossBoss.subordinates[i];
			if (subordinate.name === oldBoss.name) oldBossBoss.subordinates.splice(i, 1, newBoss);
		}
	}
};

/**
 * Removes an employee from the team by name.
 * If the employee has other employees below them, randomly selects one to take their place.
 *
 * @param {TreeNode} tree
 * @param {string} name employee's name
 * @returns {void}
 */
export const fireEmployee = (tree: TreeNode, name: string) => {
	const employeeNode = findEmployee(tree, name).cur;

	// if the former employee has subordinates, we want to promote a random subordinate
	if (employeeNode.subordinates.length > 0) {
		const randomEmployee =
			employeeNode.subordinates[Math.floor(Math.random() * employeeNode.subordinates.length)]; // grabbing random employee
		randomEmployee.boss = employeeNode.boss;
		// we want to make former employee's subordinates assimilate into randomEmployee's subordinates
		reorganizeSubordinates(employeeNode, randomEmployee, false);
		console.log(`[fireEmployee]: Fired ${name} and replaced with ${randomEmployee.name}`);
	} else {
		reorganizeSubordinates(employeeNode, null, false);
		console.log(
			`[fireEmployee]: Fired ${name} and they did not have any subordinates to take their place`,
		);
	}
};

/**
 * Promotes an employee one level above their current ranking.
 * The promoted employee and their boss should swap places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {void}
 */
export const promoteEmployee = (tree: TreeNode, employeeName: string) => {
	const employeeNode: TreeNode = findEmployee(tree, employeeName).cur;
	const bossNode = employeeNode.boss;
	reorganizeSubordinates(bossNode, employeeNode, true);
	console.log(`[promoteEmployee]: Promoted ${employeeName} and made ${bossNode.name} his subordinate
    `);
	return employeeNode;
};

/**
 * Demotes an employee one level below their current ranking.
 * Picks a subordinate and swaps places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName the employee getting demoted
 * @param {string} subordinateName the new boss
 * @returns {void}
 */

export const demoteEmployee = (tree: TreeNode, employeeName: string, subordinateName: string) => {
	const replaced: TreeNode = findEmployee(tree, employeeName).cur;
	const replacer: TreeNode = findEmployee(tree, subordinateName).cur;
	const bossBoss = replaced.boss;
	reorganizeSubordinates(replaced, replacer, true);
	replacer.boss = bossBoss;
	replaced.boss = replacer;
	console.log(`[demoteEmployee]: Demoted employee (demoted ${employeeName} and replaced with ${subordinateName})
    `);
};
