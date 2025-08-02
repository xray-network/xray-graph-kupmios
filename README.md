<a href="https://discord.gg/WhZmm46APN"><img alt="Discord" src="https://img.shields.io/discord/852538978946383893?style=for-the-badge&logo=discord&label=Discord&labelColor=%231940ED&color=%233FCB9B"></a>

# XRAY/Graph Kupmios — Dockerized Kupo & Ogmios (Cardano Node)

XRAY/Graph Kupmios is a tool for fast and predictable deployment of [Ogmios](https://ogmios.dev) (Cardano Node) and [Kupo](https://cardanosolutions.github.io/kupo/) (customizable Cardano blockchain indexer) stack in a docker environment. Used in the [XRAY/Graph](https://xray.app/) distributed Cardano API provider.

## Getting Started

### Prepare Installation

``` console
git clone \
  --recurse-submodules \
  https://github.com/xray-network/xray-graph-kupmios.git \
  && cd xray-graph-kupmios
```

### MAINNET

``` console
NETWORK=mainnet \
docker compose -f docker-compose.yaml -p kupmios-mainnet up -d --build
```

### PREPROD

``` console
NETWORK=preprod \
OGMIOS_PORT=1338 \
CARDANO_PORT=3001 \
RAPIDOC_KUPO_PORT=2601 \
RAPIDOC_OGMIOS_PORT=2501 \
docker compose -f docker-compose.yaml -p kupmios-preprod up -d --build
```

### PREVIEW

``` console
NETWORK=preview \
OGMIOS_PORT=1339 \
CARDANO_PORT=3002 \
RAPIDOC_KUPO_PORT=2602 \
RAPIDOC_OGMIOS_PORT=2502 \
docker compose -f docker-compose.yaml -p kupmios-preview up -d --build
```

## Advanced Usage

<details>
  <summary><b>Restoring From Snapshot</b></summary>
  
## Step 0: Installing Dependencies

Installing dependepcies (if needed):
``` console
sudo apt update && sudo apt install zstd jq wget -y
```

## Step 1: Restoring Cardano Node DB

1. Enter root dir:
``` console
cd xray-graph-kupmios
```

2. Run docker compose up (clean run):
  ``` console
NETWORK=mainnet \
docker compose -f docker-compose.yaml -p kupmios-mainnet up -d --build
```

3. Stop cardano-node-ogmios container:
``` console
docker stop *container_id*
```

4. Download lates cardano-node-ogmios db:
``` console
wget -c -O - "https://downloads.csnapshots.io/mainnet/$(wget -qO- https://downloads.csnapshots.io/mainnet/mainnet-db-snapshot.json | jq -r .[].file_name)" | zstd -d -c | tar -x -C ./snapshots
```

5. Get node_db volume id:
``` console
docker volume ls
```

6. Remove cardano-node-ogmios db and copy downloaded:
```
sudo rm -rf /var/lib/docker/volumes/*cardano-node-ogmios_node_db-volume-id*/_data \
sudo mv ./snapshots/db /var/lib/docker/volumes/*cardano-node-ogmios_node_db-volume-id*/_data
```

7. Start cardano-node-ogmios container:

``` console
docker start *container_id*
```

</details>

<details>
  <summary><b>Kupo Configuration</b></summary>

``` console
KUPO_MATCH_PREVIEW=* \
KUPO_SINCE_PREVIEW=origin \
docker compose --profile preview up -d
```

</details>

<details>
  <summary><b>TypeScript Client</b></summary>
  
We recommend to use `cardano-kupo-client`. Visit [cardano-kupo-client](https://github.com/xray-network/cardano-kupo-client) repo for more information.
We recommend to use `cardano-ogmios-client`. Visit [cardano-ogmios-client](https://github.com/xray-network/cardano-ogmios-client) repo for more information.

</details>

<details>
  <summary><b>Using in Graph Cluster (Traefik Reverse Proxy)</b></summary>

1. Clone and run Traefik:
``` console
git clone https://github.com/xray-network/traefik-docker.git \
&& cd traefik-docker \
&& docker compose up -d
```

2. Set `BEARER_RESOLVER_TOKEN` and `docker-compose.xray.yaml`:
``` console
NETWORK=mainnet \
BEARER_RESOLVER_TOKEN=your_access_token \
docker compose -f docker-compose.xray.yaml -p kupmios-mainnet up -d --build
```

</details>

## Documentation

* Kupo — https://cardanosolutions.github.io/kupo/
* Kupo Rapidoc Playground (OpenAPI Schema) — https://graph.xray.app/output/services/kupo/mainnet/api/v1/
* Kupo OpenAPI Schema (JSON) — https://graph.xray.app/output/services/kupo/mainnet/api/v1/openapi.json
* Kupo TypeScript Client — https://github.com/xray-network/cardano-kupo-client
* Ogmios — https://ogmios.dev/
* Ogmios Rapidoc Playground (OpenAPI Schema) — https://graph.xray.app/output/services/ogmios/mainnet/api/v1/
* Ogmios OpenAPI Schema (JSON) — https://graph.xray.app/output/services/ogmios/mainnet/api/v1/openapi.json
* Ogmios TypeScript Client — https://github.com/xray-network/cardano-ogmios-client
* Traefik — https://traefik.io/traefik
