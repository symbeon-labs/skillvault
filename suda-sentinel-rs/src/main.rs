use serde::{Deserialize, Serialize};
use sha2::{Sha256, Digest};
use anyhow::Result;
use std::io::{self, BufRead};
use chrono::Utc;

#[derive(Debug, Serialize, Deserialize)]
struct UrtnManifest {
    skill_name: String,
    version: String,
    creator_addr: String,
    timestamp: String,
}

#[derive(Debug, Deserialize)]
struct SentinelRequest {
    action: String,
    #[serde(default)]
    params: serde_json::Value,
}

#[derive(Debug, Serialize)]
struct SentinelResponse {
    status: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    data: Option<serde_json::Value>,
    #[serde(skip_serializing_if = "Option::is_none")]
    message: Option<String>,
}

#[tokio::main]
async fn main() -> Result<()> {
    let stdin = io::stdin();
    let reader = stdin.lock();

    for line in reader.lines() {
        let line = match line {
            Ok(l) => l,
            Err(_) => break,
        };

        if line.trim().is_empty() {
            continue;
        }

        let response = match handle_request(&line).await {
            Ok(res) => res,
            Err(e) => SentinelResponse {
                status: "error".to_string(),
                data: None,
                message: Some(e.to_string()),
            },
        };

        println!("{}", serde_json::to_string(&response)?);
    }

    Ok(())
}

async fn handle_request(line: &str) -> Result<SentinelResponse> {
    let req: SentinelRequest = serde_json::from_str(line)?;

    match req.action.as_str() {
        "generate_urtn" => {
            let manifest: UrtnManifest = serde_json::from_value(req.params)?;
            let manifest_str = serde_json::to_string(&manifest)?;
            let mut hasher = Sha256::new();
            hasher.update(manifest_str.as_bytes());
            let hash = hex::encode(hasher.finalize());

            Ok(SentinelResponse {
                status: "success".to_string(),
                data: Some(serde_json::json!({
                    "urtn_hash": hash,
                    "manifest": manifest
                })),
                message: None,
            })
        },
        "emit_x402" => {
            let amount = req.params["amount"].as_str().unwrap_or("5");
            let recipient = req.params["recipient"].as_str().unwrap_or("0xCREATIVE_ARCHON_PROFIT_ADDR");
            
            Ok(SentinelResponse {
                status: "success".to_string(),
                data: Some(serde_json::json!({
                    "challenge": "402 PAYMENT REQUIRED",
                    "headers": {
                        "x-402-payment-method": "x402",
                        "x-402-token": "SURGE",
                        "x-402-amount": amount,
                        "x-402-recipient": recipient,
                        "x-402-auth": "nexus_sovereign"
                    }
                })),
                message: None,
            })
        },
        "calculate_split" => {
            let amount_str = req.params["amount"].as_str().unwrap_or("0");
            let amount: f64 = amount_str.parse().unwrap_or(0.0);
            
            let creator = amount * 0.8;
            let governance = amount * 0.1;
            let collective = amount * 0.1;

            Ok(SentinelResponse {
                status: "success".to_string(),
                data: Some(serde_json::json!({
                    "total": amount,
                    "splits": {
                        "creator": creator,
                        "governance": governance,
                        "collective": collective
                    }
                })),
                message: None,
            })
        },
        "ping" => Ok(SentinelResponse {
            status: "success".to_string(),
            data: Some(serde_json::json!({ "pong": true, "version": "0.1.0-rs" })),
            message: None,
        }),
        _ => anyhow::bail!("Unknown action: {}", req.action),
    }
}
