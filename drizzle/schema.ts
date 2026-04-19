import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * System Logs Table: Persiste gli eventi di sistema (armamento, disarmo, intrusioni, errori sensori)
 */
export const systemLogs = mysqlTable("system_logs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id),
  eventType: mysqlEnum("eventType", [
    "armed",
    "disarmed",
    "intrusion_detected",
    "sensor_error",
    "rfid_auth_success",
    "rfid_auth_failed",
    "alarm_triggered",
    "alarm_disabled",
    "system_startup",
    "system_shutdown",
  ]).notNull(),
  state: mysqlEnum("state", ["0", "1", "2", "3", "4", "5", "6"]).notNull(),
  sensorData: text("sensorData"), // JSON string with sensor states
  description: text("description"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type SystemLog = typeof systemLogs.$inferSelect;
export type InsertSystemLog = typeof systemLogs.$inferInsert;

/**
 * System Configuration Table: Memorizza i parametri di configurazione del sistema
 */
export const systemConfig = mysqlTable("system_config", {
  id: int("id").autoincrement().primaryKey(),
  configKey: varchar("configKey", { length: 64 }).notNull().unique(),
  configValue: text("configValue").notNull(),
  description: text("description"),
  dataType: mysqlEnum("dataType", ["string", "number", "boolean", "json"]).default("string"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SystemConfiguration = typeof systemConfig.$inferSelect;
export type InsertSystemConfiguration = typeof systemConfig.$inferInsert;

/**
 * RFID Credentials Table: Memorizza gli UID autorizzati dei badge RFID
 */
export const rfidCredentials = mysqlTable("rfid_credentials", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id),
  uid: varchar("uid", { length: 32 }).notNull().unique(),
  label: varchar("label", { length: 128 }),
  isActive: int("isActive").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type RFIDCredential = typeof rfidCredentials.$inferSelect;
export type InsertRFIDCredential = typeof rfidCredentials.$inferInsert;

/**
 * Sensor Calibration Table: Memorizza i parametri di calibrazione dei sensori
 */
export const sensorCalibration = mysqlTable("sensor_calibration", {
  id: int("id").autoincrement().primaryKey(),
  sensorName: varchar("sensorName", { length: 64 }).notNull(),
  pin: varchar("pin", { length: 8 }).notNull(),
  ldrThresholdOn: int("ldrThresholdOn").default(150),
  ldrThresholdOff: int("ldrThresholdOff").default(250),
  delayAlarmSeconds: int("delayAlarmSeconds").default(5),
  timeoutRfidSeconds: int("timeoutRfidSeconds").default(10),
  calibrationDate: timestamp("calibrationDate").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SensorCalibration = typeof sensorCalibration.$inferSelect;
export type InsertSensorCalibration = typeof sensorCalibration.$inferInsert;