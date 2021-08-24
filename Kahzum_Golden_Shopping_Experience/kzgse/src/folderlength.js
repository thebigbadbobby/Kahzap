const axios = require('../node_modules/axios');

async function folderlength(business, product) {
    console.log('ekans');
    const url = `https://github.com/thebigbadbobby/productpics/tree/main/${business}/${product}`
    axios.get(url).then((res) => {
    const soup = String(res.data);
    console.log(soup);
    return 5;
    }).catch ((error) => {
        console.log('charmander');
        console.log(error);
        return -1;
    }
    )
}
module.exports.folderlength = folderlength;