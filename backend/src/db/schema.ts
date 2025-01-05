import { relations } from "drizzle-orm";
import {
  int,
  bigint,
  mysqlTable,
  timestamp,
  varchar,
  text,
  mysqlEnum,
  date,
  boolean,
} from "drizzle-orm/mysql-core";

/// USER SCHEMA
export const users = mysqlTable("users", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  firstname: varchar("firstname", { length: 256 }).notNull(),
  lastname: varchar("lastname", { length: 256 }).notNull(),
  dob: date("dob", { mode: "date" }),
  matrialStatus: mysqlEnum("matrialStatus", ["متزوج", "أعزب"]),
  email: varchar("email", { length: 256 }).notNull().unique(),
  password: varchar("password", { length: 256 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),

  roleId: bigint("roleId", { mode: "number", unsigned: true })
    .notNull()
    .references(() => roles.id),
});

export const userRelations = relations(users, ({ one }) => ({
  role: one(roles, { fields: [users.roleId], references: [roles.id] }),
}));

/// STUDENTS SCHEMA
export const admins = mysqlTable("admins", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),

  userId: bigint("userId", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  permissionId: bigint("permissionId", { mode: "number", unsigned: true })
    .notNull()
    .references(() => permissions.id),
});

export const adminsRelations = relations(admins, ({ one }) => ({
  user: one(users, { fields: [admins.userId], references: [users.id] }),
  permission: one(permissions, {
    fields: [admins.permissionId],
    references: [permissions.id],
  }),
}));

export const logs = mysqlTable("logs", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  details: text("details"),

  userId: bigint("userId", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id),
});

export const logsRelations = relations(logs, ({ one }) => ({
  user: one(users, { fields: [logs.userId], references: [users.id] }),
}));

export const roles = mysqlTable("roles", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  code: varchar("code", { length: 256 }).notNull(),
  title: varchar("title", { length: 256 }).notNull(),
});

export const permissions = mysqlTable("permissions", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  code: varchar("code", { length: 256 }).notNull(),
  title: varchar("title", { length: 256 }).notNull(),
});

export const adminRelations = relations(admins, ({ one }) => ({
  permission: one(permissions, {
    fields: [admins.permissionId],
    references: [permissions.id],
  }),
}));

/// TEACHER SCHEMA
export const teachers = mysqlTable("teachers", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  highPostion: boolean("highPostion")
    .notNull()
    .$default(() => false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),

  userId: bigint("userId", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  positionId: bigint("positionId", { mode: "number", unsigned: true })
    .notNull()
    .references(() => positions.id, { onDelete: "cascade" }),
});

export const teachersRelations = relations(teachers, ({ one }) => ({
  user: one(users, { fields: [teachers.userId], references: [users.id] }),
  postion: one(positions, {
    fields: [teachers.positionId],
    references: [positions.id],
  }),
}));

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
  highPostion: boolean("highPostion")
    .notNull()
    .$default(() => false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),

  userId: bigint("userId", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const employeesRelations = relations(employees, ({ one }) => ({
  user: one(users, { fields: [employees.userId], references: [users.id] }),
}));

/// STUDENTS SCHEMA
export const students = mysqlTable("students", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),

  userId: bigint("userId", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const studentsRelations = relations(students, ({ one }) => ({
  user: one(users, { fields: [students.userId], references: [users.id] }),
}));

// FORM SCHEMA
export const forms = mysqlTable("forms", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  title: varchar("title", { length: 1024 }),
  creator: bigint("creator", { mode: "number", unsigned: true })
    .references(() => users.id)
    .notNull(),
});

export const formsRelations = relations(forms, ({ one }) => ({
  creator: one(users, { fields: [forms.creator], references: [users.id] }),
}));

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
});

export const formsAccessRelations = relations(formsAccess, ({ one }) => ({
  form: one(forms, { fields: [formsAccess.formId], references: [forms.id] }),
  role: one(roles, { fields: [formsAccess.roleId], references: [roles.id] }),
}));

