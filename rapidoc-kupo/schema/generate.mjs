import yaml from "js-yaml"
import fs from "fs"

const extraDescription = `
  <div style="background: #efefef;padding: 20px 30px;margin-top: 30px;border-left: 5px solid #1940ED;">
    <div style="font-size:12px; font-weight:bold;margin-bottom:10px;">DESCRIPTION</div>
    <div>
      <p>
        A distributed Cardano API powered by Kupo, designed to query indexed and structured blockchain data with speed and precision. Ideal for applications needing fast access to transaction, address, and script-level insights.
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
      Kupo is running in match=* mode, so ALL data is indexed, which means POST, PUT, DELETE methods are disabled. At the link below you can find the official Kupo documentation:
    </p>
    <ul>
      <li>Official Kupo docs: <a href="https://cardanosolutions.github.io/kupo/">https://cardanosolutions.github.io/kupo/</a></li>
    </ul>
  </div>
  <br /><br /><hr /><br />
`

const servers = [
  {
    "url": "https://graph.xray.app/output/services/kupo/mainnet/api/v1",
    "description": "Mainnet"
  },
  {
    "url": "https://graph.xray.app/output/services/kupo/preprod/api/v1",
    "description": "Preprod"
  },
  {
    "url": "https://graph.xray.app/output/services/kupo/preview/api/v1",
    "description": "Preview"
  },
]

try {
  // Fetch the YAML file from the URL
  const koiosYAML = "https://raw.githubusercontent.com/CardanoSolutions/kupo/refs/heads/master/docs/api/nightly.yaml"
  const outputPath = "./schema/openapi.json"
  const response = await fetch(koiosYAML)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const yamlText = await response.text()
  const parsedData = yaml.load(yamlText)

  // Replace title
  parsedData.info.title = "Kupo API"

  // Add servers to the parsed data
  parsedData.servers = servers

  // Add extra description to the info section
  parsedData.info.description = extraDescription + '' + parsedData.info.description

  // Remove all DELETE and PUT methods
  // for (const path in parsedData.paths) {
  //   const methods = Object.keys(parsedData.paths[path])
  //   methods.forEach(method => {
  //     if (method === 'delete' || method === 'put') {
  //       delete parsedData.paths[path][method]
  //     }
  //   })
  // }

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
