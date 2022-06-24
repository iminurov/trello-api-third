import { Module } from '@nestjs/common';
import { MonitorsService } from './monitors.service';
import { MonitorsController } from './monitors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Monitor } from './monitor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Monitor])],
  controllers: [MonitorsController],
  providers: [MonitorsService],
  exports: [MonitorsService],
})
export class MonitorsModule {}
