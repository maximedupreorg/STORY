const StarrToken = artifacts.require('StarrToken');

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
});
