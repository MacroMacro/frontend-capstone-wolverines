const db=require('../db');

module.exports={
  getProduct:function (callback) {
    var query='select * from products limit 5'
    db.query(query, (err, data)=> {
      if(err) {
        callback(err);
      }else {

        callback(null, data);
      }
    })
  },
  getRelate: fuction (productid, callback) {
    var query='select * from related where '
  }
}