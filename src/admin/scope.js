/* Small helpers that encode the "role per cabang" rules used throughout
   the admin panel: a Super Admin (or Finance, which is also HQ-wide) sees
   everything; an Admin Cabang only sees / manages data tied to their own
   branch. Kept in one place so every page applies the same rule. */

export function isSuperScope(user) {
  return !user || user.branch === "Semua Cabang";
}

/** Filter a list of rows down to the user's branch, matching against
 *  whichever of the given keys exists on the row (rows use different
 *  field names: "branch", "branchName", "cabang", "name"/"city" for
 *  the branch list itself). */
export function scopeByBranch(rows, user, keys = ["branch", "branchName", "cabang"]) {
  if (isSuperScope(user)) return rows;
  return rows.filter((row) => keys.some((k) => row[k] === user.branch));
}

/** Only Super Admin can manage other admins or trigger destructive/global
 *  actions like database backups. */
export function canManageUsers(user) {
  return !user || user.role === "Super Admin";
}

export function canManageBackup(user) {
  return !user || user.role === "Super Admin";
}
