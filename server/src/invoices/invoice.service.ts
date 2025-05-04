import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Invoice } from './dto/invoice.dto';

const prisma = new PrismaClient();

@Injectable()
export class InvoiceService {
  async getInvoices(): Promise<Invoice[]> {
    const invoices = await prisma.invoice.findMany();

    return invoices;
  }

  async getInvoiceById(invoiceId: number): Promise<Invoice> {
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
      },
    });

    if (invoice === null) {
      throw new HttpException('Could not find an invoice for this id', HttpStatus.NOT_FOUND);
    }

    return invoice;
  }
}
