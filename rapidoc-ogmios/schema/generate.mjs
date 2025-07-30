import yaml from "js-yaml"
import fs from "fs"

const extraDescription = `
  <div style="background: #efefef;padding: 20px 30px;margin-top: 30px;border-left: 5px solid #1940ED;">
    <div style="font-size:12px; font-weight:bold;margin-bottom:10px;">DESCRIPTION</div>
    <div>
      <p>
        This service provides access to the Ogmios API through XRAY/Graph, offering a streamlined way to interact with a Cardano node. It acts as a unified bridge to the node's capabilities, enabling direct, efficient communication for developers and systems that require real-time blockchain integration.
      </p>
    </div>
  </div>
  <div style="background: #efefef;padding: 20px 30px;margin-top: 30px;border-left: 5px solid #1940ED;">
    <div style="font-size:12px; font-weight:bold;margin-bottom:10px;">AUTHENTICATION & HIGHER USAGE LIMITS</div>
    <div>
      <p>For high-traffic applications, we recommend using the paid XRAY/Graph access (set Authorization header in Authentication section):</p>
      <ul>
        <li>XRAY/Graph: <a href="https://xray.app">https://xray.app</a></li>
      </ul>
    </div>
  </div>
  <div style="background: #efefef;padding: 20px 30px;margin-top: 30px;border-left: 5px solid #ff0000;">
    <div style="font-size:12px; font-weight:bold;margin-bottom:10px;">IMPORTANT INFORMATION</div>
    <p>
      Websocket connection is disabled in XRAY/Graph Ogmios service, so you can only use JSON-RPC over HTTP (only stateless queries are supported).
    </p>
    <ul>
      <li>Official JSON-RPC docs: <a href="https://ogmios.dev/getting-started/basics/">https://ogmios.dev/getting-started/basics/</a></li>
    </ul>
  </div>
  <br /><br /><hr /><br />
`

const servers = [
  {
    "url": "https://graph.xray.app/output/services/ogmios/mainnet/api/v1",
    "description": "Mainnet"
  },
  {
    "url": "https://graph.xray.app/output/services/ogmios/preprod/api/v1",
    "description": "Preprod"
  },
  {
    "url": "https://graph.xray.app/output/services/ogmios/preview/api/v1",
    "description": "Preview"
  },
]

try {
  // Fetch the YAML file from the URL
  const koiosYAML = "https://raw.githubusercontent.com/CardanoSolutions/ogmios/refs/heads/master/docs/static/openapi.yaml"
  const outputPath = "./schema/openapi.json"
  const response = await fetch(koiosYAML)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const yamlText = await response.text()
  const parsedData = yaml.load(yamlText)

  // Replace title
  parsedData.info.title = "Ogmios API"

  // Add servers to the parsed data
  parsedData.servers = servers

  // Add extra description to the info section
  parsedData.info.description = extraDescription

  // Remove dashboard
  delete parsedData.paths["/"]["get"]

  // Add security scheme
  parsedData.components.securitySchemes = {
    "bearerAuth": {
      "type": "http",
      "scheme": "bearer",
      "bearerFormat": "JWT",
      "description": ""
    }
  }
  parsedData.security = [
    {
      "bearerAuth": []
    }
  ]

  // Convert the modified data back to JSON
  const stringifiedData = JSON.stringify(parsedData, null, 2)

  // Replace custom styles 
  // const replacedData = stringifiedData.replaceAll("background-color: #222;", "background-color: #f0f0f0b3;")
  const replacedData = stringifiedData

  // Write the modified JSON to the output file
  fs.writeFileSync(outputPath, replacedData)
} catch (error) {
  console.error("Error fetching or parsing YAML:", error)
}

try {
  // Fetch the JSON file from the URL
  const koiosJSON = "https://raw.githubusercontent.com/CardanoSolutions/ogmios/refs/heads/master/docs/static/ogmios.json"
  const outputPath = "./schema/ogmios.json"
  const response = await fetch(koiosJSON)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const jsonText = await response.text()

  // Write the JSON to the output file
  fs.writeFileSync(outputPath, jsonText)
} catch (error) {
  console.error("Error fetching or parsing JSON:", error)
}
