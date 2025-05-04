import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Invoice } from './dto/invoice.dto';
import { JwtAuthGuard } from 'src/auth/jwtGuard';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly appService: InvoiceService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getInvoices(): Promise<Invoice[]> {
    return await this.appService.getInvoices();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getInvoiceById(@Param('id', new ParseIntPipe()) id: number): Promise<Invoice> {
    return await this.appService.getInvoiceById(id);
  }
}
