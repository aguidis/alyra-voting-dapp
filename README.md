# Challenge #3 - Voting Dapp

This Dapp aims to facilitate the integration with the smart contract responsible for the smooth running of the vote.

## Voting reminders

- The vote is not secret
- Each voter can see the votes of others
- The winner is determined by a simple majority
- The proposal with the most votes wins

## Back Stack

- Ethereum in-memory blockchain (Ganache Version 2.5.4 (GUI or CLI) + Deployment on the Ropsten test network
- Truffle v5.4.18 (core: 5.4.18)
- Solidity v0.8.10 (solc-js)
- Node v15.5.0

## Stack Front

- Web3.js v1.6.1
- React v17.0.2
- Jotai v1.4.9 (state management)

### Directory structure

The application is based on the [Truffle React Box](https://github.com/truffle-box/react-box).

> The structure of `client/src` has been updated to improve the clarity and maintainability of the project :

    .
    ├── build # Compiled files ready for production.
    ├── components # Stateless or complete components organized by functionality.
    │ ├─── block # The smallest component used on multiple pages
    │ ├─── section # Layout-related components
    │ ├─── vote-steps # Components dedicated to the voting steps with their own logic.
    │ └─── wallet # Wallet related components.
    ├── constants # Contains enums or fixed values used multiple times in the application.
    ├─── contracts # Artifacts from the compilation of your contracts
    └─── migrations # Migration js files

### Commands

see [Makefile](Makefile) at the root of the project.
