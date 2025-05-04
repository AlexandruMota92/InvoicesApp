import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { InvoiceModule } from './invoices/invoice.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    InvoiceModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
