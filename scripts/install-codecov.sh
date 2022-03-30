#!/bin/bash
echo "Checking if codecov is already installed"
if [ -f "scripts/codecov" ]; then
  echo "codecov is already installed, exiting";
  exit 0;
fi
echo "codecov is not installed, installing";
cd scripts
curl -Os https://uploader.codecov.io/latest/macos/codecov
curl -Os https://uploader.codecov.io/latest/macos/codecov.SHA256SUM
shasum -a 256 -c codecov.SHA256SUM
chmod +x codecov
echo "codecov installed successfully"
echo "Please remember to set the token in .env"
