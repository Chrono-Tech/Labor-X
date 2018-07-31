#!/usr/bin/env bash
docker network rm laborx-platform && docker network create -d bridge --subnet=192.168.0.0/16 laborx-platform
