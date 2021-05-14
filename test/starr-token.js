const StarrToken = artifacts.require('StarrToken');

contract('StarrToken', (accounts) => {
    it.only('should have the STARR symbol', async () => {
        const instance = await StarrToken.new();

        const symbol = await instance.symbol();

        assert.equal(symbol, 'STARR', 'token symbol');
    });

    it('should have the StarrToken name', async () => {
        const instance = await StarrToken.new();

        const name = await instance.name();

        assert.equal(name, 'StarrToken', 'token name');
    });

    it('should have a 5B token supply', async () => {
        const instance = await StarrToken.new();

        const supply = await instance.totalSupply();

        const nbDecimals = await instance.decimals();

        const mainAccountBalance = await instance.balanceOf(accounts[0]);

        const decimals = 10 ** nbDecimals;

        assert.equal(+supply.toString() / decimals, 5000000000, 'total supply');
        assert.equal(
            +mainAccountBalance.toString() / decimals,
            5000000000,
            'main account balance',
        );
    });

    it('should be able to transfer tokens to a second user and have 3% fee distribution amongst holders', async () => {
        const instance = await StarrToken.new();

        const mainAccountBalance = await instance.balanceOf(accounts[0]);

        const transferAmount = mainAccountBalance.divn(2);

        await instance.transfer(accounts[1], transferAmount);

        const mainAccountNewBalance = await instance.balanceOf(accounts[0]);

        const secondAccountNewBalance = await instance.balanceOf(accounts[1]);

        const fee = transferAmount.muln(3).divn(100);
        const mainAccountFeeShare = fee.muln(500).divn(985);
        const secondAccountFeeShare = fee.muln(485).divn(985);
        const expectedNewMainAccountBalance = mainAccountBalance
            .sub(transferAmount)
            .add(mainAccountFeeShare);
        const expectedSecondAccountBalance = transferAmount
            .sub(fee)
            .add(secondAccountFeeShare);

        assert.equal(
            mainAccountNewBalance.toString(),
            expectedNewMainAccountBalance.toString(),
            'main account balance',
        );
        assert.equal(
            secondAccountNewBalance.toString(),
            expectedSecondAccountBalance.toString(),
            'second account balance',
        );
    });
});
