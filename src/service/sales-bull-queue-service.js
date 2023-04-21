const Queue = require("bull");
const SalesReportRepository = require("../repositories/saleReport-repository")

module.exports.initSalesReportQueue = async function () {
  var eventQueryQueue = new Queue("sale-queue");
  var salesReportRepository = new SalesReportRepository();
  eventQueryQueue.process(async (job, done) => {
    try {
      if (job.data) {
            try {
                console.log('sales-queue: Will process job with data: ' + job.data)
                let allSalesReported = salesReportRepository.upsertSalesReport(job.data)

                console.log('sales-queue: Processed data: ' + JSON.stringify(allSalesReported))
                done();   
            } catch (err) {
                console.log('sales-queue:Error when trying to process data in job...' + err.message)
                done(Error('Error when trying to process data in job...'));    
            }
      } else {
          console.log('sales-queue:No data in job...')
          done(Error('No data in job...'));
      }
    } catch (err) {
      logger.logError(`sales-queue:${err.message}`);
      done(Error(err.message));
    }
  })
};
