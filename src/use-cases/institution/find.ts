import { InstitutionRepository } from '@/repositories/institution-repository';
import { Institution } from '@prisma/client';
import { InstitutionNotFoundError } from '../error/institution-not-found-error';

interface Request {
  id: number;
}

interface Response {
  institution: Institution;
}

export class Find {
  constructor(private institutionRepository: InstitutionRepository) {}

  async execute({ id }: Request): Promise<Response> {
    const institution = await this.institutionRepository.findById(id);
    if (!institution) {
      throw new InstitutionNotFoundError();
    }

    return { institution };
  }
}
