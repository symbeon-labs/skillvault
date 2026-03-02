# CONTRIBUTING to SkillVault

Thank you for your interest in contributing to SkillVault — the first economic primitive for the Agent Internet.

## How to Contribute

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feat/your-feature-name`
3. **Implement** your changes following the existing code style
4. **Test** your implementation locally with OpenClaw
5. **Submit** a Pull Request with a clear description

## Requirements

- Node.js 18+
- OpenClaw installed locally
- A Base chain wallet (for x402 testing)

## Key Principles

- **Privacy First**: No cloud dependencies. All core logic must work offline.
- **Open Protocol**: The `core.json` schema and x402 integration must remain open and forkable.
- **No Vendor Lock-in**: SkillVault should be integrable with any agent runtime, not just OpenClaw.

## Code Structure

```
skillvault/
├── index.ts            ← OpenClaw plugin entry point
├── urtn_generator.ts   ← core.json manifest generator
├── x402_schema.ts      ← x402 micropayment schema
├── .env.example        ← Environment variable template
└── assets/             ← Visual identity
```

## Reporting Issues

Open a GitHub Issue with clear steps to reproduce. Include your OpenClaw version and OS.
