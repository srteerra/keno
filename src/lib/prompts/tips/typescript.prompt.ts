export const TYPESCRIPT_RULES = `
TypeScript Tips:
- Content format:
  - First line: Bold imperative summary (e.g., Narrow types safely with type guards)
  - Include ONE main code block with \`\`\`ts or \`\`\`tsx
- Examples: Must include working TypeScript code demonstrating the concept
- Focus areas:
  - Utility types: Partial, Required, Pick, Omit, Record, ReturnType, Parameters, Awaited
  - Type narrowing: typeof, instanceof, in, discriminated unions, type guards, assertion functions
  - Generics: constraints, default types, conditional types, infer keyword
  - Modern features: satisfies operator, const type parameters, template literal types, as const
  - Best practices: unknown vs any, strict mode benefits, type vs interface trade-offs, branded types
  - Patterns: mapped types, conditional types, recursive types, builder pattern
- Reference: https://www.typescriptlang.org/docs/ and https://www.typescriptlang.org/cheatsheets/
- Use TypeScript 5+ features and avoid legacy patterns
`;
