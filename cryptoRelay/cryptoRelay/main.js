const { getBalance } = require('./lib/sendStudentCoin');

const data = {
    wavesAddress: '3PLuuL3kqrS5zaawC4wWrnkwoQV9XScq8ma',
    infuraUrl: 'https://mainnet.infura.io/v3/020340a060d54412b2e48bbaf78252a6',
    myAddress: '0xd5969333875F5021C218EeF128F1cb3a840C7982',
    privateKey: 'ac0a22e241d05569528c6be16582b4369faf61aca786191da16602ea11903f81',
};

const main = async () => {
    const balance = await getBalance(data.myAddress, null, data.infuraUrl);
};

main();
