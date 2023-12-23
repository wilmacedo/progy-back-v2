import { ActivityRepository } from '@/repositories/activity-repository';
import { Filter, getPopulate } from '@/utils/filter-manager';
import { Activity, Prisma } from '@prisma/client';

interface ListRequest {
  planningId: number;
  filter?: Filter;
}

interface ListResponse {
  activities: Activity[];
}

export class List {
  constructor(private activityRepository: ActivityRepository) {}

  async execute({ planningId, filter }: ListRequest): Promise<ListResponse> {
    const options: Prisma.ActivityFindManyArgs = {
      where: {
        planning_id: planningId,
      },
      select: {
        id: true,
        name: true,
        responsible: true,
        date_start: true,
        date_end: true,
        planning_id: true,
        state_id: true,
        initiative_id: true,
        file: true,
        value: true,
        comments: true,
        created_at: true,
        updated_at: true,
      },
    };

    const populate = getPopulate(filter);
    if (populate !== null) {
      options.select = {
        ...options.select,
        ...populate.select,
      };
    }

    const activities = await this.activityRepository.list(options);

    return { activities };
  }
}
