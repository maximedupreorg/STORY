const HDWalletProvider = require('@truffle/hdwallet-provider');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    plugins: ['truffle-plugin-verify'],
    api_keys: {
        bscscan: process.env.BSCSCAN_API_KEY,
        etherscan: process.env.ETHERSCAN_API_KEY,
    },
    networks: {
        rinkeby: {
            provider: () =>
                new HDWalletProvider({
                    mnemonic: process.env.MNEMONIC,
                    providerOrUrl: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ARK_ALCHEMY_API_KEY}`,
                    chainId: 4,
                }),
            network_id: 4,
            skipDryRun: true,
            gas: 10000000,
        },
        testnet: {
            provider: () =>
                new HDWalletProvider({
                    mnemonic: process.env.MNEMONIC,
                    providerOrUrl: `https://data-seed-prebsc-1-s1.binance.org:8545`,
                }),
            network_id: 97,
            confirmations: 10,
            timeoutBlocks: 200,
            skipDryRun: true,
            gas: 30000000 / 4,
        },
        bsc: {
            provider: () =>
                new HDWalletProvider({
                    mnemonic: process.env.MNEMONIC,
                    providerOrUrl: `https://bsc-dataseed1.binance.org`,
                }),
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
