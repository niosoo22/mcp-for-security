"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const zod_1 = require("zod");
const child_process_1 = require("child_process");
const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Usage: nuclei-mcp <nuclei binary>");
    process.exit(1);
}
// Create server instance
const server = new mcp_js_1.McpServer({
    name: "nuclei",
    version: "1.0.0",
});
server.tool("do-nuclei", "Run nuclei with specified URL", {
    url: zod_1.z.string().url().describe("Target URL to run nuclei"),
    //nuclei_args: z.array(z.string()).describe(),
    tags: zod_1.z.nullable(zod_1.z.string().describe("Tags to run nuclei for multiple choise use ,"))
}, async ({ url, tags }) => {
    let nuclei_args = ["-u", url];
    if (tags != null) {
        nuclei_args = [...nuclei_args, "-tags", tags];
    }
    const nuclei = (0, child_process_1.spawn)(args[0], nuclei_args);
    let output = '';
    // Handle stdout
    nuclei.stdout.on('data', (data) => {
        output += data.toString();
    });
    // Handle stderr
    nuclei.stderr.on('data', (data) => {
        output += data.toString();
    });
    // Handle process completion
    return new Promise((resolve, reject) => {
        nuclei.on('close', (code) => {
            if (code === 0) {
                resolve({
                    content: [{
                            type: "text",
                            text: output + "\n nuclei completed successfully"
                        }]
                });
            }
            else {
                reject(new Error(`nuclei exited with code ${code}`));
            }
        });
        nuclei.on('error', (error) => {
            reject(new Error(`Failed to start nuclei: ${error.message}`));
        });
    });
});
server.tool("get-nuclei-tags", "Get Nuclei Tags", {}, async () => {
    return new Promise((resolve, reject) => {
        fetch('https://raw.githubusercontent.com/projectdiscovery/nuclei-templates/refs/heads/main/TEMPLATES-STATS.json')
            .then(response => response.json())
            .then((data) => {
            const tagNames = data.tags.map(tag => tag.name);
            resolve({
                content: [{
                        type: "text",
                        text: JSON.stringify(tagNames)
                    }]
            });
        })
            .catch(error => {
            reject(new Error(`Failed to fetch nuclei tags: ${error.message}`));
        });
    });
});
// Start the server
async function main() {
    const transport = new stdio_js_1.StdioServerTransport();
    await server.connect(transport);
    console.error("nuclei MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
