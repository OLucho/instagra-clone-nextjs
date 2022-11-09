/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const db =
  global.prisma ||
  new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.prisma = db
