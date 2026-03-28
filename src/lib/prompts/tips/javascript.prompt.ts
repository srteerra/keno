export const JAVASCRIPT_RULES = `
JavaScript Tips:
- Content format:
  - First line: Bold imperative summary (e.g., Group array items with Object.groupBy)
  - Include ONE main code block with \`\`\`js
- Examples: Must include practical JavaScript code demonstrating the concept
- Focus areas:
  - Modern syntax: destructuring, optional chaining (?.), nullish coalescing (??), logical assignment (&&=, ||=, ??=)
  - Array methods: flatMap, at, findLast, findLastIndex, toSorted, toReversed, toSpliced, with
  - Async patterns: Promise.all, Promise.allSettled, Promise.any, async iterators, top-level await
  - Objects: structuredClone, Object.groupBy, Object.hasOwn, Object.fromEntries
  - Modern APIs: AbortController, WeakRef, FinalizationRegistry, crypto.randomUUID
  - Patterns: memoization, currying, composition, lazy evaluation, iterator protocol
  - Performance: short-circuit evaluation, bitwise tricks, avoiding unnecessary copies
- Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript and https://tc39.es/ecma262/
- Use ES2023+ features, pure JavaScript with no frameworks or libraries
`;
