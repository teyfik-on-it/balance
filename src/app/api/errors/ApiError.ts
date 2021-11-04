/**
 * Exception class for custom Exchange Rates API responses.
 */
export class ApiError extends Error {
  constructor(readonly code: number, message: string) {
    super(message);
  }
}
