import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { License } from './license.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(License)
    private readonly licenseRepository: Repository<License>,
  ) {
    this.prepareTableWithMockData();
  }

  async prepareTableWithMockData() {
    const allLicenses = await this.licenseRepository.find();
    await this.licenseRepository.remove(allLicenses);

    const license = new License();
    license.license = 'key1';

    await this.licenseRepository.save(license);
  }

  root() {
    const license = this.licenseRepository.find();

    return license;
  }

  async activate(license: string, pc: string) {
    const foundLicense = await this.licenseRepository.findOne({ license });

    if (foundLicense === null || foundLicense === undefined) {
      throw new HttpException('Invalid license', HttpStatus.NOT_ACCEPTABLE);
    }

    if (
      foundLicense.pcUsed !== pc &&
      foundLicense.pcUsed !== undefined &&
      foundLicense.pcUsed !== null
    ) {
      throw new HttpException(
        'License has been already activated',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    foundLicense.pcUsed = pc;

    this.licenseRepository.save(foundLicense);
    return foundLicense;
  }
}
