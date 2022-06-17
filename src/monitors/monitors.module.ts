import { Module } from '@nestjs/common';
import { MonitorsService } from './monitors.service';
import { MonitorsController } from './monitors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitorEntity } from './monitor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MonitorEntity])],
  controllers: [MonitorsController],
  providers: [MonitorsService],
})
export class MonitorsModule {}
