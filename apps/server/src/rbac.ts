export const ROLES = {
  USER: 1,
  CANDIDATE: 2,
  PRESS: 3,
  PHOTOGRAPHER: 4,
  STAFF: 5,
  MARKETING: 6,
  ORGANIZER: 7,
  ADMIN: 8,
  SUPER_ADMIN: 9,
} as const;

export type RoleName = keyof typeof ROLES;
export type RoleLevel = (typeof ROLES)[RoleName];

export function hasPermission(actorLevel: RoleLevel, requiredLevel: RoleLevel): boolean {
  return actorLevel >= requiredLevel;
}
