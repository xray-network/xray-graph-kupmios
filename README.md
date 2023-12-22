# XRAY | Graph | Kupmios — Cardano Node Ogmios & Kupo Docker Compose Stack

Kupo / Ogmios (Cardano Node) stack for Ray Network ecosystem needs

## Getting Started
``` console
git clone \
  --recurse-submodules \
  https://github.com/ray-network/xray-graph-kupmios.git \
  && cd xray-graph-kupmios
```
``` console
KUPO_MATCH=* docker compose up -d
```

## Advanced Usage
<details>
  <summary>Variables List</summary>

See `docker-compose.yml` for details.

```
NETWORK=

CARDANO_NODE_VERSION=
OGMIOS_VERSION=
CARDANO_NODE_PORT=
OGMIOS_PORT=

KUPO_VERSION=
KUPO_PORT=
KUPO_SINCE=
KUPO_MATCH=
```

</details>

<details>
  <summary>HAProxy</summary>

By default, all container ports are bound to 127.0.0.1, so these ports are not available outside the server. Replace `127.0.0.1:${OGMIOS_PORT:-8050}:8050` with `${OGMIOS_PORT:-8050}:8050` if you want to open ports for external access.

Routes are resolved using the `HostResolver` header (this is needed for [XRAY | Graph | Output Load Balancer](https://github.com/ray-network/cloudflare-worker-output-load-balancer)). 

Also, time limits on server requests can be disabled (or rather, increased from 30 seconds to 60 minutes) by setting `HAPROXY_JWT_BEARER_TOKEN` in the `.env` file and then passing it over the `BearerResolver` header.

The path to SSL PEM key can be found here `/etc/ssl/xray.pem/`.

Check configuration file here [haproxy.cfg](https://github.com/ray-network/xray-graph-kupmios/blob/main/config/haproxy/haproxy.cfg).

</details>


  
