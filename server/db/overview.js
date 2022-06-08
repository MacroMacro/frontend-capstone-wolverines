const {Client} = require('pg');
const client=new Client({
 user:'huhu',
 host:'localhost',
 database:'sdc',
 port:5432,
})

client.connect(function (err) {
  if(err) {
    throw err;
  }
  console.log('connected!')
});

module.exports=client;