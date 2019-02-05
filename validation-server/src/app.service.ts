import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { License } from './license.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(License)
    private readonly licenseRepository: Repository<License>,
  ) {
    const license = new License();
    license.license = 'key1';

    this.licenseRepository.save(license);
  }

  root() {
    const license = this.licenseRepository.find();

    return license;
  }
}
