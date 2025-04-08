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
  year,
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
  positionId: bigint("positionId", { mode: "number", unsigned: true })
    .notNull()
    .references(() => positions.id),
});

export const userRelations = relations(users, ({ one }) => ({
  role: one(roles, { fields: [users.roleId], references: [roles.id] }),
  position: one(positions, {
    fields: [users.positionId],
    references: [positions.id],
  }),
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
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),

  userId: bigint("userId", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
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
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const permissions = mysqlTable("permissions", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  code: varchar("code", { length: 256 }).notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
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
  highPosition: boolean("highPosition").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),

  userId: bigint("userId", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const teachersRelations = relations(teachers, ({ one }) => ({
  user: one(users, { fields: [teachers.userId], references: [users.id] }),
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
  title: varchar("title", { length: 1024 }).notNull(),
  creator: bigint("creator", { mode: "number", unsigned: true })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
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
    .references(() => forms.id, { onDelete: "cascade" })
    .notNull(),
  positionId: bigint("positionId", { mode: "number", unsigned: true })
    .references(() => positions.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const formsAccessRelations = relations(formsAccess, ({ one }) => ({
  form: one(forms, { fields: [formsAccess.formId], references: [forms.id] }),
  position: one(positions, {
    fields: [formsAccess.positionId],
    references: [positions.id],
  }),
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
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
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
  required: boolean("required").default(false).notNull(),
  blockId: bigint("blockId", { mode: "number", unsigned: true })
    .references(() => fields.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const typedFieldsRelations = relations(typedFields, ({ one }) => ({
  field: one(fields, {
    fields: [typedFields.blockId],
    references: [fields.id],
  }),
}));

export const sourceableFields = mysqlTable("sourceableFields", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  type: mysqlEnum("type", [
    "certificate",
    "book",
    "article",
    "conference",
    "thesis",
  ]),
  points: int("points", { unsigned: true }),
  label: varchar("label", { length: 256 }),
  required: boolean("required").default(false).notNull(),
  blockId: bigint("blockId", { mode: "number", unsigned: true })
    .references(() => fields.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const sourceableFieldsRelations = relations(
  sourceableFields,
  ({ one }) => ({
    field: one(fields, {
      fields: [sourceableFields.blockId],
      references: [fields.id],
    }),
  })
);

export const documents = mysqlTable("documents", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  type: varchar("type", { length: 5 }),
  path: varchar("path", { length: 2048 }),

  userId: bigint("userId", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const documentsRelations = relations(documents, ({ one }) => ({
  creator: one(users, { fields: [documents.userId], references: [users.id] }),
}));

export const certificates = mysqlTable("certificates", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  documentId: bigint("documentId", { mode: "number", unsigned: true })
    .references(() => documents.id, { onDelete: "cascade" })
    .notNull(),
  userId: bigint("userId", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  issuer: varchar("issuer", { length: 255 }).notNull(), // Organization that issued the certificate
  issueDate: date("issueDate").notNull(),
  expirationDate: date("expirationDate"),
  certificateId: varchar("certificateId", { length: 100 }).unique(), // Optional (for tracking)
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const certificatesRelations = relations(certificates, ({ one }) => ({
  document: one(documents, {
    fields: [certificates.documentId],
    references: [documents.id],
  }),
  user: one(users, {
    fields: [certificates.userId],
    references: [users.id],
  }),
}));

export const books = mysqlTable("books", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  documentId: bigint("documentId", { mode: "number", unsigned: true })
    .references(() => documents.id, { onDelete: "cascade" })
    .notNull(),
  userId: bigint("userId", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(), // Optional
  year: date("year").notNull(), // Optional
  author: varchar("author", { length: 255 }), // Optional
  isbn: varchar("isbn", { length: 20 }).unique(), // Optional
  publisher: varchar("publisher", { length: 255 }), // Optional
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const booksRelations = relations(books, ({ one }) => ({
  document: one(documents, {
    fields: [books.documentId],
    references: [documents.id],
  }),
  user: one(users, {
    fields: [books.userId],
    references: [users.id],
  }),
}));

export const articles = mysqlTable("articles", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  documentId: bigint("documentId", { mode: "number", unsigned: true })
    .references(() => documents.id, { onDelete: "cascade" })
    .notNull(),
  userId: bigint("userId", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(), // Optional
  authors: varchar("authors", { length: 1024 }), // Optional (comma-separated list or JSON array)
  journal: varchar("journal", { length: 255 }).notNull(), // Optional (Journal name)
  volume: varchar("volume", { length: 50 }), // Optional (Volume number)
  issue: varchar("issue", { length: 50 }), // Optional (Issue number)
  pages: varchar("pages", { length: 50 }), // Optional (Page range)
  publicationDate: date("publicationDate"), // Optional
  doi: varchar("doi", { length: 100 }), // Optional (DOI for reference)
  classification: mysqlEnum("classification", ["A", "B", "C", "D", "E", "F"])
    .notNull()
    .default("C"), // Article classification
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const articlesRelations = relations(articles, ({ one }) => ({
  document: one(documents, {
    fields: [articles.documentId],
    references: [documents.id],
  }),
  user: one(users, {
    fields: [articles.userId],
    references: [users.id],
  }),
}));

export const conferences = mysqlTable("conferences", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  documentId: bigint("documentId", { mode: "number", unsigned: true })
    .references(() => documents.id, { onDelete: "cascade" })
    .notNull(),
  userId: bigint("userId", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(), // (Conference Paper Title)
  conferenceName: varchar("conferenceName", { length: 255 }).notNull(), // (Conference Name)
  location: varchar("location", { length: 255 }).notNull(), // (Conference Location)
  date: date("date"), // Optional (Conference Date)
  classification: mysqlEnum("classification", [
    "A",
    "B",
    "C",
    "D",
    "E",
  ]).default("C"), // Conference classification/ranking
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const conferencesRelations = relations(conferences, ({ one }) => ({
  document: one(documents, {
    fields: [conferences.documentId],
    references: [documents.id],
  }),
  user: one(users, {
    fields: [conferences.userId],
    references: [users.id],
  }),
}));

export const theses = mysqlTable("theses", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),

  documentId: bigint("documentId", { mode: "number", unsigned: true })
    .references(() => documents.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  isSupervisor: boolean("isSupervisor").default(false).notNull(),
  year: date("year").notNull(),
  type: mysqlEnum("type", ["phd", "master", "license"]).notNull(),
  userId: bigint("userId", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const thesesRelations = relations(theses, ({ one }) => ({
  document: one(documents, {
    fields: [theses.documentId],
    references: [documents.id],
  }),
  user: one(users, {
    fields: [theses.userId],
    references: [users.id],
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
    .references(() => users.id, { onDelete: "cascade" })
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
