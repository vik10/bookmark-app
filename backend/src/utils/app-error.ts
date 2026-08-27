export type CustomError = Error & {
  statusCode: number;
};

export const createAppError = (
  message: string,
  statusCode: number,
): CustomError => {
  const error = new Error(message) as CustomError;
  error.statusCode = statusCode;

  return error;
};

export const isCustomError = (error: unknown): error is CustomError => {
  return (
    error instanceof Error &&
    "statusCode" in error &&
    typeof error.statusCode === "number"
  );
};
