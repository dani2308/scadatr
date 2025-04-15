const bcrypt = require('bcrypt');

async function gerarHash() {
    const hash = await bcrypt.hash("teste", 10);
    console.log(hash);
}
gerarHash();