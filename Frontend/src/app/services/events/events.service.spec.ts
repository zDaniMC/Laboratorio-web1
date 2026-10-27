import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { API_URL } from '../../config/api.config';
import { EventsService } from './events.service';

describe('EventsService', () => {
  let service: EventsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(EventsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send the filters as query params', () => {
    service.getAll({ ciudad: 'Cali', estado: 'En Boleteria' }).subscribe();

    const req = httpMock.expectOne((r) => r.url === `${API_URL}/events`);
    expect(req.request.params.get('ciudad')).toBe('Cali');
    expect(req.request.params.get('estado')).toBe('En Boleteria');
    req.flush([]);
  });
});
