export class GenerateTokenError extends Error {
  constructor() {
    super('Failed to generate client token');
  }
}
