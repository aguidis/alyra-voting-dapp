# Défi #3 - Voting Dapp

Cette Dapp a pour but de faciliter l'intération avec le smart contract responsable du bon déroulement du vote.

## Rappels du vote

- Le vote n'est pas secret
- Chaque électeur peut voir les votes des autres
- Le gagnant est déterminé à la majorité simple
- La proposition qui obtient le plus de voix l'emporte

## Stack Back

- Ethereum in memory blockchain (Ganache Version 2.5.4 (GUI or CLI) + Deployment on Ropsten test network
- Truffle v5.4.18 (core: 5.4.18)
- Solidity v0.8.10 (solc-js)
- Node v15.5.0

## Stack Front

- Web3.js v1.6.1
- React v17.0.2
- Jotai v1.4.9 (state management)

### Directory structure

The application is based on the [Truffle React Box](https://github.com/truffle-box/react-box).

> The structure of `client/src` has been updated to improve clarity and maintainability of the project :

    .
    ├── build                   # Compiled production ready files
    ├── components              # Stateless/statefull components organized by feature
    │   ├── bloc                # Smallest component used accross multi pages
    │   ├── section             # Layout related components
    │   ├── vote-steps          # Dedicated vote step components with their own distinct logic
    │   └── wallet              # Wallet related components
    ├── constants               # Contains enums or fixed value used multiple times in the app
    ├── contracts               # Artifacts of your contracts compilation
    └── migrations              # Migration js files

### Commands

see [Makefile](Makefile) in the project root.
