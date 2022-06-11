import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
vus: 20, //stimulate how many virtual users
duration: "30s", //how long you want it to run
};
//Below randomize the endpoints
export default function () {
http.get(`http://localhost:3000/overview/products?page=2&count=5`);
}


// `http://localhost:3000/overview/products?product_id=${Math.floor(Math.random() * (1000000 - 1 + 1)) + 1}`