import amqplib, { Channel, Connection } from "amqplib";
import { env } from "@/config/env";

let connection: Connection | null = null;
let channel: Channel | null = null;

export const OTP_QUEUE = "otp_queue";
export const SMS_QUEUE = "sms_queue";
export const EMAIL_QUEUE = "email_queue";
export const NOTIFICATION_QUEUE = "notification_queue";

const connectToRabbitMq = async (): Promise<Channel | null> => {
  if (connection && channel) {
    return channel;
  }

  try {
    connection = await amqplib.connect(env.RABBITMQ_URL as string);
    channel = await connection.createChannel();

    const queues = [OTP_QUEUE, SMS_QUEUE, EMAIL_QUEUE, NOTIFICATION_QUEUE];

    for (const queue of queues) {
      await channel.assertQueue(queue, { durable: false });
    }

    console.log("Connected to RabbitMQ");

    connection.on("error", (err) => {
      console.error("Connection error", err);
      connection = null;
      channel = null;
    });

    connection.on("close", () => {
      console.error("Connection closed");
      connection = null;
      channel = null;
    });

    return channel;
  } catch (err) {
    console.error("Failed to connect to RabbitMQ", err);
    setTimeout(connectToRabbitMq, 5000); // Retry after 5 seconds
    return null;
  }
};

export const sendMessage = async (
  queue: string,
  message: string
): Promise<void> => {
  const channel = await connectToRabbitMq();
  if (channel) {
    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`Message sent to ${queue}:`, message);
  } else {
    console.error("Failed to send message, no channel available");
  }
};

export const receiveMessages = async (
  queue: string,
  callback: (message: string) => void
): Promise<void> => {
  const channel = await connectToRabbitMq();
  if (channel) {
    channel.consume(queue, (msg) => {
      if (msg !== null) {
        callback(msg.content.toString());
        channel.ack(msg);
      }
    });
    console.log(`Waiting for messages in ${queue}`);
  } else {
    console.error("Failed to set up consumer, no channel available");
  }
};
