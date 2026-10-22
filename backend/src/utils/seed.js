import 'dotenv/config';
import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { CodingQuestion } from '../models/CodingQuestion.js';
import { InterviewQuestion } from '../models/InterviewQuestion.js';
import { Company } from '../models/Company.js';
import { logger } from '../config/logger.js';

const codingQuestions = [
  {
    title: 'Two Sum', slug: 'two-sum', difficulty: 'easy',
    description: 'Given an array of integers and a target, return indices of the two numbers that add up to the target.',
    topics: ['arrays', 'hashmap'], companyTags: ['Google', 'Amazon', 'Adobe'], sheetTags: ['blind_75', 'neetcode'],
    examples: [{ input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'nums[0] + nums[1] == 9' }],
    hints: ['A brute-force is O(n^2). Can you do it in one pass with a hash map?'],
    complexity: { time: 'O(n)', space: 'O(n)' }, order: 1,
  },
  {
    title: 'Valid Parentheses', slug: 'valid-parentheses', difficulty: 'easy',
    description: 'Given a string of brackets, determine if the input string is valid (properly closed and nested).',
    topics: ['stack', 'strings'], companyTags: ['Microsoft', 'Amazon'], sheetTags: ['blind_75', 'neetcode'],
    examples: [{ input: 's = "()[]{}"', output: 'true' }],
    hints: ['Use a stack — push opening brackets, pop and match on closing brackets.'],
    complexity: { time: 'O(n)', space: 'O(n)' }, order: 2,
  },
  {
    title: 'Best Time to Buy and Sell Stock', slug: 'best-time-buy-sell-stock', difficulty: 'easy',
    description: 'Given an array of prices, find the maximum profit from a single buy and a single sell.',
    topics: ['arrays', 'sliding_window'], companyTags: ['Amazon', 'Flipkart'], sheetTags: ['blind_75', 'striver_a2z'],
    examples: [{ input: 'prices = [7,1,5,3,6,4]', output: '5' }],
    hints: ['Track the minimum price seen so far as you iterate.'],
    complexity: { time: 'O(n)', space: 'O(1)' }, order: 3,
  },
  {
    title: 'Merge Intervals', slug: 'merge-intervals', difficulty: 'medium',
    description: 'Given an array of intervals, merge all overlapping intervals.',
    topics: ['arrays'], companyTags: ['Google', 'Meta', 'Uber'], sheetTags: ['blind_75'],
    examples: [{ input: 'intervals = [[1,3],[2,6],[8,10]]', output: '[[1,6],[8,10]]' }],
    hints: ['Sort by start time first, then sweep and merge.'],
    complexity: { time: 'O(n log n)', space: 'O(n)' }, order: 4,
  },
  {
    title: 'Longest Substring Without Repeating Characters', slug: 'longest-substring-without-repeat', difficulty: 'medium',
    description: 'Find the length of the longest substring without repeating characters.',
    topics: ['strings', 'sliding_window', 'hashmap'], companyTags: ['Amazon', 'Adobe', 'Microsoft'], sheetTags: ['blind_75', 'neetcode'],
    examples: [{ input: 's = "abcabcbb"', output: '3', explanation: '"abc" has length 3' }],
    hints: ['Sliding window with a set/map tracking last seen index of each character.'],
    complexity: { time: 'O(n)', space: 'O(min(n, charset))' }, order: 5,
  },
  {
    title: 'Binary Tree Level Order Traversal', slug: 'binary-tree-level-order', difficulty: 'medium',
    description: 'Return the level order traversal of a binary tree\'s node values.',
    topics: ['trees'], companyTags: ['Microsoft', 'Amazon'], sheetTags: ['neetcode', 'striver_a2z'],
    examples: [{ input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' }],
    hints: ['BFS with a queue, process one level (queue size) at a time.'],
    complexity: { time: 'O(n)', space: 'O(n)' }, order: 6,
  },
  {
    title: 'Course Schedule', slug: 'course-schedule', difficulty: 'medium',
    description: 'Given prerequisites as edges, determine if it is possible to finish all courses (detect a cycle).',
    topics: ['graphs'], companyTags: ['Google', 'Meta'], sheetTags: ['blind_75', 'neetcode'],
    examples: [{ input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true' }],
    hints: ['This is cycle detection in a directed graph — try topological sort (Kahn\'s algorithm) or DFS with visited states.'],
    complexity: { time: 'O(V+E)', space: 'O(V+E)' }, order: 7,
  },
  {
    title: 'Coin Change', slug: 'coin-change', difficulty: 'medium',
    description: 'Given coin denominations and an amount, find the fewest number of coins needed to make that amount.',
    topics: ['dp'], companyTags: ['Google', 'Uber', 'Swiggy'], sheetTags: ['blind_75', 'neetcode'],
    examples: [{ input: 'coins = [1,2,5], amount = 11', output: '3', explanation: '5+5+1=11' }],
    hints: ['Bottom-up DP: dp[i] = min coins to make amount i.'],
    complexity: { time: 'O(amount * coins)', space: 'O(amount)' }, order: 8,
  },
  {
    title: 'Word Search', slug: 'word-search', difficulty: 'medium',
    description: 'Given a 2D board and a word, determine if the word exists in the grid via adjacent cells.',
    topics: ['backtracking', 'recursion'], companyTags: ['Microsoft', 'Amazon'], sheetTags: ['striver_a2z'],
    examples: [{ input: 'board=[[A,B,C,E],[S,F,C,S],[A,D,E,E]], word="ABCCED"', output: 'true' }],
    hints: ['DFS + backtracking, mark visited cells temporarily then unmark.'],
    complexity: { time: 'O(m*n*4^L)', space: 'O(L)' }, order: 9,
  },
  {
    title: 'Median of Two Sorted Arrays', slug: 'median-two-sorted-arrays', difficulty: 'hard',
    description: 'Find the median of two sorted arrays in logarithmic time.',
    topics: ['binary_search', 'arrays'], companyTags: ['Google', 'Adobe'], sheetTags: ['blind_75'],
    examples: [{ input: 'nums1=[1,3], nums2=[2]', output: '2.0' }],
    hints: ['Binary search on the smaller array to find the correct partition point.'],
    complexity: { time: 'O(log(min(m,n)))', space: 'O(1)' }, order: 10,
  },
  {
    title: 'Trapping Rain Water', slug: 'trapping-rain-water', difficulty: 'hard',
    description: 'Given elevation heights, compute how much water can be trapped after raining.',
    topics: ['arrays', 'sliding_window'], companyTags: ['Amazon', 'Google'], sheetTags: ['blind_75', 'striver_a2z'],
    examples: [{ input: 'height=[0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' }],
    hints: ['Two pointers from both ends, tracking left-max and right-max.'],
    complexity: { time: 'O(n)', space: 'O(1)' }, order: 11,
  },
  {
    title: 'Implement Trie (Prefix Tree)', slug: 'implement-trie', difficulty: 'medium',
    description: 'Implement a trie with insert, search, and startsWith methods.',
    topics: ['trie'], companyTags: ['Google', 'Amazon'], sheetTags: ['neetcode'],
    examples: [{ input: 'insert("apple"); search("apple")', output: 'true' }],
    hints: ['Each node holds a map of character -> child node, plus an end-of-word flag.'],
    complexity: { time: 'O(L) per op', space: 'O(N*L)' }, order: 12,
  },
];

const interviewQuestions = [
  {
    company: 'Google', topic: 'technical', difficulty: 'medium',
    question: 'How would you design a rate limiter?',
    expectedAnswer: 'Discuss token bucket / sliding window algorithms, distributed considerations (Redis), and trade-offs between accuracy and performance.',
    recruiterPerspective: 'We want to see you reason about trade-offs, not just recite an algorithm name.',
    commonMistakes: ['Jumping straight to code without clarifying scale/requirements', 'Ignoring distributed system considerations'],
    sampleBestAnswer: 'Start by clarifying requirements (requests/sec, per-user vs global), then propose token bucket for burst tolerance, discuss Redis for distributed state, and address edge cases like clock skew.',
    followUpQuestions: ['How would this scale across multiple data centers?', 'What happens if Redis goes down?'],
    tags: ['system design', 'scalability'],
  },
  {
    company: 'Amazon', topic: 'behavioral', difficulty: 'medium',
    question: 'Tell me about a time you disagreed with a teammate. How did you handle it?',
    expectedAnswer: 'A structured STAR-format answer showing you can disagree respectfully, back opinions with data, and commit once a decision is made.',
    recruiterPerspective: 'This maps to our "Have Backbone; Disagree and Commit" leadership principle — we\'re listening for how you handled conflict, not whether you were "right".',
    commonMistakes: ['Vague, non-specific stories', 'Placing all blame on the other person'],
    sampleBestAnswer: 'Describe the specific disagreement, the data/reasoning you brought, how the resolution happened, and what you learned even if the outcome wasn\'t your preference.',
    followUpQuestions: ['What would you do differently next time?'],
    tags: ['leadership principles', 'conflict resolution'],
  },
  {
    company: '', topic: 'dbms', difficulty: 'easy',
    question: 'Explain the difference between a clustered and a non-clustered index.',
    expectedAnswer: 'A clustered index determines the physical order of data in a table (only one per table); a non-clustered index is a separate structure with pointers back to the data (multiple allowed).',
    recruiterPerspective: 'Basic but frequently used to filter out candidates who\'ve only memorized definitions without understanding storage implications.',
    commonMistakes: ['Confusing the two', 'Not mentioning that a table can have only one clustered index'],
    sampleBestAnswer: 'A clustered index physically reorders the table data by the index key — like a phone book sorted by last name. A non-clustered index is like the index at the back of a book, pointing to page numbers.',
    followUpQuestions: ['When would you choose one over the other?'],
    tags: ['databases', 'indexing'],
  },
  {
    company: '', topic: 'oops', difficulty: 'easy',
    question: 'What is the difference between method overloading and method overriding?',
    expectedAnswer: 'Overloading: same method name, different parameters, resolved at compile time. Overriding: subclass redefines a parent method with the same signature, resolved at runtime (polymorphism).',
    recruiterPerspective: 'A fundamentals check — we want crisp, correct definitions with an example.',
    commonMistakes: ['Mixing up compile-time vs runtime resolution'],
    sampleBestAnswer: 'Overloading is having multiple methods with the same name but different signatures in the same class. Overriding is a subclass providing its own implementation of a method already defined in its parent, enabling runtime polymorphism.',
    followUpQuestions: ['Can you override a static method?'],
    tags: ['oops', 'fundamentals'],
  },
  {
    company: 'Microsoft', topic: 'technical', difficulty: 'medium',
    question: 'Walk me through how you would design a URL shortener.',
    expectedAnswer: 'Cover the hashing/encoding scheme for short codes, database schema, read-heavy caching strategy, and handling collisions.',
    recruiterPerspective: 'Classic system design warm-up — looking for structured thinking: requirements, high-level design, then deep dive.',
    commonMistakes: ['Diving into code before clarifying scale (reads vs writes ratio)', 'Forgetting about collision handling'],
    sampleBestAnswer: 'Clarify read-heavy nature, propose base62 encoding of an auto-incrementing ID or a hash with collision retry, use a cache (Redis) in front of the DB for hot links, and discuss custom alias support as an extension.',
    followUpQuestions: ['How would you handle analytics on click counts at scale?'],
    tags: ['system design'],
  },
  {
    company: '', topic: 'hr', difficulty: 'easy',
    question: 'Why do you want to work here?',
    expectedAnswer: 'A genuine, specific answer connecting the candidate\'s goals/interests to something concrete about the company (product, engineering culture, growth stage) — not generic flattery.',
    recruiterPerspective: 'We can tell within 10 seconds if this is a copy-pasted answer. Specificity is what stands out.',
    commonMistakes: ['Generic answers that could apply to any company', 'Only mentioning compensation/prestige'],
    sampleBestAnswer: 'Reference something specific — a product you use, an engineering blog post, a value you admire — and connect it to your own career goals.',
    followUpQuestions: ['What do you know about our engineering culture?'],
    tags: ['hr', 'motivation'],
  },
  {
    company: '', topic: 'os', difficulty: 'medium',
    question: 'Explain the difference between a process and a thread.',
    expectedAnswer: 'A process is an independent execution unit with its own memory space; threads are lightweight units within a process that share the same memory space.',
    recruiterPerspective: 'Fundamentals check that also opens the door to concurrency follow-ups.',
    commonMistakes: ['Not mentioning shared memory as the key distinction'],
    sampleBestAnswer: 'A process has its own isolated memory and resources; threads within the same process share memory, which makes communication faster but requires synchronization to avoid race conditions.',
    followUpQuestions: ['What is a race condition and how do you prevent one?'],
    tags: ['operating systems', 'concurrency'],
  },
  {
    company: 'Adobe', topic: 'javascript', difficulty: 'medium',
    question: 'Explain closures in JavaScript with an example.',
    expectedAnswer: 'A closure is a function that retains access to its lexical scope even after the outer function has returned — commonly used for data privacy and function factories.',
    recruiterPerspective: 'We want a working code example, not just the textbook definition.',
    commonMistakes: ['Definition without a concrete example', 'Confusing closures with plain nested functions'],
    sampleBestAnswer: 'function counter() { let count = 0; return () => ++count; } — the returned function "closes over" count, retaining access to it across calls even though counter() has already returned.',
    followUpQuestions: ['What are common pitfalls with closures in loops?'],
    tags: ['javascript', 'closures'],
  },
];

const companies = [
  {
    name: 'Google', category: 'faang_maang',
    hiringProcess: ['Online Assessment', 'Phone Screen', 'Onsite (4-5 rounds)', 'Hiring Committee'],
    rounds: [
      { name: 'Online Assessment', description: '2 coding problems, medium-hard difficulty', order: 1 },
      { name: 'Phone Screen', description: '1 coding + discussion round', order: 2 },
      { name: 'Onsite', description: '4-5 rounds: coding, system design (for experienced), googleyness/leadership', order: 3 },
    ],
    packageRange: { min: 2500000, max: 4500000, currency: 'INR' },
    eligibility: { minCgpa: 7.5, allowedBranches: ['CSE', 'IT', 'ECE'], batches: [2025, 2026, 2027] },
    preparationTips: ['Focus heavily on DSA — graphs, DP, and trees are heavily tested', 'Practice explaining your thought process out loud'],
    requiredSkills: ['Data Structures', 'Algorithms', 'System Design', 'Problem Solving'],
  },
  {
    name: 'Amazon', category: 'faang_maang',
    hiringProcess: ['Online Assessment', 'Technical Phone Screen', 'Onsite Loop (Bar Raiser included)'],
    rounds: [
      { name: 'Online Assessment', description: '2 coding + work simulation', order: 1 },
      { name: 'Technical Phone Screen', description: 'Coding + Leadership Principles', order: 2 },
      { name: 'Onsite Loop', description: '4-5 rounds including a Bar Raiser round', order: 3 },
    ],
    packageRange: { min: 2000000, max: 3800000, currency: 'INR' },
    eligibility: { minCgpa: 7.0, allowedBranches: ['CSE', 'IT', 'ECE', 'EEE'], batches: [2025, 2026, 2027] },
    preparationTips: ['Prepare 2-3 STAR stories per Leadership Principle', 'Practice medium-level DSA under time pressure'],
    requiredSkills: ['Data Structures', 'Algorithms', 'Leadership Principles', 'OOP Design'],
  },
  {
    name: 'Flipkart', category: 'product_based',
    hiringProcess: ['Online Assessment', 'Technical Interviews (2-3 rounds)', 'Hiring Manager Round'],
    rounds: [
      { name: 'Online Assessment', description: 'DSA + MCQs on CS fundamentals', order: 1 },
      { name: 'Technical Interviews', description: 'DSA + project deep-dive + LLD', order: 2 },
    ],
    packageRange: { min: 1200000, max: 2400000, currency: 'INR' },
    eligibility: { minCgpa: 7.0, allowedBranches: ['CSE', 'IT'], batches: [2025, 2026, 2027] },
    preparationTips: ['Be ready to deep-dive into your resume projects', 'Low-level design (LLD) rounds are common'],
    requiredSkills: ['Data Structures', 'Algorithms', 'Low-Level Design', 'SQL'],
  },
];

const run = async () => {
  await mongoose.connect(env.mongoUri);
  logger.info('Connected to MongoDB for seeding');

  for (const q of codingQuestions) {
    await CodingQuestion.findOneAndUpdate({ slug: q.slug }, q, { upsert: true, new: true, setDefaultsOnInsert: true });
  }
  logger.info(`Seeded ${codingQuestions.length} coding questions`);

  for (const q of interviewQuestions) {
    await InterviewQuestion.findOneAndUpdate(
      { question: q.question, company: q.company },
      q,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }
  logger.info(`Seeded ${interviewQuestions.length} interview questions`);

  for (const c of companies) {
    await Company.findOneAndUpdate({ name: c.name }, c, { upsert: true, new: true, setDefaultsOnInsert: true });
  }
  logger.info(`Seeded ${companies.length} companies`);

  await mongoose.disconnect();
  logger.info('Seeding complete');
  process.exit(0);
};

run().catch((err) => {
  logger.error(`Seeding failed: ${err.message}`);
  process.exit(1);
});
