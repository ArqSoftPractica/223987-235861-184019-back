import http from 'k6/http';
import { check } from 'k6';

// To install k6 run: brew install k6
// To run k6 script: k6 run k6-provider-purchases.js

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
  const companyApiKey = '6ab3f306fd45eaf517c7d1a1b5bab26859f061ebff3ba2e8ade086338eed659b'
  const headers = { 'Content-Type': 'application/json', 'x-api-key': companyApiKey };
  const providerId = "1ed4c34b-231d-43ed-b107-5f9ef2221aac"
  const from = "2023-03-23"
  const to = "2023-06-25"
  const res = http.get(`http://backend-ellis-jodus-reyes.us-east-1.elasticbeanstalk.com/purchases/provider/${providerId}?from="${from}"&to="${to}"`, { headers });

  check(res, {
    'Get status is 200': (r) => res.status === 200
  });
}
