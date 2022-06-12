require('dotenv').config();

const {Pool} = require('pg');
const pool=new Pool({
 user:process.env.PGUSER,
 host:process.env.PGHOST,
 database:process.env.PGDATABASE,
 password:process.env.PGPASSWORD,
 port:process.env.PGPORT
})

client.connect(function (err) {
  if(err) {
    throw err;
  }
  console.log('connected!')
});

module.exports=pool;