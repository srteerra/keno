export const DEVTOOLS_RULES = `
DevTools Tips:
- Content format:
  - First line: Bold imperative summary (e.g., Profile memory leaks with heap snapshots)
  - NO large code blocks. Use inline code for console methods, keyboard shortcuts in backticks: \`Ctrl+Shift+I\`, \`console.table()\`
  - If a short snippet is essential (1-3 lines), use \`\`\`js
- Examples: Use inline code and short snippets, focus on practical workflows
- Focus areas:
  - Console: console.table, console.group, console.time, console.assert, console.trace, live expressions, $0, $$
  - Sources: conditional breakpoints, logpoints, watch expressions, call stack navigation, snippets
  - Network: filter by type/XHR, throttle presets, block requests, copy as fetch/curl, replay requests
  - Performance: flamegraphs, CPU throttling, layout thrashing detection, coverage tab
  - Elements: force element state, computed styles, event listeners panel, accessibility tree
  - Command palette: \`Ctrl+Shift+P\` / \`Cmd+Shift+P\` shortcuts and useful commands
- Reference: https://developer.chrome.com/docs/devtools/
- Tips must work in Chrome DevTools; note Firefox equivalents when relevant
`;
