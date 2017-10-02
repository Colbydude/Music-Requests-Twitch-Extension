# Twitch Music Request Extension

A way for your audience to request music for you to perform during your stream!
 
This extension is intended for musicians who perform on Twitch and wish to be able to intuitively accept requests during their live streams.
 
**Not for requesting songs via YouTube, Spotify, iTunes, etc.**

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
