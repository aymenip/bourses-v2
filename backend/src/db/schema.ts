import { relations } from "drizzle-orm";
import { bigint, mysqlTable, timestamp, varchar, text, mysqlEnum, int, date, boolean, float } from "drizzle-orm/mysql-core";


/// USER SCHEMA
export const users = mysqlTable("users", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull().unique(),
    password: varchar("password", { length: 256 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),

    roleId: bigint("roleId", { mode: "number", unsigned: true }).notNull().references(() => roles.id),
});

export const logs = mysqlTable("logs", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    details: text("details"),

    userId: bigint("userId", { mode: "number", unsigned: true }).notNull().references(() => users.id),
})

export const roles = mysqlTable("roles", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
})

export const userRelations = relations(users, ({ one }) => ({
    role: one(roles, { fields: [users.roleId], references: [roles.id] }),
}))

export const logsRelations = relations(logs, ({ one }) => ({
    user: one(users, { fields: [logs.userId], references: [users.id] }),
}))


/// TEACHER SCHEMA
export const teachers = mysqlTable("teachers", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    firstname: varchar("firstname", { length: 256 }).notNull(),
    lastname: varchar("lastname", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }),
    dob: date("dob", { mode: "date" }),
    matrialStatus: mysqlEnum('matrialStatus', ['متزوج', 'أعزب']),
    age: int("age"),
    highPostion: boolean("highPostion").notNull().$default(() => false),
    debt: float("debt").default(0),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),

    positionId: bigint("positionId", { mode: "number", unsigned: true }).notNull().references(() => positions.id, { onDelete: "cascade" }),
});

export const teachersRelations = relations(teachers, ({ one }) => ({
    postion: one(positions, { fields: [teachers.positionId], references: [positions.id] })
}))



/// POSTION SCHEMA
export const positions = mysqlTable("positions", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
