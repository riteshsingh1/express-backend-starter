import cron from "node-cron";

const startJob = () => {
  // Run every 2 hours
  cron.schedule("0 */2 * * *", async () => {
    try {
      console.log("Fetching latest news...");
    } catch (error) {
      console.error("Error in news cron job:", error);
    }
  });
};

export default {
  startJob,
};
