# SkillVault Technical Specification (v1.0-Alpha)

> *Standardization for the Agent Internet Economic Primitive.*

## 1. Abstract
This document defines the technical protocol for **SkillVault**, an infrastructure for the registration, validation, and monetization of autonomous AI agent skills.

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
SkillVault implements the **HTTP 402 (Payment Required)** status code via custom headers for agent-to-agent transactions.

### 3.1 Required Headers
- `X-402-Payment-Required`: `true`
- `X-SkillVault-Identity`: The `sha256` hash of the skill's `core.json`.
- `X-SkillVault-Amount`: Amount in `$SURGE`.
- `X-SkillVault-Recipient`: The Base chain wallet address.
- `X-SkillVault-Retry-Policy`: Incremental backoff (default: 3 retries).

## 4. SkillVault Sentinel (Native Rust)
The engine (**SkillVault Sentinel**) is responsible for the **Blinded Financial Validation**.

### 4.1 Validation Steps
1. **Input**: `core.json` + `x402_headers`.
2. **Hash Check**: Recalculate SHA-256 of `core.json`. Match against `X-SkillVault-Identity`.
3. **Fiscal Guard**: Verify if `X-SkillVault-Amount` matches the metadata registry via the Sentinel core.
4. **Signature**: Emit a temporary "Execution Permit" (signed hash) if valid.

## 5. Storage & Persistence
- **Local**: `D:\ORBIT\node_modules\openclaw\extensions\urtn-nexus\storage/`
- **Sovereign**: Encrypted `.vault` on portable hardware.
- **On-chain**: Anchor hashes on the **Base Chain** (Dencun-optimized).

---
*Status: STABLE / MASTER*
*Custodian: Symbeon Labs*
