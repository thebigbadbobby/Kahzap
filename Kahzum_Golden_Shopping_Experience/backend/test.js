var axios = require('axios');

var config = {
  method: 'get',
  url: 'http://34.215.193.17:8080/ors/v2/directions/driving-car/?start=8.776081,49.418204&end=8.692803,49.409465',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
