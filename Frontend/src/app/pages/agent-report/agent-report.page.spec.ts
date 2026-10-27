import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentReportPage } from './agent-report.page';

describe('AgentReportPage', () => {
  let component: AgentReportPage;
  let fixture: ComponentFixture<AgentReportPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentReportPage],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
