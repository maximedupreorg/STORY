const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic =
    'color idle skill jewel fix limb knock soft traffic tag armor derive';

module.exports = {
    networks: {
        testnet: {
            provider: () =>
                new HDWalletProvider(
                    mnemonic,
                    `https://data-seed-prebsc-1-s1.binance.org:8545`,
                ),
            network_id: 97,
            confirmations: 10,
            timeoutBlocks: 200,
            skipDryRun: true,
            gas: 30000000 / 4,
        },
        bsc: {
            provider: () =>
                new HDWalletProvider(
                    mnemonic,
                    `https://bsc-dataseed1.binance.org`,
                ),
            network_id: 56,
            confirmations: 10,
            timeoutBlocks: 200,
            skipDryRun: true,
        },
    },
    compilers: {
        solc: {
            version: '0.6.12',
        },
    },
};
