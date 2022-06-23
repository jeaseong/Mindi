export class StatusError extends Error {
  constructor(public status: number | undefined = undefined, message?: string) {
    super(message);
  }
}