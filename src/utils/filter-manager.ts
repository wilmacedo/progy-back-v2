export interface Filter {
  populate?: string;
}

interface SelectFilter {
  select: {
    [key: string]: {
      select: {
        [key: string]: boolean;
      };
    };
  };
}

export function getPopulate(filter: Filter | undefined): SelectFilter | null {
  if (!filter || !filter.populate || filter.populate.length === 0) {
    return null;
  }

  const splittedFilter = filter.populate.split(',');
  const filterObject: SelectFilter = {
    select: {},
  };

  for (const key of splittedFilter) {
    filterObject.select[key] = {
      select: {
        id: true,
        name: true,
      },
    };
  }

  return filterObject;
}
