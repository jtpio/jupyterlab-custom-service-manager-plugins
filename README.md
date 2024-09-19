# myextension

[![Github Actions Status](https://github.com/jtpio/jupyterlab-custom-default-drive/workflows/Build/badge.svg)](https://github.com/jtpio/jupyterlab-custom-default-drive/actions/workflows/build.yml)

Demo repo: JupyterLab extension providing a different custom default drive

## Setup

1. Checkout the branch on the JupyterLab repo:

TODO

2. Link the dev `@jupyterlab/services` packages with `yalc`:

```bash
# In the core jupyterlab repo
cd packages/services
yalc publish
```

3. Install this extension locally

```bash
yarn add @jupyterlab/services

pip install -e "."
jupyter labextension develop . --overwrite
jlpm build
```
