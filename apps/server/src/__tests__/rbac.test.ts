import { describe, expect, it } from 'vitest';
import { hasPermission, ROLES } from '../rbac';

describe('RBAC hierarchy', () => {
  it('allows higher roles to access lower roles', () => {
    expect(hasPermission(ROLES.SUPER_ADMIN, ROLES.ADMIN)).toBe(true);
    expect(hasPermission(ROLES.ADMIN, ROLES.USER)).toBe(true);
  });

  it('blocks lower roles for higher routes', () => {
    expect(hasPermission(ROLES.USER, ROLES.ADMIN)).toBe(false);
    expect(hasPermission(ROLES.CANDIDATE, ROLES.ORGANIZER)).toBe(false);
  });
});
