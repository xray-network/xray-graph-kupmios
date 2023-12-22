# XRAY | Graph | Kupmios — Cardano Node Ogmios & Kupo Docker Compose Stack

Kupo / Ogmios (Cardano Node) stack for Ray Network ecosystem needs

## Getting Started
``` console
git clone \
  --recurse-submodules \
  https://github.com/ray-network/xray-graph-kupmios.git \
  && cd xray-graph-kupmios
```

<details open>
  <summary><b>mainnet</b></summary>

``` console
KUPO_MATCH=* docker compose up -d
```

</details>
  
<details open>
  <summary><b>preprod</b></summary>

``` console
KUPO_MATCH=* \
NETWORK=preprod \
CARDANO_NODE_PORT=3001 \
OGMIOS_PORT=1338 \
KUPO_PORT=1443 \
docker compose -p preprod up -d --build
```

</details>
  
<details open>
  <summary><b>preview</b></summary>

``` console
KUPO_MATCH=* \
NETWORK=preview \
CARDANO_NODE_PORT=3002 \
OGMIOS_PORT=1339 \
KUPO_PORT=1444 \
docker compose -p preview up -d --build
```

</details>


## Advanced Usage
<details>
  <summary>HAProxy</summary>

By default, all container ports are bound to 127.0.0.1, so these ports are not available outside the server. Replace `127.0.0.1:${OGMIOS_PORT:-8050}:8050` with `${OGMIOS_PORT:-8050}:8050` if you want to open ports for external access.

Routes are resolved using the `HostResolver` header (this is needed for [XRAY | Graph | Output Load Balancer](https://github.com/ray-network/cloudflare-worker-output-load-balancer)). 

Also, time limits on server requests can be disabled (or rather, increased from 30 seconds to 60 minutes) by setting `HAPROXY_JWT_BEARER_TOKEN` in the `.env` file and then passing it over the `BearerResolver` header.

The path to SSL PEM key can be found here `/etc/ssl/xray.pem/`.

Check configuration file here [haproxy.cfg](https://github.com/ray-network/xray-graph-kupmios/blob/main/config/haproxy/haproxy.cfg).

</details>


  
