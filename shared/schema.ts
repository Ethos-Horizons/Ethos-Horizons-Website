import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Admin Users Table (matches your existing table)
export const adminUsers = pgTable("admin_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  service: text("service"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Blog Posts Table (matches your existing table)
export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  category: text("category").notNull(),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  imageUrl: text("image_url"),
  published: boolean("published").notNull().default(false),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdBy: varchar("created_by").references(() => adminUsers.id),
});

// Portfolio Projects Table (matches your portfolio_items table)
export const portfolioProjects = pgTable("portfolio_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  technologies: jsonb("technologies").$type<string[]>().notNull().default([]),
  results: text("results").notNull(),
  featured: boolean("featured").notNull().default(false),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Content Management Table (for pricing, hero content, etc.)
export const contentManagement = pgTable("content_management", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contentKey: text("content_key").notNull().unique(),
  contentValue: jsonb("content_value").notNull(),
  contentType: text("content_type").notNull(), // 'pricing', 'hero', 'about', etc.
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Validation Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  company: true,
  service: true,
  message: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  excerpt: true,
  content: true,
  author: true,
  category: true,
  tags: true,
  imageUrl: true,
  published: true,
  slug: true,
});

export const insertPortfolioProjectSchema = createInsertSchema(portfolioProjects).pick({
  title: true,
  description: true,
  imageUrl: true,
  technologies: true,
  results: true,
  featured: true,
  slug: true,
});

export const insertContentManagementSchema = createInsertSchema(contentManagement).pick({
  contentKey: true,
  contentValue: true,
  contentType: true,
});

// Update Schemas (for editing existing content)
export const updateBlogPostSchema = insertBlogPostSchema.partial().extend({
  id: z.string(),
});

export const updatePortfolioProjectSchema = insertPortfolioProjectSchema.partial().extend({
  id: z.string(),
});

export const updateContentManagementSchema = insertContentManagementSchema.partial().extend({
  id: z.string(),
});

// Type exports
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertPortfolioProject = z.infer<typeof insertPortfolioProjectSchema>;
export type PortfolioProject = typeof portfolioProjects.$inferSelect;
export type InsertContentManagement = z.infer<typeof insertContentManagementSchema>;
export type ContentManagement = typeof contentManagement.$inferSelect;
export type UpdateBlogPost = z.infer<typeof updateBlogPostSchema>;
export type UpdatePortfolioProject = z.infer<typeof updatePortfolioProjectSchema>;
export type UpdateContentManagement = z.infer<typeof updateContentManagementSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;
