import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnexpiredComponent } from './unexpired.component';

describe('UnexpiredComponent', () => {
  let component: UnexpiredComponent;
  let fixture: ComponentFixture<UnexpiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnexpiredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnexpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
