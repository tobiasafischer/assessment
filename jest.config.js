module.exports = {
	roots: ['<rootDir>/src/test'],
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
	moduleFileExtensions: ['ts', 'js', 'json', 'node'],
	collectCoverage: true,
	clearMocks: true,
	coverageDirectory: 'coverage',
};
