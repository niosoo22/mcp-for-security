# MCP for Security Tools

This repository contains Model Context Protocol (MCP) server implementations for various security testing tools, making them accessible through a standardized interface.

## Tools

### FFUF MCP Server
A server implementation that wraps the FFUF fuzzing tool, allowing it to be used through the MCP interface.

#### Features
- URL-based fuzzing
- Support for all FFUF command line arguments

#### Parameters
- `url`: Target URL to fuzz
- `ffuf_args`: Array of additional FFUF arguments


#### Usage
```bash
ffuf-mcp <ffuf binary>
```

#### Claude Configuration

```json
 "ffuf": {
      "command": "node",
      "args": [
        "/path/to/build/index.js",
        "ffuf"
      ]
    }
```

### SQLmap MCP Server
A server implementation that wraps the SQLmap SQL injection testing tool, allowing it to be used through the MCP interface.

#### Features
- URL-based SQL injection testing
- Support for all SQLmap command line arguments
- Error handling and status reporting
- Comprehensive SQL injection testing capabilities

#### Parameters
- `url`: Target URL to test for SQL injection
- `sqlmap_args`: Array of additional SQLmap arguments


#### Usage
```bash
sqlmap-mcp <sqlmap binary or python3 sqlmap>
```


#### Claude Configuration

```json
 "sqlmap": {
      "command": "node",
      "args": [
        "/path/to/build/index.js",
        "sqlmap"
      ]
    }
```


### Masscan MCP Server
A server implementation that wraps the Masscan tool, allowing it to be used through the MCP interface.

#### Features
- Target based Port Scanning
- Support for all Masscan command line arguments
- Error handling and status reporting

#### Parameters
- `target`: Target ip to scanning ports 
- `port`: Port nubmers to target ip 
- `masscan_args`: Array of additional masscan arguments


#### Usage
```bash
masscan-mcp <masscan>
```


#### Claude Configuration

```json
 "masscan": {
      "command": "node",
      "args": [
        "/path/to/build/index.js",
        "masscan"
      ]
    }
```

## TO-DO Tools 
- amass
- massdns
- gowitness
- nuclei
- httpx
- ...

## Development

The project uses TypeScript and the Model Context Protocol SDK. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License