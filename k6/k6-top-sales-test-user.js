import http from 'k6/http';
import { check } from 'k6';

// To install k6 run: brew install k6
// To run k6 script: k6 run k6-top-sales-test-user.js

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
  // do requests using test User
  const companyId = 'e8634d76-908c-40f4-94a6-97a55dd1b6f2'
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer eyJhbGciOiJSUzI1NiJ9.eyJpZCI6IjQyYWE3YTVmLWQ1NDQtNGIyNy04YTFjLTE0OGU1MGZlYTkxYyIsInVzZXJOYW1lIjoidGhpc0lzVGVzdEFjY291bnQiLCJlbWFpbCI6InRoaXNJc1Rlc3RBY2NvdW50QHRlc3QuY29tIiwiY29tcGFueUlkIjoiMWQ5ZWU2N2QtZWI0Ni00MzA5LTgzZTAtYWZlYzU3ODljNmU0Iiwicm9sZSI6IlRFU1QiLCJjcmVhdGVkQXQiOiIyMDIzLTA0LTMwVDE2OjU1OjE1LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA0LTMwVDE2OjU1OjE1LjAwMFoifQ.m-QMdHtChKL79moFdPN5hewMtL6sr8gKnPDeQtZKLkM12UtlZoWhhEkcoVnfW1U5Td8uEYPsTEhit5JxVWuXs1wbbM2NGbItDjs5egwZsfyx2Cgje_w-RI4vS8H8i0EMBAGV-9yjWjxFBlS-A_vcFio-fUY4fyKk7YS6NCRtGUvnC0Y3_R4zdBJK-52gNEYgZ16rsf0pVFAo6zGk7wPTcS-AjF98p878fFuz0mu1WNhIh_fgYWy-ck-b9ECtO36gkMhGk9G5j1izqDNYdvLkaLelsBRKNcTba02McJxYrzY6vaWatL2pK614QXsb-h9LijNiUkRx1_uRsNLbLAp7zw` };
  const res = http.get(`http://localhost:3000/saleReportTest/${companyId}`, { headers });

  check(res, {
    'Get status is 200': (r) => res.status === 200
  });
}
