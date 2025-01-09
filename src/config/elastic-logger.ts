import { Client } from "@elastic/elasticsearch";
import winston from "winston";
import Transport from "winston-transport";
import ecsFormat from "@elastic/ecs-winston-format";
import { env } from "@/config/env";

const elasticClient = new Client({
  node: env.ELASTICSEARCH_URL || "http://localhost:9200",
  maxRetries: 5,
  requestTimeout: 60000,
  sniffOnStart: true,
});

const ElasticTransport = class ElasticTransport extends Transport {
  async log(info: any, callback: () => void) {
    try {
      // First try to ping Elasticsearch to ensure connection
      await elasticClient.ping();

      const indexName = `logs-${env.APP_NAME}-${env.ENV}`.toLowerCase(); // Elasticsearch indices must be lowercase

      await elasticClient.index({
        index: indexName,
        document: {
          "@timestamp": new Date().toISOString(),
          message: info.message,
          level: info.level,
          service: env.APP_NAME,
          environment: env.ENV,
          metadata: info, // Store additional info in a metadata field to prevent field conflicts
        },
      });

      setImmediate(() => {
        this.emit("logged", info);
      });
    } catch (error) {
      console.error("Error sending logs to Elasticsearch:", error);
      // Re-throw the error so Winston knows the log failed
      throw error;
    }

    callback();
  }
};

export const createElasticLogger = () => {
  const transports = [
    new winston.transports.Console({
      stderrLevels: ["error", "warn", "info"],
    }),
  ];

  // Only add Elasticsearch transport in non-development environments
  if (env.ENV !== "development" && env.ALLOW_ELASTIC_LOGGING === "on") {
    // @ts-ignore
    transports.push(new ElasticTransport());
  }

  return winston.createLogger({
    level: env.ENV === "development" ? "debug" : "info",
    format: winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DDTHH:mm:ss.SSSZ",
      }),
      winston.format.errors({ stack: true }),
      ecsFormat({ convertReqRes: true })
    ),
    defaultMeta: {
      service: env.APP_NAME,
      environment: env.ENV,
    },
    transports,
  });
};
