import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, systemLogs, SystemLog, InsertSystemLog, rfidCredentials, RFIDCredential, InsertRFIDCredential, systemConfig, SensorCalibration, sensorCalibration, InsertSensorCalibration } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// System Logs queries
export async function createSystemLog(log: InsertSystemLog): Promise<SystemLog> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(systemLogs).values(log);
  const logs = await db.select().from(systemLogs).where(eq(systemLogs.id, result[0].insertId as number)).limit(1);
  return logs[0]!;
}

export async function getSystemLogs(userId?: number, limit = 100): Promise<SystemLog[]> {
  const db = await getDb();
  if (!db) return [];

  if (userId) {
    return await db.select().from(systemLogs).where(eq(systemLogs.userId, userId)).orderBy(desc(systemLogs.timestamp)).limit(limit);
  }
  return await db.select().from(systemLogs).orderBy(desc(systemLogs.timestamp)).limit(limit);
}

// RFID Credentials queries
export async function addRFIDCredential(credential: InsertRFIDCredential): Promise<RFIDCredential> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(rfidCredentials).values(credential);
  const creds = await db.select().from(rfidCredentials).where(eq(rfidCredentials.id, result[0].insertId as number)).limit(1);
  return creds[0]!;
}

export async function getRFIDCredentials(userId?: number): Promise<RFIDCredential[]> {
  const db = await getDb();
  if (!db) return [];

  if (userId) {
    return await db.select().from(rfidCredentials).where(eq(rfidCredentials.userId, userId));
  }
  return await db.select().from(rfidCredentials);
}

// System Configuration queries
export async function getSystemConfig(key: string): Promise<string | null> {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(systemConfig).where(eq(systemConfig.configKey, key)).limit(1);
  return result.length > 0 ? result[0]!.configValue : null;
}

export async function setSystemConfig(key: string, value: string, description?: string): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.insert(systemConfig).values({ configKey: key, configValue: value, description }).onDuplicateKeyUpdate({
    set: { configValue: value, description },
  });
}

// Sensor Calibration queries
export async function getSensorCalibration(): Promise<SensorCalibration[]> {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(sensorCalibration);
}

export async function updateSensorCalibration(sensorName: string, calibration: Partial<InsertSensorCalibration>): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.update(sensorCalibration).set(calibration).where(eq(sensorCalibration.sensorName, sensorName));
}
