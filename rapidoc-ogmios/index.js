import express from "express"
import { fileURLToPath } from "url"
import { dirname } from "path"

const HOST = "0.0.0.0"
const PORT = 2500

const app = express()
const router = express.Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
  res.header("Access-Control-Allow-Headers", "Content-Type")
  next()
})

router.get("/", async (req, res) => {
  res.sendFile("./index.html", { root: __dirname })
})

router.get("/openapi.json", async (req, res) => {
  res.sendFile("./schema/openapi.json", { root: __dirname })
})

router.get("/ogmios.json", async (req, res) => {
  res.sendFile("./schema/ogmios.json", { root: __dirname })
})

router.get("/cardano.json", async (req, res) => {
  res.sendFile("./schema/cardano.json", { root: __dirname })
})

app.use('/', router)

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)
