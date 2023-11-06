# RayGraph Kupmios — Cardano Node Ogmios & Kupo Docker Compose Config

Kupo / Ogmios (Cardano Node) stack for Ray Network ecosystem needs

## Getting Started
``` console
git clone \
  --recurse-submodules \
  https://github.com/ray-network/raygraph-kupmios.git \
  && cd raygraph-kupmios
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
OGMIOS_PORT=

KUPO_VERSION=
KUPO_PORT=
KUPO_SINCE=
KUPO_MATCH=
```

</details>

<details>
  <summary>External Accesss</summary>
  
By default, Ogmios and Kupo ports are bound to `127.0.0.1`, so these ports are not available outside the server. Replace `127.0.0.1:${OGMIOS_PORT:-1337}:1337` with `${OGMIOS_PORT:-1337}:1337` and `127.0.0.1:${KUPO_PORT:-1442}:1442` with `${KUPO_PORT:-1442}:1442` if you want to open ports for external access.
 
</details>

<details>
  <summary>Nginx Template</summary>
  
See `nginx.template` for details.
 
</details>


  
