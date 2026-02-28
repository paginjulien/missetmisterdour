import { bigint, int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const votes = mysqlTable('votes', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  candidateId: bigint('candidate_id', { mode: 'number' }).notNull(),
  ipHash: varchar('ip_hash', { length: 64 }).notNull(),
  userAgentHash: varchar('user_agent_hash', { length: 64 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const voteAggregates = mysqlTable('vote_aggregates', {
  candidateId: bigint('candidate_id', { mode: 'number' }).primaryKey(),
  totalVotes: int('total_votes').default(0).notNull(),
  uniqueVotes: int('unique_votes').default(0).notNull(),
  todayVotes: int('today_votes').default(0).notNull(),
});

export const socialTracking = mysqlTable('social_tracking', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  candidateId: bigint('candidate_id', { mode: 'number' }).notNull(),
  platform: varchar('platform', { length: 32 }).notNull(),
  shares: int('shares').default(0).notNull(),
  clicks: int('clicks').default(0).notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});
