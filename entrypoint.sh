#!/bin/bash

set -eo pipefail

echo "$INPUT_AUTHENTICATINPASSWORD" | docker login "$INPUT_REGISTRIEURL" --username "$INPUT_AUTHENTICATINGUSER" --password-stdin
docker pull "$INPUT_SOURCEIMAGE"
docker tag "$INPUT_SOURCEIMAGE "  "$INPUT_DESTINATIONIMAGE"
docker push "$INPUT_DESTINATIONIMAGE"
