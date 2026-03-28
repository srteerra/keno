export const SQL_RULES = `
SQL Tips:
- Content format:
  - First line: Bold imperative summary (e.g., Use CTEs to simplify complex queries)
  - Include ONE main code block with \`\`\`sql
- Examples: Must include working SQL demonstrating the concept with realistic table/column names
- Focus areas:
  - Query optimization: indexes, EXPLAIN ANALYZE, query planner, avoiding full table scans
  - JOINs: INNER, LEFT, RIGHT, FULL OUTER, CROSS, self-joins, join conditions
  - Aggregations: GROUP BY, HAVING, COUNT/SUM/AVG/MIN/MAX, FILTER clause
  - Window functions: ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, FIRST_VALUE, LAST_VALUE, PARTITION BY
  - CTEs: WITH clause, recursive CTEs, multiple CTEs chained
  - Subqueries: correlated subqueries, EXISTS vs IN, scalar subqueries
  - NULL handling: IS NULL, COALESCE, NULLIF, NULL in aggregations
  - Data manipulation: INSERT ... ON CONFLICT (upsert), RETURNING clause, bulk inserts
  - Transactions: BEGIN/COMMIT/ROLLBACK, isolation levels, savepoints
  - String and date functions: string operations, date arithmetic, formatting
  - CASE WHEN expressions for conditional logic
  - Pagination: LIMIT/OFFSET vs keyset (cursor) pagination
  - JSON/JSONB operations (PostgreSQL): ->, ->>, jsonb_set, jsonb_agg
  - Constraints and integrity: UNIQUE, CHECK, FOREIGN KEY, deferred constraints
  - Schema design: normalization, denormalization trade-offs, partitioning
- Reference: https://www.postgresql.org/docs/ — default to PostgreSQL syntax, note when something is dialect-specific
- Use realistic examples (users, orders, products tables) — avoid trivial foo/bar examples
`;
