import newsJob from "@/jobs/sample.job";

// Register all jobs here
const jobs = {
  newsJob,
  // Add other jobs here as needed
};

// Helper function to start all registered jobs
const startAllJobs = () => {
  Object.values(jobs).forEach((job) => {
    if (job.startJob) job.startJob();
  });
};

export default {
  startAllJobs,
};
