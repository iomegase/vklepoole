import "server-only";

import type { Collection } from "mongodb";

import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { getMongoDb, isMongoConfigured } from "@/lib/mongodb/client";
import type { AdminRecord } from "@/lib/site/types";

let fallbackAdminRecord: AdminRecord | null = null;

function createAdminRecord(email: string, password: string) {
  const now = new Date().toISOString();

  return {
    email,
    passwordHash: hashPassword(password),
    createdAt: now,
    updatedAt: now,
  } satisfies AdminRecord;
}

async function getAdminCollection(): Promise<Collection<AdminRecord> | null> {
  const db = await getMongoDb();
  return db ? db.collection<AdminRecord>("admins") : null;
}

async function ensureFallbackAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    return null;
  }

  if (!fallbackAdminRecord) {
    fallbackAdminRecord = createAdminRecord(email, password);
  }

  return fallbackAdminRecord;
}

async function ensureMongoAdmin() {
  const collection = await getAdminCollection();

  if (!collection) {
    return null;
  }

  const count = await collection.countDocuments();

  if (count > 0) {
    return collection;
  }

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    return collection;
  }

  await collection.insertOne(createAdminRecord(email, password));
  return collection;
}

export async function authenticateAdmin(email: string, password: string) {
  if (isMongoConfigured()) {
    const collection = await ensureMongoAdmin();

    if (!collection) {
      return false;
    }

    const admin = await collection.findOne({ email });
    return admin ? verifyPassword(password, admin.passwordHash) : false;
  }

  const fallbackAdmin = await ensureFallbackAdmin();
  return fallbackAdmin
    ? fallbackAdmin.email === email &&
        verifyPassword(password, fallbackAdmin.passwordHash)
    : false;
}

export async function getAdminCount() {
  if (isMongoConfigured()) {
    const collection = await ensureMongoAdmin();
    return collection ? collection.countDocuments() : 0;
  }

  return (await ensureFallbackAdmin()) ? 1 : 0;
}
