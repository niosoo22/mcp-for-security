# MCP for Security Tools

This repository contains Model Context Protocol (MCP) server implementations for various security testing tools, making them accessible through a standardized interface.

## Available Tools

| Tool | Description | Detailed Documentation |
|------|-------------|------------------------|
| FFUF | Web content fuzzing tool for discovering hidden files and directories | [FFUF MCP Documentation](./ffuf-mcp/) |
| SQLmap | Advanced SQL injection detection and exploitation tool | [SQLmap MCP Documentation](./sqlmap-mcp/) |
| Masscan | Fast port scanner for large-scale network discovery | [Masscan MCP Documentation](./masscan-mcp/) |
| Nmap | Comprehensive network scanning tool for service and vulnerability discovery | [Nmap MCP Documentation](./nmap-mcp/) |
| MobSF | Mobile security framework for analyzing mobile applications | [MobSF MCP Documentation](./mobsf-mcp/) |
| Nuclei | Vulnerability scanner using custom templates | [Nuclei MCP Documentation](./nuclei-mcp/) |
| SSLScan | SSL/TLS configuration analyzer for security assessment | [SSLScan MCP Documentation](./sslscan-mcp/) |
| HTTP Headers Security | Analyzer for HTTP security headers against OWASP standards | [HTTP Headers MCP Documentation](./http-headers-security-mcp/) |
| Waybackurls | Tool for retrieving historical URLs from the Wayback Machine | [Waybackurls MCP Documentation](./waybackurls-mcp/) |
| Alterx | Pattern-based wordlist generator for subdomain discovery | [Alterx MCP Documentation](./alterx-mcp/) |
| Certificate Search (crt.sh) | Subdomain discovery tool using SSL certificate logs | [Certificate Search MCP Documentation](./crtsh-mcp/) |
| Amass | Advanced subdomain enumeration and reconnaissance tool | [Amass MCP Documentation](./amass-mcp) |
| httpx | Fast and multi-purpose HTTP toolkit for port scanning. | [Amass MCP Documentation](./httpx-mcp) |

## Quick Reference

### FFUF MCP Server
URL-based fuzzing tool with support for all FFUF command line arguments.

### SQLmap MCP Server
SQL injection testing tool with comprehensive capabilities for vulnerability discovery.

### Masscan MCP Server
Fast port scanning tool for target-based port discovery across networks.

### Nmap MCP Server
Full-featured network scanner with detailed service fingerprinting and vulnerability detection.

### MobSF MCP Server
Mobile application security testing framework for Android, iOS, and Windows applications.

### Nuclei MCP Server
Template-based vulnerability scanner with an extensive library of security checks.

### SSLScan MCP Server
SSL/TLS configuration analyzer for identifying weak ciphers and security misconfigurations.

### HTTP Headers Security MCP
Analyzes HTTP response headers against OWASP security standards with recommendations.

### Waybackurls MCP
Retrieves historical URLs from the Wayback Machine to discover forgotten endpoints.

### Alterx MCP
Generates custom wordlists for subdomain discovery using pattern-based permutations.

### Certificate Search (crt.sh) MCP
Discovers subdomains by querying SSL certificate transparency logs without active scanning.

### Amass MCP
Advanced reconnaissance tool for subdomain enumeration and intelligence gathering with both passive and active modes.

### httpx MCP
Performs high-speed probing of discovered subdomains to validate alive hosts, fetch response details, and enrich reconnaissance data without heavy scanning.

## TO-DO Tools 
- massdns
- gowitness
- ...

## Development

The project uses TypeScript and the Model Context Protocol SDK. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Installation

For installation instructions for each tool, please refer to the individual documentation linked in the table above.

## Usage

Each tool has specific parameters and usage instructions. For detailed information, see the documentation for the specific tool you want to use.

## License

[Your license information here]