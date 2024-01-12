<a href="https://discord.gg/WhZmm46APN"><img alt="Discord" src="https://img.shields.io/discord/852538978946383893?style=for-the-badge&logo=discord&label=Discord&labelColor=%231940ED&color=%233FCB9B"></a>

# XRAY | Graph | Kupmios — Cardano Node Ogmios & Kupo Docker Compose Stack

Kupo / Ogmios (Cardano Node) stack for XRAY | Network ecosystem needs

## Getting Started
``` console
git clone \
  --recurse-submodules \
  https://github.com/xray-network/xray-graph-kupmios.git \
  && cd xray-graph-kupmios
```

<details open>
  <summary><b>MAINNET</b></summary>

Default

``` console
docker compose up -d
```

Advanced usage (Kupo config)

``` console
KUPO_MATCH=* \
KUPO_SINCE=origin \
docker compose up -d
```

</details>
  
<details>
  <summary><b>PREPROD</b></summary>

Default

``` console
NETWORK=preprod docker compose up -d
```

Advanced usage (Kupo config, ports mapping, containers name change)

``` console
NETWORK=preprod \
KUPO_MATCH=* \
KUPO_SINCE=origin \
CARDANO_NODE_PORT=3001 \
OGMIOS_PORT=1338 \
KUPO_PORT=1443 \
docker compose -p preprod up -d
```

</details>

  
<details>
  <summary><b>PREVIEW</b></summary>

Default

``` console
NETWORK=preview docker compose up -d
```

Advanced usage (Kupo config, ports mapping, containers name change)

``` console
NETWORK=preview \
KUPO_MATCH=* \
KUPO_SINCE=origin \
CARDANO_NODE_PORT=3002 \
OGMIOS_PORT=1339 \
KUPO_PORT=1444 \
docker compose -p preview up -d --build
```

</details>

## Endpoints List
  
* Kupo — https://cardanosolutions.github.io/kupo/
* Ogmios — https://ogmios.dev/api/
