// src/app/api/contracts/route.ts
export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const pageParam = searchParams.get('page') ?? '1'
    const perPageParam = searchParams.get('perPage') ?? '10'
    const q = searchParams.get('q')?.trim() || ''

    const page = Math.max(Number(pageParam) || 1, 1)
    const perPage = Math.max(Number(perPageParam) || 10, 1)

    const skip = (page - 1) * perPage

    const where: Prisma.ContractInstanceWhereInput =
  q.length > 0
    ? {
        OR: [
          {
            clientName: {
              contains: q,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            clientDocument: {
              contains: q,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        ],
      }
    : {}

    const [items, total] = await Promise.all([
      prisma.contractInstance.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: perPage,
        select: {
          id: true,
          clientName: true,
          clientDocument: true,
          clientEmail: true,
          systemName: true,
          planName: true,
          status: true,
          startDate: true,
          createdAt: true,
          signedAt: true,
          pdfUrl: true,
          token: true,
        },
      }),
      prisma.contractInstance.count({ where }),
    ])

    const totalPages = Math.max(Math.ceil(total / perPage), 1)

    return NextResponse.json({
      items,
      total,
      page,
      perPage,
      totalPages,
    })
  } catch (err) {
    console.error('Error listing contracts:', err)
    return NextResponse.json(
      { error: 'Erro ao listar contratos.' },
      { status: 500 },
    )
  }
}
