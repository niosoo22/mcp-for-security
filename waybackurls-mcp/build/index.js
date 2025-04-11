"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const zod_1 = require("zod");
const child_process_1 = require("child_process");
const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Usage: waybackurls-mcp <waybackurls binary>");
    process.exit(1);
}
// Create server instance
const server = new mcp_js_1.McpServer({
    name: "sslscan",
    version: "1.0.0",
});
server.tool("do-waybackurls", "Execute waybackurls", {
    target: zod_1.z.string().url().describe("Target URL to scan (must begin with https:// for proper SSL/TLS scanning)"),
    noSub: zod_1.z.string().nullable().describe("Don't include subdomains of the target domain"),
}, async ({ target, noSub }) => {
    const waybackurls = (0, child_process_1.spawn)(args[0], [...(noSub ? ['--no-subs'] : []), target]);
    let output = '';
    // Handle stdout
    waybackurls.stdout.on('data', (data) => {
        output += data.toString();
    });
    // Handle stderr
    waybackurls.stderr.on('data', (data) => {
        output += data.toString();
    });
    // Handle process completion
    return new Promise((resolve, reject) => {
        waybackurls.on('close', (code) => {
            if (code === 0) {
                resolve({
                    content: [{
                            type: "text",
                            text: output + "\n waybackurls completed successfully"
                        }]
                });
            }
            else {
                reject(new Error(`waybackurls exited with code ${code}`));
            }
        });
        waybackurls.on('error', (error) => {
            reject(new Error(`Failed to start waybackurls: ${error.message}`));
        });
    });
});
// Start the server
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    console.error("waybackurls MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
