const hello = async (): Promise<{
  isError: boolean;
  message: string;
  data?: any;
  errorCode: "NO_ERROR" | "ERROR";
}> => {
  return {
    isError: false,
    message: "Hello World",
    errorCode: "NO_ERROR",
    data: {
      message: "Hello World",
    },
  };
};
export const exampleService = {
  hello,
};
