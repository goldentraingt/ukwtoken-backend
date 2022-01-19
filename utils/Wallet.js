const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const moment = require('moment');
const config = require('../data/data');

const ukwTknCntrctAddrss = config.ukwTknCntrctAddr;

process.on('unhandledRejection', (reason, p) => {
    console.error('Reason: ', reason);
    console.error('Promise: ', p);
});

const sendSigned = async (txData, privateKey, web3) => {
    const privKey = new Buffer.from(privateKey, 'hex');
    const transaction = new Tx(txData);
    await transaction.sign(privKey);
    const serializedTx = await transaction.serialize().toString('hex');
    const response = await web3.eth.sendSignedTransaction('0x' + serializedTx);
    return response;
};

const getErcTokenBalance = async (myAddress, infuraUrl) => {
    const provider = new Web3.providers.HttpProvider(infuraUrl);
    const web3 = new Web3(provider);

    let ETHBalance = await web3.eth.getBalance(myAddress);
    console.log('myAddressETHBlnc:', web3.utils.fromWei(ETHBalance), 'ETH');

    const ukwTknCntrct = await new web3.eth.Contract(ukwTknAbiArray, ukwTknCntrctAddrss, { from: myAddress });

    let UKWTknBalance = await ukwTknCntrct.methods.balanceOf(myAddress).call();
    console.log('myAddress UKW:', UKWTknBalance, 'UKW');

    return {
        ethBalance: web3.utils.fromWei(ETHBalance),
        ukwTokenBalance: UKWTknBalance,
    };
};

const getBalance = async (myAddress, infuraUrl) => {
    const provider = new Web3.providers.HttpProvider(infuraUrl);
    const web3 = new Web3(provider);

    let ETHBalance = await web3.eth.getBalance(myAddress);
    console.log('myAddress ETH:', web3.utils.fromWei(ETHBalance), 'ETH');
};

const sendToken = async (contractAddress, myAddress, privateKey, amount, toAddress, infuraUrl) => {
    const provider = new Web3.providers.HttpProvider(infuraUrl);
    const web3 = new Web3(provider);

    console.log(`--------------- SENDING TOKENS -------------`);

    let ETHBalance = await web3.eth.getBalance(myAddress);
    console.log('myAddress ETH:', web3.utils.fromWei(ETHBalance), 'ETH');
    const gasPrice = (await web3.eth.getGasPrice()) * 1.25;
    const gasLimit = 100 * 1e3;

    console.log('Gas limit:', gasLimit);
    console.log('Gas price:', gasPrice);

    let txCount = await web3.eth.getTransactionCount(myAddress);
    console.log('Numer transakcji:', txCount);

    const contract = await new web3.eth.Contract(ukwTknAbiArray, contractAddress, { from: myAddress });
    let UKWTknBlnc = await contract.methods.balanceOf(myAddress).call();
    console.log('myAddress UKW:', UKWTknBlnc, 'UKW');

    if (ETHBalance < 0.002)
        return {
            status: false,
            transactionInfo: {
                message: 'Insufficient ETH balance.',
                ETHBalance,
                STCBalance: UKWTknBlnc,
                transactionId: txCount,
            },
        };

    if (UKWTknBlnc < Number(amount))
        return {
            status: false,
            transactionInfo: {
                message: 'Insufficient STC balance.',
                ETHBalance,
                STCBalance: UKWTknBlnc,
                amount,
                transactionId: txCount,
            },
        };

    console.log(`Amount before tx: ${amount}`);

    const txData = {
        nonce: web3.utils.toHex(txCount),
        gasPrice: web3.utils.toHex(parseInt(gasPrice)), // Gwei
        gasLimit: web3.utils.toHex(parseInt(gasLimit)),
        from: myAddress,
        to: contractAddress,
        value: '0x0',
        data: await contract.methods.transfer(toAddress, String(amount)).encodeABI(),
    };

    const start = moment.now();

    let transactionInfo;
    try {
        transactionInfo = await sendSigned(txData, privateKey, web3);
        transactionInfo.date = new Date(Date.now()).toISOString();
        transactionInfo.transactionNumber = txCount;
    } catch (err) {
        console.log(err);
        transactionInfo = {};
        transactionInfo.status = false;
        transactionInfo.errorMessage = err;
    }

    const sentInSeconds = moment().diff(start, 'seconds');
    transactionInfo.sentInSeconds = sentInSeconds;

    if (transactionInfo.status) {
        return { status: true, transactionInfo };
    } else {
        transactionInfo.message = 'Internal sending error';
        return { status: false, transactionInfo };
    }
};

module.exports = { sendToken, getBalance, getErcTokenBalance };
