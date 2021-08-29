import TreeNode from './manageEmployees';

/**
 * Performs breadth first search on tree
 *
 * @params {string} targetName
 * @params {TreeNode} employees array of employees
 * @returns {TreeNode}
 */
export const findEmployee = (employees: TreeNode, targetName: string) => {
	let queue = [employees];
	let count = 0;
	while (queue.length) {
		let size = queue.length;
		for (let i = size; i > 0; i--) {
			let cur: TreeNode = queue.shift();
			if (cur.name === targetName) return { cur, count };
			if (cur.subordinates.length > 0) {
				queue.push(...cur.subordinates);
			}
		}
		count++;
	}
};

/**
 * Given an employee, will find the node above (if any).
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @param {string} bossName
 * @returns {TreeNode}
 */
export const getBoss = (tree: TreeNode, employeeName: string, bossName: string) => {
	let boss = null;
	if (bossName !== '') boss = findEmployee(tree, bossName).cur;
	else boss = findEmployee(tree, employeeName).cur.boss;
	if (!boss) console.log(`[getBoss]: ${employeeName} does not have a boss`);
	else console.log(`[getBoss]: ${employeeName}'s boss is ${boss.name}`);
	return boss;
};
/**
 * Given an employee, will find the nodes directly below (if any).
 * Notice how it returns possibly several subordinates.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode[]}
 */
export const getSubordinates = (tree: TreeNode, employeeName: string) => {
	const subordinates = findEmployee(tree, employeeName).cur.subordinates;
	console.log(`[getSubordinate]: ${employeeName}'s subordinates are ${subordinates}`);
	return subordinates;
};

/**
 * EXTRA CREDIT:
 * Finds and returns the lowest-ranking employee and the tree node's depth index.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
export const findLowestEmployee = (tree: TreeNode, employeeName: string) => {
	const low = findEmployee(tree, employeeName);
	return { max: low.count, employee: low.cur.name };
};
