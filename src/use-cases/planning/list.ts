import { PlanningRepository } from '@/repositories/planning-repository';
import { AccessTokenData } from '@/types/access-token';
import { RoleAccess, getRoleAccess } from '@/utils/roles';
import { Planning, Prisma } from '@prisma/client';

interface ListRequest {
  userData: AccessTokenData;
}

interface ListResponse {
  plannings: Planning[];
}

export class List {
  constructor(private planningRepository: PlanningRepository) {}

  async execute({ userData }: ListRequest): Promise<ListResponse> {
    const {
      role,
      user: { institution_id },
    } = userData;

    const options: Prisma.PlanningFindManyArgs = {
      select: {
        id: true,
        name: true,
        institution_id: true,
        created_at: true,
        institutions: {
          select: {
            name: true,
          },
        },
      },
      where: {},
    };

    if (getRoleAccess(role) === RoleAccess.LOW) {
      options.where = { institution_id };
    }

    const plannings = await this.planningRepository.list(options);

    return { plannings };
  }
}
