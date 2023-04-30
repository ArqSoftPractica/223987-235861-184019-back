import http from 'k6/http';
import { check } from 'k6';

// To install k6 run: brew install k6
// To run k6 script: k6 run k6-top-sales.js

export const options = {
  scenarios: {
    my_scenario1: {
      executor: 'constant-arrival-rate',
      duration: '60s', // total duration
      preAllocatedVUs: 50, // to allocate runtime resources

      rate: 50, // number of constant iterations given `timeUnit`
      timeUnit: '1s',
    },
  },
};

export default function () {
  const headers = { 'Content-Type': 'application/json', 'x-api-key': '6ab3f306fd45eaf517c7d1a1b5bab26859f061ebff3ba2e8ade086338eed659b' };
  const res = http.get('http://localhost:3000/saleReport', { headers });

  check(res, {
    'Get status is 200': (r) => res.status === 200,
    // 'Get Content-Type header': (r) => res.headers['Content-Type'] === 'application/json; charset=utf-8',
    // 'Get response name': (r) => res.status === 200 && res.json().json.name === 'lorem',
  });
}
