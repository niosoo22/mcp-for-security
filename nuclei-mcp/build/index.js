"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const zod_1 = require("zod");
const pty = require('node-pty');
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
server.tool("do-nuclei", "Execute Nuclei, an advanced vulnerability scanner that uses YAML-based templates to detect security vulnerabilities, misconfigurations, and exposures in web applications and infrastructure. Nuclei offers fast scanning with a vast template library covering various security checks.", {
    url: zod_1.z.string().url().describe("Target URL to run nuclei"),
    //nuclei_args: z.array(z.string()).describe(),
    tags: zod_1.z.array(zod_1.z.string()).optional().describe("Tags to run nuclei for multiple choise use ,")
}, async ({ url, tags }) => {
    const nucleiArgs = ["-u", url, "-silent"];
    if (tags && tags.length > 0) {
        nucleiArgs.push("-tags", tags.join(","));
    }
    let output = '';
    const nuclei = pty.spawn(args[0], nucleiArgs, {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.cwd(),
        env: process.env
    });
    nuclei.on('data', function (data) {
        output += data.toString();
        console.log(data.toString());
    });
    // Handle process completion
    return new Promise((resolve, reject) => {
        nuclei.on('close', function (code) {
            if (code === 0 || typeof code === "undefined") {
                output = removeAnsiCodes(output);
                const resolveData = {
                    content: [{
                            type: "text",
                            text: output
                        }]
                };
                resolve(resolveData);
            }
            else {
                reject(new Error(`nuclei exited with code ${code}`));
            }
        });
        nuclei.on('error', function (error) {
            if (typeof error.cause !== "undefined") {
                reject(new Error(`Error to start nuclei: ${error.cause}`));
            }
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
function removeAnsiCodes(input) {
    return input.replace(/\x1B\[[0-9;]*m/g, '');
}
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
