import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-mongodb'

export async function up({
  payload: _payload,
  req: _req,
  session: _session,
}: MigrateUpArgs): Promise<void> {
  // Migration code
}

export async function down({
  payload: _payload,
  req: _req,
  session: _session,
}: MigrateDownArgs): Promise<void> {
  // Migration code
}
