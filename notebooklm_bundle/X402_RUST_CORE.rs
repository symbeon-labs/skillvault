use axum::{
    http::{StatusCode, HeaderMap, Request},
    middleware::Next,
    response::Response,
    Json,
};
use serde::{Serialize, Deserialize};
use std::sync::Arc;

// Estrutura do Desafio x402 (conforme padrão Coinbase/CDP)
#[derive(Serialize)]
struct X402PaymentRequest {
    amount: String,       // Ex: "1000000" (micro-units)
    currency: String,     // Ex: "USDC" ou "$SURGE"
    chain_id: u64,        // Ex: 8453 (Base)
    destination: String,  // Sua carteira Symbeon
    description: String,
}

// 1. O Middleware de Verificação
pub async fn x402_auth_layer<B>(
    headers: HeaderMap,
    req: Request<B>,
    next: Next<B>,
) -> Result<Response, StatusCode> {
    
    // Procura pelo Header de Prova de Pagamento
    let payment_proof = headers
        .get("X-402-Payment-Proof")
        .and_then(|h| h.to_str().ok());

    match payment_proof {
        Some(tx_hash) => {
            // LOGICA DE ALTA PERFORMANCE:
            // Aqui você chamaria um RPC ou Cache (Redis) para validar o hash.
            if verify_on_chain(tx_hash).await {
                // Pagamento Válido: Segue para a execução da Skill
                Ok(next.run(req).await)
            } else {
                // Prova Inválida
                Err(StatusCode::FORBIDDEN)
            }
        }
        None => {
            // DESAFIO X402: Se não há prova, exigimos o pagamento
            let payment_request = X402PaymentRequest {
                amount: "2500000".to_string(), // Ex: 2.5 unidades
                currency: "SURGE".to_string(),
                chain_id: 1337, // Substituir pelo ID da rede correta
                destination: "0xSeuEnderecoSoberano...".to_string(),
                description: "Symbeon Suda-Skills Execution Fee".to_string(),
            };

            let json_payload = serde_json::to_string(&payment_request).unwrap();

            // Constrói a resposta 402 com o Header customizado
            let mut response = Response::builder()
                .status(StatusCode::PAYMENT_REQUIRED)
                .header("X-402-Payment-Request", json_payload)
                .body(axum::body::Body::empty())
                .unwrap();

            Ok(response)
        }
    }
}

// 2. Função de Validação On-Chain (Mock para a Demo)
async fn verify_on_chain(tx_hash: &str) -> bool {
    // Em produção: Usar Alloy/Ethers para checar:
    // 1. Se a TX existe
    // 2. Se o 'to' é sua carteira
    // 3. Se o 'value' está correto
    // 4. Se já foi confirmada (status: 1)
    !tx_hash.is_empty() && tx_hash.starts_with("0x")
}
