import plugin from "../index.ts";

async function testOpenClawPlugin() {
    console.log("--- 🧪 Testing OpenClaw Plugin Compatibility ---");

    // Mock OpenClaw API
    const mockApi: any = {
        logger: {
            info: (msg: string) => console.log(`[LOG] ${msg}`),
            error: (msg: string) => console.error(`[ERR] ${msg}`),
        },
        registerCommand: (cmd: any) => {
            console.log(`[MOCK] Registered Command: /${cmd.name}`);
        },
        registerTool: (tool: any) => {
            console.log(`[MOCK] Registered Tool: ${tool.name}`);
            // Save tool for execution test
            (plugin as any)._testTool = tool;
        }
    };

    // 1. Test Registration
    plugin.register(mockApi);

    // 2. Test Tool Execution (urtn_register_skill)
    const tool = (plugin as any)._testTool;
    if (tool && tool.execute) {
        console.log("\n[Executing Tool: urtn_register_skill]");
        const result = await tool.execute("test-id", {
            name: "Translation Engine",
            description: "Advanced AI translation skill"
        });

        console.log("Tool Result:", JSON.stringify(result, null, 2));

        if (result.details.status === "success" && result.details.metadata.hash) {
            console.log("\n✅ SUCCESS: OpenClaw Tool returned valid URTN metadata.");
        } else {
            console.error("\n❌ FAILURE: Tool result invalid.");
            process.exit(1);
        }
    } else {
        console.error("\n❌ FAILURE: Tool not registered properly.");
        process.exit(1);
    }
}

testOpenClawPlugin().catch(err => {
    console.error(err);
    process.exit(1);
});
