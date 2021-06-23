const HDWalletProvider = require('@truffle/hdwallet-provider');

const DEFAULT_GAS_PRICE = 20000000000;

module.exports = {
    plugins: ['truffle-plugin-verify'],
    api_keys: {
        bscscan: process.env.BSCSCAN_API_KEY,
        etherscan: process.env.ETHERSCAN_API_KEY,
    },
    networks: {
        bscMainnet: {
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
        bscTestnet: {
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
        ethKovan: {
            provider: () =>
                new HDWalletProvider({
                    mnemonic: process.env.MNEMONIC,
                    providerOrUrl: `https://eth-kovan.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY_KOVAN}`,
                    chainId: 42,
                }),
            network_id: 42,
            skipDryRun: true,
            gas: 10000000,
        },
        ethRinkeby: {
            provider: () =>
                new HDWalletProvider({
                    mnemonic: process.env.MNEMONIC,
                    providerOrUrl: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY_RINKEBY}`,
                    chainId: 4,
                }),
            network_id: 4,
            skipDryRun: true,
            gasPrice: DEFAULT_GAS_PRICE * 2,
        },
        test: {
            host: '127.0.0.1',
            port: 8545,
            network_id: '*',
        },
    },
    compilers: {
        solc: {
            version: '0.6.12',
            settings: {
                optimizer: {
                    enabled: true,
                },
            },
        },
    },
};
