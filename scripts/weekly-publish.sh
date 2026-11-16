#!/bin/bash
# Started by Windows Task Scheduler. Publishes this week's newsletter and homily.
export PATH="$HOME/.nvm/versions/node/v22.14.0/bin:/home/linuxbrew/.linuxbrew/bin:/usr/local/bin:/usr/bin:/bin"
cd "$(dirname "$0")/.." && exec python3 scripts/weekly_publish.py "$@"
