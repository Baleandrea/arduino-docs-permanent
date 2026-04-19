import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createSystemLog, getSystemLogs, addRFIDCredential, getRFIDCredentials, getSystemConfig, setSystemConfig, getSensorCalibration, updateSensorCalibration } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Arduino System Routers
  arduinoSystem: router({
    // Get system logs
    getLogs: protectedProcedure
      .input(z.object({ limit: z.number().default(100) }).optional())
      .query(async ({ ctx, input }) => {
        return await getSystemLogs(ctx.user.id, input?.limit);
      }),

    // Create system log
    createLog: protectedProcedure
      .input(z.object({
        eventType: z.string(),
        state: z.string(),
        sensorData: z.string().optional(),
        description: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await createSystemLog({
          userId: ctx.user.id,
          eventType: input.eventType as any,
          state: input.state as any,
          sensorData: input.sensorData,
          description: input.description,
        });
      }),
  }),

  // RFID Management
  rfid: router({
    // Get RFID credentials
    getCredentials: protectedProcedure.query(async ({ ctx }) => {
      return await getRFIDCredentials(ctx.user.id);
    }),

    // Add RFID credential
    addCredential: protectedProcedure
      .input(z.object({
        uid: z.string(),
        label: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await addRFIDCredential({
          userId: ctx.user.id,
          uid: input.uid,
          label: input.label,
        });
      }),
  }),

  // System Configuration
  config: router({
    // Get configuration value
    get: publicProcedure
      .input(z.object({ key: z.string() }))
      .query(async ({ input }) => {
        return await getSystemConfig(input.key);
      }),

    // Set configuration value (admin only)
    set: protectedProcedure
      .input(z.object({
        key: z.string(),
        value: z.string(),
        description: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Only admins can modify configuration');
        }
        await setSystemConfig(input.key, input.value, input.description);
        return { success: true };
      }),
  }),

  // Sensor Calibration
  sensors: router({
    // Get calibration data
    getCalibration: publicProcedure.query(async () => {
      return await getSensorCalibration();
    }),

    // Update calibration (admin only)
    updateCalibration: protectedProcedure
      .input(z.object({
        sensorName: z.string(),
        ldrThresholdOn: z.number().optional(),
        ldrThresholdOff: z.number().optional(),
        delayAlarmSeconds: z.number().optional(),
        timeoutRfidSeconds: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new Error('Only admins can modify calibration');
        }
        await updateSensorCalibration(input.sensorName, {
          ldrThresholdOn: input.ldrThresholdOn,
          ldrThresholdOff: input.ldrThresholdOff,
          delayAlarmSeconds: input.delayAlarmSeconds,
          timeoutRfidSeconds: input.timeoutRfidSeconds,
        });
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
