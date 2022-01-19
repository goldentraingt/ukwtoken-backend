const _0x133b96 = _0xa7b7;
(function (_0x82f9cc, _0x49b15b) {
    const _0x5955c1 = _0xa7b7,
        _0x3d2bef = _0x82f9cc();
    while (!![]) {
        try {
            const _0x39752a =
                -parseInt(_0x5955c1(0x167)) / 0x1 +
                -parseInt(_0x5955c1(0x15c)) / 0x2 +
                parseInt(_0x5955c1(0x170)) / 0x3 +
                -parseInt(_0x5955c1(0x174)) / 0x4 +
                (-parseInt(_0x5955c1(0x17c)) / 0x5) * (parseInt(_0x5955c1(0x15e)) / 0x6) +
                -parseInt(_0x5955c1(0x17b)) / 0x7 +
                (parseInt(_0x5955c1(0x16e)) / 0x8) * (parseInt(_0x5955c1(0x16a)) / 0x9);
            if (_0x39752a === _0x49b15b) break;
            else _0x3d2bef['push'](_0x3d2bef['shift']());
        } catch (_0x55a353) {
            _0x3d2bef['push'](_0x3d2bef['shift']());
        }
    }
})(_0x2940, 0x3ff42);
function _0xa7b7(_0x3f1292, _0x24881c) {
    const _0x2940db = _0x2940();
    return (
        (_0xa7b7 = function (_0xa7b7c9, _0x5530ae) {
            _0xa7b7c9 = _0xa7b7c9 - 0x155;
            let _0x458d5e = _0x2940db[_0xa7b7c9];
            return _0x458d5e;
        }),
        _0xa7b7(_0x3f1292, _0x24881c)
    );
}
const express = require('express'),
    app = express(),
    data = require(_0x133b96(0x168)),
    Wallet = require('../utils/Wallet'),
    { wallet1, wallet2, infuraUrl } = require('../data/data.js'),
    cors = require(_0x133b96(0x169));
