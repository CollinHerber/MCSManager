# Local self-hosted Docker deployment

This fork can build the MCSManager web panel and daemon directly from source. No prebuilt `githubyumao/mcsmanager-web` or `githubyumao/mcsmanager-daemon` image is required.

## Repository layout used on the Windows host

```text
D:\MCS\
├── docker-compose.yml              # active deployment
├── Panel\                          # persistent web data and logs
├── daemon\                         # persistent daemon data and logs
├── <instance UUIDs>\               # game server workspaces
└── Source\
    ├── MCSManager\                 # this repository
    └── MCMS-Script\                # marketplace/template fork
```

Source repositories are deliberately separated from runtime data. Rebuilding or resetting a source checkout does not touch users, daemon configuration, logs, or game instances.

## Build and start

From this repository:

```bash
cd deploy
cp .env.example .env
docker compose -f docker-compose.windows.yml build --pull
docker compose -f docker-compose.windows.yml up -d
docker compose -f docker-compose.windows.yml ps
```

The active machine currently keeps its canonical Compose file at `D:\MCS\docker-compose.yml`; it uses the same build contexts and volume layout.

## Marketplace fork

The Script fork is mounted read-only at:

```text
/opt/mcsmanager/web/public/self-hosted-market
```

Set the panel's marketplace source to:

```text
public/self-hosted-market/market-v2.json
```

Changes to `MCMS-Script/market-v2.json` are then served locally without rebuilding the panel image. Browser refresh/cache behavior still applies.

## Cloudflare Tunnel

The existing tunnel routes remain outside this Compose project:

- `mcs.collinthedev.com` → `http://host.docker.internal:23333`
- `mcs-daemon.collinthedev.com` → `http://host.docker.internal:24444`

The MCSManager node address remains `wss://mcs-daemon.collinthedev.com:443` because browsers connect directly to the daemon for terminals and file operations.

## Updating from upstream

Both forks have an `upstream` remote:

```bash
git fetch upstream
git checkout master
git merge upstream/master
```

Resolve conflicts, run the validation commands below, then rebuild the local images. Do not run `docker compose down -v`; runtime state is bind-mounted but deleting volumes/networks unnecessarily increases risk.

## Validation

```bash
docker compose -f deploy/docker-compose.windows.yml config --quiet
docker compose -f deploy/docker-compose.windows.yml build
docker compose -f deploy/docker-compose.windows.yml up -d
curl -I http://localhost:23333
curl -I http://localhost:24444
curl -I https://mcs.collinthedev.com
curl -I https://mcs-daemon.collinthedev.com
```

Also open an instance terminal through `https://mcs.collinthedev.com` to verify the browser-to-daemon WSS path.

## Remaining upstream dependencies

Building the panel and daemon is local, but the current project still downloads or references external infrastructure:

- `node:*` and `eclipse-temurin:*` base images.
- PTY/Zip-Tools binaries listed in `lib-urls.txt`.
- npm registry dependencies during image builds.
- Game runtime images such as `githubyumao/steam-game-runtime:latest` from marketplace templates.
- Game installers, server binaries, artwork, documentation, and update endpoints referenced by templates.

These can be mirrored or replaced incrementally. They are separate from ownership of the panel and daemon images.

## Optional GHCR publishing

`.github/workflows/docker.yml` already publishes fork releases under `ghcr.io/${{ github.repository }}-web` and `ghcr.io/${{ github.repository }}-daemon`. Docker Hub publishing is gated to the upstream `MCSManager/MCSManager` repository, so the fork does not need upstream Docker Hub credentials. Local Compose builds do not depend on GHCR.
