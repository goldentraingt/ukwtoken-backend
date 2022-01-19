const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const moment = require('moment');

//https://stackoverflow.com/questions/48180941/send-erc20-token-with-web3

// prettier-ignore
const ukwTknAbiArray = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenOwner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"acceptOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenOwner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"remaining","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"newOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"a","type":"uint256"},{"internalType":"uint256","name":"b","type":"uint256"}],"name":"safeAdd","outputs":[{"internalType":"uint256","name":"c","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"a","type":"uint256"},{"internalType":"uint256","name":"b","type":"uint256"}],"name":"safeDiv","outputs":[{"internalType":"uint256","name":"c","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"a","type":"uint256"},{"internalType":"uint256","name":"b","type":"uint256"}],"name":"safeMul","outputs":[{"internalType":"uint256","name":"c","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"a","type":"uint256"},{"internalType":"uint256","name":"b","type":"uint256"}],"name":"safeSub","outputs":[{"internalType":"uint256","name":"c","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
// const abiArray = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"},{"name":"amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isMinter","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newMinter","type":"address"}],"name":"transferMinterRole","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"name","type":"string"},{"name":"symbol","type":"string"},{"name":"decimals","type":"uint8"},{"name":"initialSupply","type":"uint256"},{"name":"feeReceiver","type":"address"},{"name":"tokenOwnerAddress","type":"address"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"MinterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"MinterRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]
const ukwTknCntrctAddrss = '0xB371c157Ed8580a9999610d8255ce52521652Ee7';
// const STCContractAddress = '0xb8B7791b1A445FB1e202683a0a329504772e0E52';

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
