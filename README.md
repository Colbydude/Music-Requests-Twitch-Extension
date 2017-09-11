# Twitch Music Request Extension

**Goal:** Provide a quick an intuitive way for Twitch Musicians to take requests to perform their own music during a
live stream.

# What we're going to build:
- A RESTful API for a music catalog.
- A configuration panel (on Twitch) for the broadcaster/musician to manage a catalog of their music.
- A dashboard panel (on Twitch) for the broadcaster/musician to handle incoming music requests.
- A video overlay (on Twitch) for viewers to request music.

## Dependencies

We will need:
 * [docker](https://docs.docker.com/engine/installation/)
 * [docker-compose](https://docs.docker.com/compose/install/)

## Generate self-signed certs
```bash
cd certs
./generate_local_ssl.sh
    # Requires a sudo password so that the cert can be installed on the root keychain
    # If this install fails, see the README in ./certs for manual override.
```

## To start the Extensions Boilerplate service
```bash
docker-compose up --build
```

## Twitch Extension documentation

Please consult the [Twitch Extensions documentation on the Twitch developer site](https://dev.twitch.tv/docs/extensions)
