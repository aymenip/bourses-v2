import { relations } from "drizzle-orm";
import { bigint, mysqlTable, timestamp, varchar, text, mysqlEnum, int, date, boolean, float } from "drizzle-orm/mysql-core";


/// USER SCHEMA
export const users = mysqlTable("users", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    firstname: varchar("firstname", { length: 256 }).notNull(),
    lastname: varchar("lastname", { length: 256 }).notNull(),
    dob: date("dob", { mode: "date" }),
    matrialStatus: mysqlEnum('matrialStatus', ['متزوج', 'أعزب']),
    email: varchar("email", { length: 256 }).notNull().unique(),
    password: varchar("password", { length: 256 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),

    roleId: bigint("roleId", { mode: "number", unsigned: true }).notNull().references(() => roles.id),

});

export const admins = mysqlTable("admins", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    firstname: varchar("firstname", { length: 256 }).notNull(),
    lastname: varchar("lastname", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull().unique(),
    password: varchar("password", { length: 256 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),

    permissionId: bigint("permissionId", { mode: "number", unsigned: true }).notNull().references(() => permissions.id),
})

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
    code: varchar("code", { length: 256 }).notNull(),
    title: varchar("title", { length: 256 }).notNull(),
})

export const permissions = mysqlTable("permissions", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    code: varchar("code", { length: 256 }).notNull(),
    title: varchar("title", { length: 256 }).notNull(),
})

export const adminRelations = relations(admins, ({ one }) => ({
    permission: one(permissions, { fields: [admins.permissionId], references: [permissions.id] }),
}))

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
    highPostion: boolean("highPostion").notNull().$default(() => false),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),

    userId: bigint("userId", { mode: "number", unsigned: true }).notNull().references(() => users.id, { onDelete: "cascade" }),
    positionId: bigint("positionId", { mode: "number", unsigned: true }).notNull().references(() => positions.id, { onDelete: "cascade" }),
});

export const teachersRelations = relations(teachers, ({ one }) => ({
    user: one(users, { fields: [teachers.userId], references: [users.id] }),
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



/// EMPLOYEE SCHEMA
export const employees = mysqlTable("employees", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    highPostion: boolean("highPostion").notNull().$default(() => false),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),

    userId: bigint("userId", { mode: "number", unsigned: true }).notNull().references(() => users.id, { onDelete: "cascade" }),
});


/// STUDENTS SCHEMA
export const students = mysqlTable("students", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),

    userId: bigint("userId", { mode: "number", unsigned: true }).notNull().references(() => users.id, { onDelete: "cascade" }),
});


// FORM SCHEMA
export const forms = mysqlTable('forms', {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    title: varchar('title', { length: 1024 }),
    creator: bigint("creator", { mode: "number", unsigned: true }).references(() => users.id).notNull(),
});

export const formRelations = relations(forms, ({ one, many }) => ({
    creator: one(users, { fields: [forms.creator], references: [users.id] }),
}))

// FORM ACCESS SCHEMA
export const formsAccess = mysqlTable("formsAccess", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    formId: bigint("formId", { mode: "number", unsigned: true })
        .references(() => forms.id)
        .notNull(),
    roleId: bigint("roleId", { mode: "number", unsigned: true })
        .references(() => roles.id)
        .notNull(),
})

export const formsAccessRelations = relations(formsAccess, ({ one }) => ({
    form: one(forms, { fields: [formsAccess.formId], references: [forms.id] }),
    role: one(roles, { fields: [formsAccess.roleId], references: [roles.id] }),
}))



// FIELD SCHEMA (unofficiel)
export const fields = mysqlTable("fields", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    label: varchar("label", { length: 256 }),

    formId: bigint("formId", { mode: "number", unsigned: true })
        .references(() => forms.id)
        .notNull()
})


export const typedFields = mysqlTable("typedFields", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    type: mysqlEnum('type', ['text', 'date', 'number', 'url', 'email']),
    value: varchar("value", { length: 2048 }),

    fieldId: bigint("fieldId", { mode: "number", unsigned: true }).references(() => fields.id).notNull(),
})

export const typedFieldsRelations = relations(typedFields, ({ one }) => ({
    field: one(fields, { fields: [typedFields.fieldId], references: [fields.id] }),
}))

export const sourceableFields = mysqlTable("sourceableFields", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    source: mysqlEnum('type', ['certificate', 'book', 'article', 'conference']),
    documentId: bigint("documentId", { mode: "number", unsigned: true }).references(() => documents.id).notNull(),
    fieldId: bigint("fieldId", { mode: "number", unsigned: true }).references(() => fields.id).notNull()
})

export const sourceableFieldsRelations = relations(sourceableFields, ({ one }) => ({
    field: one(fields, { fields: [sourceableFields.fieldId], references: [fields.id] }),
    document: one(documents, { fields: [sourceableFields.documentId], references: [documents.id] })
}))



export const documents = mysqlTable("documents", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    type: varchar("type", { length: 5 }),
    path: varchar("type", { length: 2048 }),

})

export const certificate = mysqlTable("certeficate", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    documentId: bigint("documentId", { mode: "number", unsigned: true }).references(() => documents.id).notNull(),
})

export const book = mysqlTable("book", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    documentId: bigint("documentId", { mode: "number", unsigned: true }).references(() => documents.id).notNull(),
})

export const article = mysqlTable("article", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    documentId: bigint("documentId", { mode: "number", unsigned: true }).references(() => documents.id).notNull(),
})

export const conference = mysqlTable("conference", {
    id: bigint("id", { mode: "number", unsigned: true })
        .autoincrement()
        .primaryKey(),
    documentId: bigint("documentId", { mode: "number", unsigned: true }).references(() => documents.id).notNull(),
})