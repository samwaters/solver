#!/bin/bash
source .env
scripts/codecov -Z -t ${CODECOV_TOKEN} &> /dev/null
