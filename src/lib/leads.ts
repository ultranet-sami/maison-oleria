import { prisma } from "@/lib/db";
import type { Lead as PrismaLead, LeadType as PrismaLeadType, PaymentStatus as PrismaPaymentStatus } from "@prisma/client";

/**
 * Postgres-backed lead store (Prisma).
 * -------------------------------------------------------------
 * Replaces the previous data/leads.json file store, which was NOT
 * safe on Vercel (ephemeral filesystem, multi-instance, no
 * durability guarantee across redeploys). All reads/writes are now
 * persistent and safe under concurrent serverless invocations.
 *
 * Public LeadType/PaymentStatus strings are kept lowercase for
 * backward compatibility with existing calling code; they map 1:1
 * onto the Prisma enums (uppercase) at the boundary.
 * -------------------------------------------------------------
 */

export type LeadType = "contact" | "newsletter" | "reservation" | "consultation";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface Lead {
  id: string;
  type: LeadType;
  createdAt: string;
  name?: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  budget?: string;
  formule?: string;
  price?: number;
  paymentMode?: string;
  paymentStatus?: PaymentStatus;
  occasion?: string;
  morpho?: string;
  saison?: string;
  styleGoal?: string;
  raw?: Record<string, unknown>;
}

function toPrismaType(t: LeadType): PrismaLeadType {
  return t.toUpperCase() as PrismaLeadType;
}
function fromPrismaType(t: PrismaLeadType): LeadType {
  return t.toLowerCase() as LeadType;
}
function toPrismaStatus(s?: PaymentStatus): PrismaPaymentStatus | undefined {
  return s ? (s.toUpperCase() as PrismaPaymentStatus) : undefined;
}
function fromPrismaStatus(s?: PrismaPaymentStatus | null): PaymentStatus | undefined {
  return s ? (s.toLowerCase() as PaymentStatus) : undefined;
}

function mapLead(l: PrismaLead): Lead {
  return {
    id: l.id,
    type: fromPrismaType(l.type),
    createdAt: l.createdAt.toISOString(),
    name: l.name ?? undefined,
    email: l.email,
    phone: l.phone ?? undefined,
    service: l.service ?? undefined,
    message: l.message ?? undefined,
    budget: l.budget ?? undefined,
    formule: l.formule ?? undefined,
    price: l.price ?? undefined,
    paymentMode: l.paymentMode ?? undefined,
    paymentStatus: fromPrismaStatus(l.paymentStatus),
    occasion: l.occasion ?? undefined,
    morpho: l.morpho ?? undefined,
    saison: l.saison ?? undefined,
    styleGoal: l.styleGoal ?? undefined,
    raw: (l.raw as Record<string, unknown>) ?? undefined,
  };
}

export async function saveLead(lead: Omit<Lead, "id" | "createdAt">): Promise<Lead> {
  const created = await prisma.lead.create({
    data: {
      type: toPrismaType(lead.type),
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      service: lead.service,
      message: lead.message,
      budget: lead.budget,
      formule: lead.formule,
      price: lead.price,
      paymentMode: lead.paymentMode,
      paymentStatus: toPrismaStatus(lead.paymentStatus),
      occasion: lead.occasion,
      morpho: lead.morpho,
      saison: lead.saison,
      styleGoal: lead.styleGoal,
      raw: lead.raw ? (lead.raw as object) : undefined,
    },
  });
  return mapLead(created);
}

export async function readLeads(limit = 200): Promise<Lead[]> {
  const all = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return all.map(mapLead);
}

export async function getLeadById(id: string): Promise<Lead | undefined> {
  const l = await prisma.lead.findUnique({ where: { id } });
  return l ? mapLead(l) : undefined;
}

export async function updateLead(id: string, patch: Partial<Lead>): Promise<Lead | undefined> {
  try {
    const updated = await prisma.lead.update({
      where: { id },
      data: {
        name: patch.name,
        phone: patch.phone,
        service: patch.service,
        message: patch.message,
        budget: patch.budget,
        formule: patch.formule,
        price: patch.price,
        paymentMode: patch.paymentMode,
        paymentStatus: toPrismaStatus(patch.paymentStatus),
        occasion: patch.occasion,
        morpho: patch.morpho,
        saison: patch.saison,
        styleGoal: patch.styleGoal,
      },
    });
    return mapLead(updated);
  } catch {
    return undefined;
  }
}

// File contains AI-generated response based on internal company sources
