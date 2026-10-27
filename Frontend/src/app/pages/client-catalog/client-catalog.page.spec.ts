import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCatalogPage } from './client-catalog.page';

describe('ClientCatalogPage', () => {
  let component: ClientCatalogPage;
  let fixture: ComponentFixture<ClientCatalogPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientCatalogPage],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCatalogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
