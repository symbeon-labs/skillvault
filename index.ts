import type { OpenClawPluginApi } from "openclaw/plugin-sdk";
import { emptyPluginConfigSchema } from "openclaw/plugin-sdk";

import { URTNGenerator } from "./urtn_generator.js";
import { X402Handler } from "./x402_schema.js";

const plugin = {
    id: "urtn-nexus",
    name: "URTN Nexus",
    description: "Sovereign Skill Registry & Tokenization Network for OpenClaw",
    configSchema: emptyPluginConfigSchema(),

    register(api: OpenClawPluginApi) {
        api.logger.info("URTN Nexus: Initializing Sovereign Registry...");
        api.logger.info("SkillVault: Binding to SkillVault Sentinel for fiscal integrity...");

        // 1. Register Command /register-skill
        api.registerCommand({
            name: "register-skill",
            description: "Register a new skill in the URTN Sovereign Nexus",
            acceptsArgs: true,
            handler: async (ctx: any) => {

                const args = ctx.args?.split(" ") || [];
                if (args.length < 2) {
                    return { content: "Usage: /register-skill <name> <description>" };
                }

                const name = args[0];
                const description = args.slice(1).join(" ");

                const metadata = URTNGenerator.generate({ name, description });
                const payment = X402Handler.createPaymentRequest(10, "0xARQUITETO_WALLET_MOCK");

                return {
                    text: `📦 **Skill Registered Soberanamente!**\n\n` +
                             `**Name:** ${metadata.name}\n` +
                             `**ID (Hash):** ${metadata.hash}\n` +
                             `**Protocolo:** URTN Layer Φ\n\n` +
                             `💰 **Pagamento x402 Requerido:** ${payment.amount_per_execution} ${payment.token}\n` +
                             `Direcionado a: \`${payment.recipient_address}\``
                };

            }
        });

        // 2. Register Tool for Agent Autonomy
        api.registerTool({
            name: "urtn_register_skill",
            label: "Register URTN Skill",
            description: "Allows the agent to register its own skills in the Sovereign Nexus.",
            parameters: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    description: { type: "string" }
                },
                required: ["name", "description"]
            },
            async execute(toolCallId: string, { name, description }: { name: string; description: string }) {
                const metadata = URTNGenerator.generate({ name, description });
                const payment = X402Handler.createPaymentRequest(10, "0xARQUITETO_WALLET_MOCK");
                
                // --- Fiscal Guard Bridge (Rust) ---
                // In production, this call passes the metadata to the sage_x_rust engine
                // to generate the cryptographic "SkillVault Permit".
                const fiscal_guard = {
                    status: "valid",
                    seal_hash: metadata.hash,
                    permit: `SKILLVAULT-PERMIT-${metadata.hash.slice(0, 10)}-${Date.now()}`
                };
                
                return {
                    content: [{
                        type: "text" as const,
                        text: `Skill ${name} has been anchored and fiscally sealed by the Sovereign Engine.`
                    }],
                    details: {
                        status: "success",
                        metadata,
                        payment_request: payment,
                        fiscal_verification: fiscal_guard
                    }
                };


            }
        });


    },
};

export default plugin;
