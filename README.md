<a href="https://discord.gg/WhZmm46APN"><img alt="Discord" src="https://img.shields.io/discord/852538978946383893?style=for-the-badge&logo=discord&label=Discord&labelColor=%231940ED&color=%233FCB9B"></a>

# XRAY/Graph Kupmios — Dockerized Kupo & Ogmios (Cardano Node) stack

XRAY/Graph Kupmios is a tool for fast and predictable deployment of [Haproxy](https://www.haproxy.org/) (TCP/HTTP Load Balancer), [Ogmios](https://ogmios.dev) (Cardano Node), and [Kupo](https://cardanosolutions.github.io/kupo/) (customizable Cardano blockchain indexer) stack in a docker environment. Used in the [XRAY/Graph](https://xray.app/) distributed Cardano API provider.

## Getting Started
### Prepare Installation

``` console
git clone \
  --recurse-submodules \
  https://github.com/xray-network/xray-graph-kupmios.git \
  && cd xray-graph-kupmios
```
``` console
cp .env.example .env
```

### Build and Run via Docker Compose

> You can combine profiles to run multiple networks on the same machine: `docker compose --profile mainnet --profile preprod --profile preview up -d`

<details open>
  <summary><b>MAINNET</b></summary>

Default

``` console
docker compose --profile mainnet up -d
```

Advanced usage (Kupo config)

``` console
KUPO_MATCH_MAINNET=* \
KUPO_SINCE_MAINNET=origin \
docker compose --profile mainnet up -d
```

</details>
  
<details>
  <summary><b>PREPROD</b></summary>

Default

``` console
docker compose --profile preprod up -d
```

Advanced usage (Kupo config)

``` console
KUPO_MATCH_PREPROD=* \
KUPO_SINCE_PREPROD=origin \
docker compose --profile preprod up -d
```

</details>

  
<details>
  <summary><b>PREVIEW</b></summary>

Default

``` console
docker compose --profile preview up -d
```

Advanced usage (Kupo config)

``` console
KUPO_MATCH_PREVIEW=* \
KUPO_SINCE_PREVIEW=origin \
docker compose --profile preview up -d
```

</details>

## Documentation

* Kupo — https://cardanosolutions.github.io/kupo/
* Ogmios — https://ogmios.dev/
* Haproxy — https://www.haproxy.org/
