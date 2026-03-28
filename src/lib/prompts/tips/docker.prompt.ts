export const DOCKER_RULES = `
Docker Tips:
- Content format:
  - First line: Bold imperative summary (e.g., Shrink image size with multi-stage builds)
  - Include ONE main code block with \`\`\`bash, \`\`\`dockerfile, or \`\`\`yaml
- Examples: Must include actual Docker commands or Dockerfile/Compose snippets
- Focus areas:
  - Images: multi-stage builds, layer caching, .dockerignore, image size reduction, scratch base
  - Containers: resource limits, health checks, restart policies, environment variables, secrets
  - Volumes and networking: bind mounts, named volumes, custom networks, port mapping
  - Docker Compose: depends_on, profiles, override files, env_file, watch mode
  - CLI shortcuts: useful flags for build, run, exec, logs, inspect, stats, prune
  - Best practices: non-root users, read-only filesystems, minimal base images, BuildKit features
- Reference: https://docs.docker.com/ and https://docs.docker.com/compose/
- Commands must work with Docker 24+ and Docker Compose v2
`;
