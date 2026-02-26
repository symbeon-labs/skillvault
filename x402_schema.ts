/**
 * x402 Micropayment Schema for Agentic Commerce
 * Integration for SURGE x OpenClaw Hackathon
 */

export interface X402PaymentSchema {
    method: "x402";
    token: "USDC" | "SURGE";
    amount_per_execution: number;
    recipient_address: string;
    royalty_split: boolean;
    retry_policy: {
        max_retries: number;
        delay_ms: number;
    };
    authorization_layer: "nexus_sovereign" | "degov";
}

export class X402Handler {
    static createPaymentRequest(amount: number, recipient: string): X402PaymentSchema {
        return {
            method: "x402",
            token: "SURGE",
            amount_per_execution: amount,
            recipient_address: recipient,
            royalty_split: true,
            retry_policy: {
                max_retries: 3,
                delay_ms: 1000
            },
            authorization_layer: "nexus_sovereign"
        };
    }

    static formatHeaders(schema: X402PaymentSchema) {
        return {
            "x-402-payment-method": schema.method,
            "x-402-token": schema.token,
            "x-402-amount": schema.amount_per_execution.toString(),
            "x-402-recipient": schema.recipient_address,
            "x-402-auth": schema.authorization_layer
        };
    }
}
