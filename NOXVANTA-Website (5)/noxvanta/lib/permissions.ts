export type TeamRole = 'owner' | 'sub' | 'igl' | 'authorized' | 'admin' | 'member';
export function getTeamRole(user: any): TeamRole | null {
  const role = user?.app_metadata?.team_role ?? user?.app_metadata?.role;
  if (role === 'admin') return 'owner';
  return ['owner','sub','igl','authorized','member'].includes(role) ? role : null;
}
export function canManageStrategies(user: any) {
  return ['owner','sub','igl','authorized'].includes(getTeamRole(user) || '');
}
export function canManagePlayers(user: any) {
  return ['owner','sub'].includes(getTeamRole(user) || '');
}
