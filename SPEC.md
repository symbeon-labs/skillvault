# URTN-Nexus Technical Specification (v1.0-Alpha)

> *Standardization for the Sovereign Agentic Economy.*

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

## 3. The L402 Payment Protocol
URTN-Nexus implements a state-machine compatible with the **L402 (Lightning/HTTP 402)** standard for agent-to-agent transactions.

### 3.1 Required Headers
- `X-L402-Payment-Required`: `true`
- `X-URTN-Identity`: The `sha256` hash of the skill's `core.json`.
- `X-URTN-Amount`: Amount in `$SURGE`.
- `X-URTN-Recipient`: The Network Settlement wallet address.
- `X-URTN-Retry-Policy`: Incremental backoff (default: 3 retries).

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
- **On-chain**: Anchor hashes on optimized Layer 2 settlement chains.

---
*Status: STABLE / MASTER*
*Custodian: Symbeon Labs*
