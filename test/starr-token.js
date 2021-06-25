const StarrToken = artifacts.require('StarrToken');
const IUniswapV2Router02 = artifacts.require('IUniswapV2Router02');
const IUniswapV2Pair = artifacts.require('IUniswapV2Pair');

contract('StarrToken', (accounts) => {
    it('should have the symbol STARR', async () => {
        const instance = await StarrToken.deployed();

        const symbol = await instance.symbol();

        assert.equal(symbol, 'STARR1', 'token symbol');
    });

    it('should have the Railroad Token name', async () => {
        const instance = await StarrToken.deployed();

        const name = await instance.name();

        assert.equal(name, 'Starr Token', 'name');
    });

    it('should have an initial total supply of 10B tokens', async () => {
        const instance = await StarrToken.deployed();

        const totalSupply = await instance.totalSupply();

        assert.equal(
            totalSupply.toString(),
            '10000000000' + '000000000',
            'total supply',
        );
    });

    it('should have an initial 10% liquidity fee', async () => {
        const instance = await StarrToken.deployed();

        const liquidityFee = await instance._liquidityFee();

        assert.equal(liquidityFee.toString(), '10', 'liquidity fee');
    });

    it('should have an initial 10% tax fee', async () => {
        const instance = await StarrToken.deployed();

        const taxFee = await instance._taxFee();

        assert.equal(taxFee.toString(), '10', 'tax fee');
    });

    it('should exclude the contract address from fee by default', async () => {
        const instance = await StarrToken.deployed();

        const isExcludedFromFee = await instance.isExcludedFromFee(
            instance.address,
        );

        assert.equal(isExcludedFromFee, true);
    });

    it('should exclude the owner (deployment) address from fee by default', async () => {
        const instance = await StarrToken.deployed();

        const isExcludedFromFee = await instance.isExcludedFromFee(accounts[0]);

        assert.equal(isExcludedFromFee, true);
    });

    it('should exclude ETH unicrypt address from fee by default', async () => {
        const instance = await StarrToken.deployed();

        const isExcludedFromFee = await instance.isExcludedFromFee(
            '0xDba68f07d1b7Ca219f78ae8582C213d975c25cAf',
        );

        assert.equal(isExcludedFromFee, true);
    });

    it('should exclude the contract address from rewards by default', async () => {
        const instance = await StarrToken.deployed();

        const isExcludedFromFee = await instance.isExcludedFromFee(
            instance.address,
        );

        assert.equal(isExcludedFromFee, true);
    });

    it('should exclude the owner (deployment) address from rewards by default', async () => {
        const instance = await StarrToken.deployed();

        const isExcludedFromReward = await instance.isExcludedFromReward(
            accounts[0],
        );

        assert.equal(isExcludedFromReward, true);
    });

    it('should exclude ETH unicrypt address from rewards by default', async () => {
        const instance = await StarrToken.deployed();

        const isExcludedFromReward = await instance.isExcludedFromReward(
            '0xDba68f07d1b7Ca219f78ae8582C213d975c25cAf',
        );

        assert.equal(isExcludedFromReward, true);
    });

    it('should not be able to set a max transaction percentage equal to 0', async () => {
        let failed = false;

        const instance = await StarrToken.deployed();

        try {
            await instance.setMaxTxPercent(0);
        } catch (e) {
            failed = true;
        }

        assert.equal(failed, true);
    });

    it('should not be able to set a max transaction percentage to -1', async () => {
        let failed = false;

        const instance = await StarrToken.deployed();

        try {
            await instance.setMaxTxPercent(-1);
        } catch (e) {
            failed = true;
        }

        assert.equal(failed, true);
    });

    it('should not be able to set a max transaction percentage to -1', async () => {
        let failed = false;

        const instance = await StarrToken.deployed();

        try {
            await instance.setMaxTxPercent(-1);
        } catch (e) {
            failed = true;
        }

        assert.equal(failed, true);
    });

    it('should not be able to set a tax fee greater than 10', async () => {
        let failed = false;

        const instance = await StarrToken.deployed();

        try {
            await instance.setTaxFeePercent(11);
        } catch (e) {
            failed = true;
        }

        assert.equal(failed, true);
    });

    it('should not be able to set a liquidity fee greater than 10', async () => {
        let failed = false;

        const instance = await StarrToken.deployed();

        try {
            await instance.setLiquidityFeePercent(11);
        } catch (e) {
            failed = true;
        }

        assert.equal(failed, true);
    });

    it('should not tax adding liquidity to the pool when LP is excluded from fees', async () => {
        const TOKENS_TO_ADD_TO_LIQ = getTokenAmount(1000000);
        const WEI_TO_ADD_TO_LIQ = web3.utils.toWei('1');
        const LP_ACCOUNT = accounts[0];

        const instance = await StarrToken.new();

        const routerInstance = await IUniswapV2Router02.at(
            await instance.uniswapV2Router(),
        );

        const pairInstance = await IUniswapV2Pair.at(
            await instance.uniswapV2Pair(),
        );

        await instance.transfer(LP_ACCOUNT, TOKENS_TO_ADD_TO_LIQ);

        await instance.approve(routerInstance.address, TOKENS_TO_ADD_TO_LIQ, {
            from: LP_ACCOUNT,
        });

        await routerInstance.addLiquidityETH(
            instance.address,
            TOKENS_TO_ADD_TO_LIQ,
            TOKENS_TO_ADD_TO_LIQ,
            WEI_TO_ADD_TO_LIQ,
            LP_ACCOUNT,
            Date.now() + 1000 * 60 * 10,
            { from: LP_ACCOUNT, value: WEI_TO_ADD_TO_LIQ },
        );

        const reserves = await pairInstance.getReserves();

        if ((await pairInstance.token0()) === instance.address) {
            // console.log(
            //     "Pair reserve of token0/RAILR",
            //     reserves.reserve0.toString(),
            // );
            // console.log(
            //     "Pair reserve of token1/WETH",
            //     reserves.reserve1.toString(),
            //     web3.utils.fromWei(reserves.reserve1.toString()),
            // );

            assert.equal(
                reserves.reserve0.toString(),
                TOKENS_TO_ADD_TO_LIQ,
                'tokens reserve',
            );
            assert.equal(
                reserves.reserve1.toString(),
                WEI_TO_ADD_TO_LIQ,
                'eth reserve',
            );
        } else {
            // console.log(
            //     "Pair reserve of token1/RAILR",
            //     reserves.reserve1.toString(),
            // );
            // console.log(
            //     "Pair reserve of token0/WETH",
            //     reserves.reserve0.toString(),
            //     web3.utils.fromWei(reserves.reserve0.toString()),
            // );

            assert.equal(
                reserves.reserve1.toString(),
                TOKENS_TO_ADD_TO_LIQ,
                'tokens reserve',
            );
            assert.equal(
                reserves.reserve0.toString(),
                WEI_TO_ADD_TO_LIQ,
                'eth reserve',
            );
        }
    });

    it('should be able to do a reflective airdrop to all non excluded wallets', async () => {
        const instance = await StarrToken.new();

        await instance.transfer(accounts[1], getTokenAmount(4000000000));

        await instance.transfer(accounts[2], getTokenAmount(3000000000));

        await instance.transfer(accounts[3], getTokenAmount(1000000000));

        await instance.deliver(getTokenAmount(4000000000), {
            from: accounts[1],
        });

        assert.equal(
            (await instance.balanceOf(accounts[0])).toString(),
            getTokenAmount(2000000000),
            'first account balance',
        );

        assert.equal(
            (await instance.balanceOf(accounts[1])).toString(),
            getTokenAmount(0),
            'second account balance',
        );

        assert.equal(
            (await instance.balanceOf(accounts[2])).toString(),
            getTokenAmount(6000000000),
            'third account balance',
        );

        assert.equal(
            (await instance.balanceOf(accounts[3])).toString(),
            getTokenAmount(2000000000),
            'fourth account balance',
        );
    });

    function getTokenAmount(number) {
        const DECIMALS = 10 ** 9;

        return (number * DECIMALS).toString();
    }
});
