import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageConsumptionComponent } from './average-consumption.component';

describe('AverageConsumptionComponent', () => {
  let component: AverageConsumptionComponent;
  let fixture: ComponentFixture<AverageConsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageConsumptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AverageConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
