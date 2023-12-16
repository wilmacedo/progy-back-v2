export enum Role {
  ADMIN = 'admin',
  SUBADMIN = 'subadmin',
  MANAGER = 'manager',
  USER = 'user',
}

export enum RoleAccess {
  HIGH,
  LOW,
}

const roleList = Object.values(Role).map(val => String(val));
roleList.shift();

export const availableRoles: [string, ...string[]] = ['admin', ...roleList];

const highRoles = [Role.ADMIN, Role.SUBADMIN, Role.MANAGER];

export function getRoleAccess(role: string | Role): RoleAccess {
  if (typeof role === 'string') {
    for (const r of highRoles) {
      if (r.toString() === role) {
        return RoleAccess.HIGH;
      }
    }
  }

  return RoleAccess.LOW;
}
