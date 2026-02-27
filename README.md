# 🏛️ suda-skills

> **The Intelligent Skill Registry for Sovereign Agents.**  
> Register with URTN · Monetize with x402 · Scale with Symbeon Protocol

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![OpenClaw Plugin](https://img.shields.io/badge/OpenClaw-Plugin-blueviolet)](https://github.com/openclaw)
[![Symbeon Labs](https://img.shields.io/badge/Symbeon-Labs-0D0D0D?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PC9zdmc+)](https://github.com/symbeon-labs)

**suda-skills** is an OpenClaw plugin that implements the **URTN (Universal Registry & Tokenization Network)** protocol — a sovereign, cryptographically-secured skill registry for autonomous AI agents.

Agents can self-register cognitive capabilities, generate on-chain identity proofs, and enforce monetization via the **x402** micropayment standard.

---

## ✨ Features

- **Sovereign Skill Registration** — Each skill is assigned a SHA-256 identity hash via URTN.
- **x402 Micropayments** — Native `HTTP 402 Payment Required` support for agent-to-agent billing in `$SURGE` tokens.
- **Fiscal Guard (Rust)** — Integration with `suda-sentinel` (Rust engine) for blinded financial validation.
- **OpenClaw Native** — Exposes `/register-skill` command and `urtn_register_skill` AI tool directly in your agent runtime.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) 18+
- [OpenClaw](https://github.com/openclaw) runtime
- TypeScript 5.0+

### Installation

```bash
git clone https://github.com/symbeon-labs/suda-skills.git
cd suda-skills
npm install
npm run build
```

### Register as an OpenClaw Plugin

Point your `openclaw.plugin.json` at the built output and restart the runtime. The plugin registers two capabilities automatically:

| Capability | Type | Description |
|---|---|---|
| `/register-skill` | Command | Register a skill interactively |
| `urtn_register_skill` | AI Tool | Let the agent self-register autonomously |

---

## 🔑 Protocol: URTN

Every registered skill produces a `core.json` manifest:

```json
{
  "protocol": "SkillVault/1.0",
  "identity": {
    "name": "my-skill",
    "description": "Does something sovereign",
    "version": "1.0.0",
    "author_hash": "<sha256>"
  },
  "economics": {
    "token": "SURGE",
    "amount_per_execution": 10,
    "royalty_bps": 300
  }
}
```

See [`SPEC.md`](./SPEC.md) for the full protocol specification.

---

## 🛡️ Architecture

```
suda-skills (OpenClaw Plugin / TypeScript)
    │
    ├── URTNGenerator   → Generates skill manifests & SHA-256 hashes
    ├── X402Handler     → Creates x402 payment requests
    └── FiscalGuard     → Bridge to suda-sentinel (Rust) for permit issuance
```

The **suda-sentinel** Rust core (separate repo) validates skill execution permits cryptographically before any payment is processed.

---

## 🌐 Ecosystem

| Layer | Component | Role |
|---|---|---|
| L2 | Symbeon Protocol | Sovereign identity backbone |
| L3 | suda-skills | Skill registry & monetization |
| L3 | suda-sentinel | Fiscal validation engine (Rust) |
| x402 | HTTP 402 | Agent micropayment standard |
| $SURGE | Token | On-chain skill execution currency |

---

## 📄 License

MIT — See [`LICENSE`](./LICENSE)

**Custodian:** [Symbeon Labs](https://github.com/symbeon-labs)
