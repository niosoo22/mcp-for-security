import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { spawn } from 'child_process';

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Usage: nuclei-mcp <nuclei binary>");
    process.exit(1);
}

// Create server instance
const server = new McpServer({
    name: "nuclei",
    version: "1.0.0",
});

server.tool(
    "do-nuclei",
    "Execute Nuclei, an advanced vulnerability scanner that uses YAML-based templates to detect security vulnerabilities, misconfigurations, and exposures in web applications and infrastructure. Nuclei offers fast scanning with a vast template library covering various security checks.",
    {
        url: z.string().url().describe("Target URL to run nuclei"),
        //nuclei_args: z.array(z.string()).describe(),
        tags: z.nullable(z.string().describe("Tags to run nuclei for multiple choise use ,"))
    },
    async ({ url, tags }) => {
        let nuclei_args = ["-u", url];

        if (tags != null) {
            nuclei_args = [...nuclei_args, "-tags", tags];
        }
        const nuclei = spawn(args[0], nuclei_args);
        let output = '';

        // Handle stdout
        nuclei.stdout.on('data', (data: Buffer) => {
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
                } else {
                    reject(new Error(`nuclei exited with code ${code}`));
                }
            });

            nuclei.on('error', (error) => {
                reject(new Error(`Failed to start nuclei: ${error.message}`));
            });
        });
    },
);

server.tool(
    "get-nuclei-tags",
    "Get Nuclei Tags",
    {},
    async () => {
        return new Promise((resolve, reject) => {
            fetch('https://raw.githubusercontent.com/projectdiscovery/nuclei-templates/refs/heads/main/TEMPLATES-STATS.json')
                .then(response => response.json())
                .then((data: { tags: { name: string }[] }) => {
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
    }
)
// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("nuclei MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});