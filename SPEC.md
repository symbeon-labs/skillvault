# URTN Protocol Specification (v1.0)

> *The economic and identity standard for the Sovereign Agentic Economy.*
> **Built for the SURGE × OpenClaw Hackathon 2026**

## 1. Abstract
This document defines the technical protocol for **URTN-Nexus**, a system for the deterministic registration, cryptographic validation, and atomic resource allocation for autonomous agent capabilities. It solves the problem of non-deterministic skill discovery in decentralized agentic networks.

## 2. The Core Metadata (`core.json`)
Every skill registered in the Vault MUST include a `core.json` manifest.

### 2.1 Schema Definition
```json
{
  "protocol": "SkillVault/1.0",
  "identity": {
    "name": "string",
    "description": "string",
    "version": "semver",
    "author_hash": "sha256_hash"
  },
  "security": {
    "hash": "sha256_hash",
    "zkp_path": "string (optional)",
    "multisig": "boolean"
  },
  "economics": {
    "token": "SURGE",
    "amount_per_execution": "float",
    "recipient": "eth_address",
    "royalty_bps": 300,
    "split": {
      "creator": 8000,
      "governance": 1000,
      "collective": 1000
    }
  }
}
```

## 3. The x402 Payment Protocol
URTN implements the **HTTP 402 Payment Required** standard (x402) for frictionless agent-to-agent micropayments on the `$SURGE` network.

### 3.1 Payment Flow
```
1. Agent calls skill endpoint (POST /execute-skill)
2. Server responds: HTTP 402 + X-Payment-Request header
3. Agent pays on-chain in $SURGE
4. Agent retries with X-402-Payment-Proof: <tx_hash>
5. Server validates proof → executes skill → returns result
```

### 3.2 Required Headers
- `X-Payment-Request`: JSON with `{amount, currency: "SURGE", chain_id, destination}`
- `X-402-Payment-Proof`: The on-chain `tx_hash` from the $SURGE payment
- `X-URTN-Identity`: The `sha256` hash of the skill's `core.json`

## 4. suda-sentinel (Native Engine)
The core engine (**suda-sentinel**) is responsible for the **Blinded Financial Validation**.

### 4.1 Validation Steps
1. **Input**: `core.json` + `L402_headers`.
2. **Hash Check**: Recalculate SHA-256 of `core.json`. Match against `X-URTN-Identity`.
3. **Fiscal Guard**: Verify if `X-URTN-Amount` matches the metadata registry.
4. **Signature**: Emit a temporary "Execution Permit" (signed hash) if valid.

## 5. Storage & Persistence
- **Runtime Persistence**: Abstracted via local encrypted storage providers.
- **Sovereign**: Encrypted `.vault` on portable hardware anchors.
- **On-chain**: Anchor hashes on SURGE network (Base-compatible L2).

## 6. Live Interface
**[Sentinel Interface \u2192](https://symbeon-labs-suda-skills-protocol.vercel.app)**  
Interactive SkillVault terminal for exploring URTN manifests and simulating the x402 payment flow.

> Demo access: open an [Issue on GitHub](https://github.com/symbeon-labs/suda-skills/issues)

---
*Status: PRODUCTION-READY ALPHA*  
*Custodian: [Symbeon Labs](https://github.com/symbeon-labs)*  
*Hackathon: SURGE × OpenClaw 2026*
