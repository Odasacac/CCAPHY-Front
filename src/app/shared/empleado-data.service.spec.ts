import { TestBed } from '@angular/core/testing';

import { EmpleadoDataService } from './empleado-data.service';

describe('UserDataService', () => {
  let service: EmpleadoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadoDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
