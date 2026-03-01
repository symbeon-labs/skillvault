# ⚡ Suda-Skills: Sovereign Skill Registry & Tokenization Network

<a href="https://symbeon-labs-suda-skills-protocol.vercel.app" target="_blank">
  <img src="./docs/suda_skills_banner.png" alt="Suda-Skills Protocol — Economic Primitive for Sovereign AI Agents" width="100%"/>
</a>

> **AIs can now negotiate.**
> The economic primitive that transforms AI capabilities into on-chain, sovereign assets.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![OpenClaw Plugin](https://img.shields.io/badge/OpenClaw-Plugin-blueviolet)](https://github.com/openclaw)
[![SURGE Network](https://img.shields.io/badge/$SURGE-Network-2dd4bf)](https://surge.network)
[![Symbeon Labs](https://img.shields.io/badge/Symbeon-Labs-0D0D0D)](https://github.com/symbeon-labs)

## 🌐 Live Demo

**[→ Try the Sentinel Interface](https://symbeon-labs-suda-skills-protocol.vercel.app)**  
Interactive SkillVault terminal — explore skills, inspect URTN manifests, and simulate the x402 payment flow.

> 💬 Demo access available via [GitHub Issues](https://github.com/symbeon-labs/suda-skills/issues)

---

**Suda-Skills** is the economic and identity layer for the Agentic Internet. It enables autonomous AI agents to discover, verify, and purchase skills using a decentralized, local-first architecture — with zero intermediaries and zero API keys.

---

## 🏛️ Core Architecture

| Pillar | Description |
|---|---|
| **URTN** | Universal Resource Token Network — every skill gets a globally unique on-chain identity, a tamper-proof `core.json` signed with SHA-256. |
| **x402 Micropayments** | HTTP-native payment standard. Server responds with `402 Payment Required`. Agent pays in `$SURGE`, retries with `tx_hash` as proof. |
| **OpenClaw Plugin** | Native integration with the OpenClaw agent runtime. Two commands: `/register-skill` and tool `urtn_register_skill`. |
| **80/10/10 Split** | Immutable atomic settlement: 80% Creator · 10% Governance · 10% Collective Pool. |

---

## 🔄 X402 Payment Flow

```
Agent A                    SkillVault Server              $SURGE Network
   │                             │                              │
   │──── POST /execute-skill ───▶│                              │
   │                             │                              │
   │◀─── HTTP 402 ───────────────│                              │
   │     X-Payment-Request:      │                              │
   │     {amount: 2.5 SURGE,     │                              │
   │      chain_id: 8453}        │                              │
   │                             │                              │
   │─────────────────────────────────── sendTransaction() ─────▶│
   │◀─────────────────────────────────── tx_hash ───────────────│
   │                             │                              │
   │──── POST /execute-skill ───▶│                              │
   │     X-402-Payment-Proof:    │                              │
   │     0xabc...def             │                              │
   │                             │                              │
   │◀─── 200 OK + result ────────│                              │
```

---

## 🦀 Tech Stack

- **Backend:** Rust (Axum + Tokio) — sub-millisecond latency, memory-safe x402 middleware
- **SDK:** TypeScript 5.0 — full type-safety, OpenClaw Plugin API
- **Payments:** Ethers.js v6 — Base, Sepolia, $SURGE mainnet
- **Security:** ZKP-ready validation, SHA-256 local node fingerprinting
- **Frontend:** Sentinel Interface — Industrial Terminal UI deployed on Vercel

---

## 🚀 Quick Start

```bash
# Install the Suda-Skills SDK
npm install @symbeon/suda-skills ethers dotenv

# Register your skill
suda register --name "my-skill" --price 2.5 --currency SURGE

# Start listening for x402 challenges
suda vault --sync
# ✓ Skill registered · ✓ X402 middleware active · ✓ SURGE payments flowing
```

### URTN Skill Manifest (`core.json`)

```json
{
  "protocol": "SkillVault/1.0",
  "identity": {
    "name": "deep-translation-v2",
    "version": "1.0.0",
    "author_hash": "<sha256>"
  },
  "economics": {
    "token": "SURGE",
    "amount_per_execution": 2.5,
    "split": { "creator": 80, "governance": 10, "collective": 10 }
  }
}
```

---

## 🛡️ Architecture

```mermaid
flowchart TB
    subgraph LAYER_DEV["🧑‍💻 Layer 0 · Developer"]
        DEV["Developer / Skill Creator"]
        SDK["TypeScript SDK\n@symbeon/suda-skills"]
        PLUGIN["openclaw.plugin.json\nOpenClaw Runtime"]
    end

    subgraph LAYER_IDENTITY["🔐 Layer 1 · URTN Identity"]
        URTN["URTN Generator\nSHA-256 Hash"]
        MANIFEST["core.json Manifest\nprotocol · identity · economics"]
        REGISTRY["SkillVault Registry\nOn-chain Index"]
    end

    subgraph LAYER_ECONOMY["⚡ Layer 2 · x402 Payment Protocol"]
        ENDPOINT["Skill HTTP Endpoint\nPOST /execute-skill"]
        CHALLENGE["HTTP 402 Challenge\nX-Payment-Request: {SURGE, chain_id}"]
        HANDLER["x402 Handler\nRust · Axum · Tokio"]
        PROOF["Payment Proof\nX-402-Payment-Proof: tx_hash"]
    end

    subgraph LAYER_CHAIN["🌐 Layer 3 · $SURGE Settlement"]
        SURGE["$SURGE Network\nBase L2 Compatible"]
        SPLIT_C["💳 Creator\n80%"]
        SPLIT_G["⚖️ Governance\n10%"]
        SPLIT_P["🌐 Collective Pool\n10%"]
    end

    subgraph LAYER_AGENT["🤖 Layer 4 · Consumer Agent"]
        AGENT["AI Agent\nOpenClaw · LangChain · Custom"]
        RESULT["✅ Skill Executed\nResult returned"]
    end

    DEV --> SDK --> PLUGIN
    PLUGIN --> URTN --> MANIFEST --> REGISTRY

    AGENT -->|"1. POST /execute-skill"| ENDPOINT
    ENDPOINT -->|"2. HTTP 402"| CHALLENGE
    CHALLENGE -->|"3. Pay on-chain"| SURGE
    SURGE --> SPLIT_C & SPLIT_G & SPLIT_P
    AGENT -->|"4. Retry + tx_hash"| HANDLER
    HANDLER --> PROOF
    PROOF -->|"5. Validate & Execute"| RESULT

    REGISTRY -.->|"Skill Discovery"| AGENT

    style LAYER_DEV fill:#0f172a,stroke:#2dd4bf,color:#94a3b8
    style LAYER_IDENTITY fill:#0f172a,stroke:#2dd4bf,color:#94a3b8
    style LAYER_ECONOMY fill:#0f172a,stroke:#f59e0b,color:#94a3b8
    style LAYER_CHAIN fill:#0f172a,stroke:#2dd4bf,color:#94a3b8
    style LAYER_AGENT fill:#0f172a,stroke:#2dd4bf,color:#94a3b8
    style HANDLER fill:#1e3a2f,stroke:#2dd4bf,color:#2dd4bf
    style SURGE fill:#1e3a2f,stroke:#2dd4bf,color:#2dd4bf
    style CHALLENGE fill:#2d1e0f,stroke:#f59e0b,color:#f59e0b
```

---

## 🌐 Ecosystem Layer Map

| Layer | Component | Role |
|---|---|---|
| L2 | Symbeon Protocol | Sovereign identity backbone |
| L3 | **suda-skills** | Skill registry & x402 monetization |
| L3 | suda-sentinel | Rust fiscal validation engine |
| x402 | HTTP 402 Standard | Agent micropayment protocol |
| $SURGE | Token | On-chain skill execution currency |
| OpenClaw | Runtime | Agent execution environment |

---

## 🧪 Agent Integration Tests

```bash
# Run the X402 cycle test (with graceful mock fallback)
npx ts-node tests/agent_x402.test.ts

# Expected output:
# ✅ Got 402 Payment Required
# ✅ Micropayment sent: 0xabc...def
# 🎉 TEST PASSED: X402 Cycle Complete!
```

---

## 📦 Repository Structure

```
suda-skills/
├── index.ts              # Main OpenClaw plugin entry
├── index.ptbr.ts         # Portuguese localized version
├── x402_schema.ts        # X402 payment schema & types
├── urtn_generator.ts     # URTN identity hash generator
├── src/
│   └── blockchain.ts     # Wallet & Ethers.js utility
├── tests/
│   └── agent_x402.test.ts # Integration test suite
└── assets/interface/     # Sentinel Interface (Vite + React)
```

---

## 📄 License

MIT — See [`LICENSE`](./LICENSE)

**Built at the SURGE × OpenClaw Hackathon 2026**
**Custodian:** [Symbeon Labs](https://github.com/symbeon-labs) 🛰️
