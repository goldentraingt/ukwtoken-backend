const port = 80;

const server = require('../server/index');

server.listen(port, () => console.log(`Server of worker ${process.pid} is listening on port ${port}`));
