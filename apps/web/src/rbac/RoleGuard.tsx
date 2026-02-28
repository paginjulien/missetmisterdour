import { ReactNode } from 'react';

type RoleGuardProps = {
  canAccess: boolean;
  fallback?: ReactNode;
  children: ReactNode;
};

export function RoleGuard({ canAccess, fallback = null, children }: RoleGuardProps) {
  return canAccess ? <>{children}</> : <>{fallback}</>;
}