// FIELD SCHEMA (unofficiel)
export const fields = mysqlTable("fields", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  label: varchar("label", { length: 256 }),

  formId: bigint("formId", { mode: "number", unsigned: true })
    .references(() => forms.id, { onDelete: "cascade" })
    .notNull(),
});

export const fieldsRelations = relations(fields, ({ one }) => ({
  form: one(forms, { fields: [fields.formId], references: [forms.id] }),
}));

export const typedFields = mysqlTable("typedFields", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  type: mysqlEnum("type", ["text", "date", "number", "url", "email"]),
  points: int("points", { unsigned: true }),
  label: varchar("label", { length: 256 }),
  fieldId: bigint("fieldId", { mode: "number", unsigned: true })
    .references(() => fields.id, { onDelete: "cascade" })
    .notNull(),
});

export const typedFieldsRelations = relations(typedFields, ({ one }) => ({
  field: one(fields, {
    fields: [typedFields.fieldId],
    references: [fields.id],
  }),
}));

export const sourceableFields = mysqlTable("sourceableFields", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  source: mysqlEnum("type", ["certificate", "book", "article", "conference"]),
  points: int("points", { unsigned: true }),
  label: varchar("label", { length: 256 }),
  fieldId: bigint("fieldId", { mode: "number", unsigned: true })
    .references(() => fields.id, { onDelete: "cascade" })
    .notNull(),
});

export const sourceableFieldsRelations = relations(
  sourceableFields,
  ({ one }) => ({
    field: one(fields, {
      fields: [sourceableFields.fieldId],
      references: [fields.id],
    }),
  })
);

export const documents = mysqlTable("documents", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  type: varchar("type", { length: 5 }),
  path: varchar("type", { length: 2048 }),

  userId: bigint("userId", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const documentsRelations = relations(documents, ({ one }) => ({
  creator: one(users, { fields: [documents.userId], references: [users.id] }),
}));

export const certificates = mysqlTable("certeficates", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  documentId: bigint("documentId", { mode: "number", unsigned: true })
    .references(() => documents.id)
    .notNull(),
});

export const certificatesRelations = relations(certificates, ({ one }) => ({
  document: one(documents, {
    fields: [certificates.documentId],
    references: [documents.id],
  }),
}));

export const books = mysqlTable("books", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  documentId: bigint("documentId", { mode: "number", unsigned: true })
    .references(() => documents.id)
    .notNull(),
});

export const booksRelations = relations(books, ({ one }) => ({
  document: one(documents, {
    fields: [books.documentId],
    references: [documents.id],
  }),
}));

export const articles = mysqlTable("articles", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  documentId: bigint("documentId", { mode: "number", unsigned: true })
    .references(() => documents.id)
    .notNull(),
});

export const articlesRelations = relations(articles, ({ one }) => ({
  document: one(documents, {
    fields: [articles.documentId],
    references: [documents.id],
  }),
}));

export const conferences = mysqlTable("conferencse", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  documentId: bigint("documentId", { mode: "number", unsigned: true })
    .references(() => documents.id)
    .notNull(),
});

export const conferencesRelations = relations(conferences, ({ one }) => ({
  document: one(documents, {
    fields: [conferences.documentId],
    references: [documents.id],
  }),
}));

/// FORM SUBMISSIONS SCHEMA
export const formSubmissions = mysqlTable("formSubmissions", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  formId: bigint("formId", { mode: "number", unsigned: true })
    .references(() => forms.id)
    .notNull(),
  userId: bigint("userId", { mode: "number", unsigned: true })
    .references(() => users.id)
    .notNull(),
  status: mysqlEnum("status", ["draft", "submitted"])
    .default("draft")
    .notNull(),
  data: text("data").notNull(), // JSON to store form data
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const formSubmissionsRelations = relations(
  formSubmissions,
  ({ one }) => ({
    form: one(forms, {
      fields: [formSubmissions.formId],
      references: [forms.id],
    }),
    user: one(users, {
      fields: [formSubmissions.userId],
      references: [users.id],
    }),
  })
);
