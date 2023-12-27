import { ActivityRepository } from '@/repositories/activity-repository';
import { Filter, getPopulate } from '@/utils/filter-manager';
import { Activity, Prisma } from '@prisma/client';
import { ActivityNotFoundError } from '../error/activity-not-found-error';

interface Request {
  id: number;
  filter?: Filter;
}

interface Response {
  activity: Activity;
}

export class FindActivityCase {
  constructor(private activityRepository: ActivityRepository) {}

  async execute({ id, filter }: Request): Promise<Response> {
    const options: Prisma.ActivityFindManyArgs = {
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

    const activity = await this.activityRepository.findById(id, options);
    if (!activity) {
      throw new ActivityNotFoundError();
    }

    return { activity };
  }
}