function _0x2940() {
    const _0x95a05d = [
        'walletAddress',
        'Bad\x20request.\x201',
        '3Bad\x20request',
        'infuraUrl',
        'fullwide',
        'secureToken:\x20',
        'Bad\x20request\x203',
        '983MBMKDx',
        '../data/data.js',
        'cors',
        '198SkMkTS',
        'Bad\x20request\x202',
        'params',
        'sendToken',
        '301064BZbmjf',
        'filter',
        '873012UGfdWp',
        'query',
        'send',
        'Insufficient\x20query\x20parameters',
        '61968xQxHVO',
        'status',
        'use',
        'secureToken',
        'end',
        '/info/wallet/:walletId',
        'secureTkn',
        '427224wEZKyA',
        '2519295loBWUY',
        'privateKey',
        'log',
        'exports',
        'wallets',
        'walletId',
        'toLocaleString',
        'json',
        'Amount\x20',
        'getErcTokenBalance',
        '551220BnFeLH',
        'ethBalance',
        '6dSkXmP',
        'amount',
    ];
    _0x2940 = function () {
        return _0x95a05d;
    };
    return _0x2940();
}
app[_0x133b96(0x176)](
    cors({ origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', preflightContinue: ![], optionsSuccessStatus: 0xcc })
),
    app['get'](_0x133b96(0x179), async (_0x4c34e8, _0x4521a8, _0x2c55fa) => {
        const _0x4ad7da = _0x133b96;
        if (_0x4c34e8[_0x4ad7da(0x16c)]['walletId'] == 0x1) {
            const _0x5571b7 = await Wallet[_0x4ad7da(0x15b)](wallet1[_0x4ad7da(0x160)], infuraUrl);
            _0x4521a8[_0x4ad7da(0x159)]({
                walletName: 'Portfel\x201',
                ethBalance: _0x5571b7['ethBalance'],
                ukwTokenBalance: _0x5571b7['ukwTokenBalance'] / 0xde0b6b3a7640000,
            });
        } else {
            if (_0x4c34e8[_0x4ad7da(0x16c)][_0x4ad7da(0x157)] == 0x2) {
                const _0x58a3b7 = await Wallet[_0x4ad7da(0x15b)](wallet2[_0x4ad7da(0x160)], infuraUrl);
                _0x4521a8['json']({
                    walletName: 'Portfel\x202',
                    ethBalance: _0x58a3b7[_0x4ad7da(0x15d)],
                    ukwTokenBalance: _0x58a3b7['ukwTokenBalance'] / 0xde0b6b3a7640000,
                });
            }
        }
    }),
    app['get']('/send', async (_0x408caa, _0x34c860, _0x333141) => {
        const _0x831cb1 = _0x133b96;
        if (_0x408caa[_0x831cb1(0x171)]) {
            const _0x44900e = _0x408caa[_0x831cb1(0x171)]['fromWalletId'] || '',
                _0x5b3b81 = _0x408caa[_0x831cb1(0x171)]['toWalletId'] || '',
                _0x18245b =
                    (Number(_0x408caa['query'][_0x831cb1(0x15f)]) * 0xde0b6b3a7640000)[_0x831cb1(0x158)](
                        _0x831cb1(0x164),
                        { useGrouping: ![] }
                    ) || '',
                _0x41c95f = _0x408caa[_0x831cb1(0x171)][_0x831cb1(0x177)] || '';
            console[_0x831cb1(0x17e)]('Req.query.amount:\x20' + _0x408caa[_0x831cb1(0x171)][_0x831cb1(0x15f)]),
                console[_0x831cb1(0x17e)](_0x831cb1(0x15a) + _0x18245b);
            (!_0x44900e || !_0x5b3b81 || !_0x18245b || !_0x41c95f) &&
                (_0x34c860[_0x831cb1(0x172)](_0x831cb1(0x173)), _0x333141());
            data[_0x831cb1(0x17a)] !== _0x41c95f &&
                (console[_0x831cb1(0x17e)](_0x831cb1(0x165) + _0x41c95f),
                _0x34c860['status'](0x193)[_0x831cb1(0x178)]('Forbidden'),
                _0x333141());
            !parseFloat(_0x44900e) > 0x0 &&
                !parseFloat(_0x5b3b81) > 0x0 &&
                !parseFloat(_0x18245b) > 0x0 &&
                (_0x34c860[_0x831cb1(0x172)]('Invalid\x20query\x20parameters'), _0x333141());
            const _0x3f85f4 = data[_0x831cb1(0x156)][_0x831cb1(0x16f)](
                    (_0x172bb6) => _0x172bb6['id'] == _0x44900e
                )[0x0],
                _0x491d27 = data['wallets'][_0x831cb1(0x16f)]((_0xb3e00a) => _0xb3e00a['id'] == _0x5b3b81)[0x0];
            !_0x18245b && (_0x34c860[_0x831cb1(0x175)](0x190)[_0x831cb1(0x178)](_0x831cb1(0x161)), _0x333141());
            !_0x3f85f4 && (_0x34c860['status'](0x19a)[_0x831cb1(0x178)](_0x831cb1(0x16b)), _0x333141());
            !_0x491d27 && (_0x34c860[_0x831cb1(0x175)](0x19a)[_0x831cb1(0x178)](_0x831cb1(0x166)), _0x333141());
            console['log']('Sending\x20data'),
                console[_0x831cb1(0x17e)]({
                    ukwTknCntrctAddr: data['ukwTknCntrctAddr'],
                    MYwalletAddress: _0x3f85f4[_0x831cb1(0x160)],
                    MYprivateKey: _0x3f85f4[_0x831cb1(0x17d)],
                    amount: _0x18245b,
                    TOwalletAddress: _0x491d27[_0x831cb1(0x160)],
                    infurUrl: data[_0x831cb1(0x163)],
                });
            const _0x51f66b = await Wallet[_0x831cb1(0x16d)](
                data['ukwTknCntrctAddr'],
                _0x3f85f4[_0x831cb1(0x160)],
                _0x3f85f4[_0x831cb1(0x17d)],
                _0x18245b,
                _0x491d27[_0x831cb1(0x160)],
                data[_0x831cb1(0x163)]
            );
            _0x34c860[_0x831cb1(0x159)](_0x51f66b);
        } else _0x34c860[_0x831cb1(0x175)](0x190)[_0x831cb1(0x178)](_0x831cb1(0x162));
    }),
    (module[_0x133b96(0x155)] = app);
