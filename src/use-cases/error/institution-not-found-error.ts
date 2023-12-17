export class InstitutionNotFoundError extends Error {
  constructor() {
    super('Institution not found');
  }
}
