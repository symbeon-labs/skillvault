# SkillVault Security Policy 🛡️🔐

## 1. Philosophy
Security in SkillVault is built on **Sovereignty**. We assume the cloud is compromised and the local environment is the only "Trust Zone".

## 2. Private Key Management
- **Non-Custodial**: SkillVault never stores private keys in plain text.
- **Vault Isolation**: Keys MUST be stored in the `.vault/.env` file on portable hardware, which is explicitly ignored by Git (`.gitignore`).
- **Memory Safety**: Critical financial calculations are performed in **Rust** to prevent buffer overflows and script-level injection.

## 3. The "Blinded" Financial Layer
To protect agent privacy:
1. Payments are initiated via x402 headers without revealing the agent's full history.
2. The Rust engine validates transactions using only the specific execution hash.
3. No central database tracks agent identity; validation is cryptographically derived.

## 4. Vulnerability Disclosure
If you find a security hole in the SkillVault protocol:
1. **Do NOT** open a public issue.
2. Contact the Architect privately via the Sovereign Nexus channels.
3. We operate a "Sovereign Bug Bounty" paid in project equity or tokens.

## 5. Threat Model
| Threat | Mitigation |
|---|---|
| Cloud Seizure | Local-first nomadic runtime |
| Double-spending | Rust-based Fiscal Guard validation |
| Metadata Tampering | SHA-256 Anchoring of manifests |

---
*Protect the Truth. Protect the Agent.*
