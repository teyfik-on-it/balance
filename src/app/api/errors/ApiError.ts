export class ApiError extends Error {
  constructor(readonly code: number, message: string) {
    super(message);
  }
}
