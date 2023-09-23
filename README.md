![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Wagmi](https://img.shields.io/badge/Wagmi-3C3C3D?style=for-the-badge&logo=Wagmi&logoColor=white)
![Ethers](https://img.shields.io/badge/Ethers-3C3C3D?style=for-the-badge&logo=Ethers&logoColor=white)


# Contract Captain

Decentralized Smart contract explorer and administration tool for developers and moderators of smart contracts.  

Available for EVM-compatible blockchains (Ethereum, Polygon, BSC, Avalanche, Optimism, Hardhat, Localhost). 

Support the project by donating or contributing to code and documentation.

BTC: bc1qszdxp6dzrrzv6h0mnk0093k48h07j4rhvsjl9u  
EVM: 0x386A5a8b33234B5eb22dAeE45C1693c8591cB4a2


## Features
- connect web3 wallet (Metamask, Coinbase Wallet, WalletConnect)
- workspace for managing contracts under projects
- add contracts by entering address and ABI (and code optionally)
- displays view data
- displays contract events (does not persist)
- displays contract transactions (does not persist)
- execute write functions
- displays ABI
- displays Code
- no backend, uses localstorage


## Planned features
- migration script in case of state arhitecture change
- sync workspace between devices (GitHub Gist, Google Cloud, Dropbox...)
- on contract address entry, check if code or ABI is available on network explorers? (etherscan, bscscan, etc.)
- disable getters on UI if failing (example onlyCreator can call a method)


## TODOs
- typescript
- new build chain
- delete project
- check links to block explorers
- grid transactions formating & styling
- grid events formating & styling
- project settings -> list of networks when not connected with wallet!
- sync your workspace between devices through Gist (optionally) (https://docs.github.com/en/rest/gists?apiVersion=2022-11-28)
- drag & drop items in navigation and persist sort order
- prioritize getters (owner, name/_tokenName, symbol/_tokenSymbol, decimals/_tokenDecimals, _totalSupply/totalSupply, _tokenMaxSupply)
- parse code and show comments and functions "onhover" over UI write or read method
- responsive mobile views


## Installation
```sh
yarn
```

## Running
Run in different environments:
```sh
yarn start
```

## Building
Build for production:
```sh
yarn build
```

## Dependencies
- React - https://reactjs.org
- Redux Toolkit - https://redux-toolkit.js.org
- Wagmi - https://wagmi.sh
- ConnectKit - https://docs.family.co/connectkit
- Ethers - https://www.npmjs.com/package/ethers
- Monaco Editor - https://www.npmjs.com/package/@monaco-editor/react
- Tailwind CSS - https://tailwindcss.com
- HeadlessUi - https://github.com/tailwindlabs/headlessui
- React-Hot-Toast - https://react-hot-toast.com
- HeroIcons - https://github.com/tailwindlabs/heroicons
- React Data Table Component - https://github.com/jbetancur/react-data-table-component


## License

This repository is licensed under the MIT license. See the [LICENSE](LICENSE) file for more information.

## Authors
IoSan @ Spartan Development d.o.o.