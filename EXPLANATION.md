Instructions on how to install and run your code
-yarn
-yarn start
-yarn test

Any noteworthy logic/style decisions you made? If so, what is your reasoning?

-For the tree itself, I decided to add a Boss node to save time on searching of the boss (no need to iterate through the tree twice instead of just node.boss)

-I decided to implement findEmployee which is the building block to the other functions, this is a BFS algorithm to return the depth and node of the desired employee. I decided to implement a generalized function to utilize the previous 'boss' attribute on the node in tandem with BFS

-I also added a large reorganizing function which is used for demoting, promoting, and firing which (dependent on bool) will:

1. transfer subordinates between eachother
2. replace boss of oldBoss to be newBoss
3. replace boss of newBoss to be oldBoss' boss
4. replace subordinate of oldBoss' boss from oldBoss to newBoss
5. if the old boss will not swap places (firing), the newBoss will inheret the oldBoss' subordinates on top of its own

If you had more time, what improvements would you implement?

I took a little longer than 1.5 hr, however, if I had additional time, I would clean up my functions for readability and efficiency.

Bonus: What is the time complexity of each function in your code?

findEmployee - this is a modified BFS algorithm, but the time complexity remains the same O(|V|) where |V| is # of nodes needed to traverse.. Worst case I traverse all nodes

getBoss - same complexity as findEmployee as the only above function returns a node and I am returning the 'boss' attribute of the node.

getSubordinates - same complexity as findEmployee as the only above function returns a node and I am returning the 'subordinates' attribute of the node.

findLowestEmployee - same complexity as findEmployee as the only above function returns a node, and a maxDepth which is calculated by a simple counter within the findEmployee loop

generateCompanyStructure - This algorithm loops through each employee from the file (O(n)) and then for each employee, it locates the boss through getBoss (O(|V|)). I am not 100% on my time complexity to this level but O(N) + O(|V|) where worst case being O(n^2) if each employee needs to traverse through the entire tree to find their boss

hireEmployee - The time of this function is equal to getBoss. That being said, I did use indexOf which is O(n) as well as substr which is O(n) but both in practice are essentially O(1).\

reorganizeSubordinates - This is a helper function I implemented, this is either O(n) or O(2n) depending on if the boss is being swapped or deleted

fireEmployee - This uses findEmployee which is O(|V|) as well as uses reorganizeSubordinates which is in this case O(n)

promoteEmployee - This uses findEmployee which is O(|V|) as well as uses reorganizeSubordinates which is in this case O(2n)

demoteEmployee - This uses findEmployee twice O(|V|), then uses reorganizeSubordinates which in this case is O(2n)

Bonus: There are two functions that have very similar logic and could be merged into one. Which functions do you think can be merged and why?

To me, it is what I implemented as the new function. I believe that best practice in this case would be findEmployee

getBoss(employeeName) --> findEmployee.boss
getSubordinates(bossName) --> findEmployee.subordinates
