docker run \
  --name laborx.platform.web \
  --restart=always --detach \
  --network laborx-platform --ip 192.168.11.2 \
  laborx-platform-web
