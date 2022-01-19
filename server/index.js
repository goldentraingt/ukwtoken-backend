const express = require('express');
const app = express();

const data = require('../data/data.js');
const Wallet = require('../utils/Wallet');
const { wallet1, wallet2, infuraUrl } = require('../data/data.js');

const cors = require('cors');

app.use(
    cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
);

app.get('/info/wallet/:walletId', async (req, res, next) => {
    if (req.params.walletId == 1) {
        const resp = await Wallet.getErcTokenBalance(wallet1.walletAddress, infuraUrl);

        res.json({
            walletName: 'Portfel 1',
            ethBalance: resp.ethBalance,
            ukwTokenBalance: resp.ukwTokenBalance / 10e17,
        });
    } else if (req.params.walletId == 2) {
        const resp = await Wallet.getErcTokenBalance(wallet2.walletAddress, infuraUrl);
        res.json({
            walletName: 'Portfel 2',
            ethBalance: resp.ethBalance,
            ukwTokenBalance: resp.ukwTokenBalance / 10e17,
        });
    }
});

app.get('/send', async (req, res, next) => {
    if (req.query) {
        const fromWalletId = req.query.fromWalletId || '';
        const toWalletId = req.query.toWalletId || '';
        const amount = (Number(req.query.amount) * 10e17).toLocaleString('fullwide', { useGrouping: false }) || ''; //
        const secureToken = req.query.secureToken || '';

        console.log(`Req.query.amount: ${req.query.amount}`);

        console.log(`Amount ${amount}`);

        if (!fromWalletId || !toWalletId || !amount || !secureToken) {
            res.send('Insufficient query parameters');
            next();
        }

        if (data.secureTkn !== secureToken) {
            console.log(`secureToken: ${secureToken}`);
            res.status(403).end('Forbidden');
            next();
        }

        if (!parseFloat(fromWalletId) > 0 && !parseFloat(toWalletId) > 0 && !parseFloat(amount) > 0) {
            res.send('Invalid query parameters');
            next();
        }

        const myWallet = data.wallets.filter((el) => el.id == fromWalletId)[0];
        const toWallet = data.wallets.filter((el) => el.id == toWalletId)[0];

        if (!amount) {
            res.status(400).end('Bad request. 1');
            next();
        }

        if (!myWallet) {
            res.status(410).end('Bad request 2');
            next();
        }

        if (!toWallet) {
            res.status(410).end('Bad request 3');
            next();
        }

        console.log(`Sending data`);
        console.log({
            ukwTknCntrctAddr: data.ukwTknCntrctAddr,
            MYwalletAddress: myWallet.walletAddress,
            MYprivateKey: myWallet.privateKey,
            amount: amount,
            TOwalletAddress: toWallet.walletAddress,
            infurUrl: data.infuraUrl,
        });

        const sndRsp = await Wallet.sendToken(
            data.ukwTknCntrctAddr,
            myWallet.walletAddress,
            myWallet.privateKey,
            amount,
            toWallet.walletAddress,
            data.infuraUrl
        );

        res.json(sndRsp);
    } else {
        res.status(400).end('3Bad request');
    }
});

module.exports = app;
