var chakram = require('chakram');
var expect = chakram.expect;

describe("HTTP assertions", function () {
  it("should make HTTP assertions easy", function () {
   return chakram.get("http://localhost:3000/overview/products")
    .then (
      function(response){
        //console.log(response);
        expect(response).to.have.status(201);
        expect(response).to.have.header("content-type", "application/json; charset=utf-8");
        expect(response).not.to.be.encoded.with.gzip;

      }
    );

  });
});

describe("getProducts content test", function () {
  it("should make HTTP get product request", function () {
   return chakram.get("http://localhost:3000/overview/products")
    .then (
      function(response) {
        expect(response.body[0].id).to.equal(1);
        expect(response.body[0].name).to.includes('Camo');
        expect(response.body.length).to.equal(5);
      }
    )
  })
});

describe("getRelated content test", function () {
  it("should make HTTP get related product request", function () {
   return chakram.get("http://localhost:3000/overview/related?id=23")
    .then (
      function(response) {
        expect(response.body).to.be.an('array');
      }
    )
  })
});

describe("getFeatures content test", function () {
  it("should make HTTP get productfeature request", function () {
   return chakram.get("http://localhost:3000/overview/id?id=23")
    .then (
      function(response) {
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.all.keys('name','id','category','description','default_price','features', 'slogan')
      }
    )
  })
});

describe("getStyles content test", function () {
  it("should make HTTP get productfeature request", function () {
   return chakram.get("http://localhost:3000/overview/styles?id=23")
    .then (
      function(response) {
        expect(response.body.results[0].photos).to.be.an('array');
        expect(response.body.results[0]).to.have.any.keys('photos','skus')
      }
    )
  })
});
