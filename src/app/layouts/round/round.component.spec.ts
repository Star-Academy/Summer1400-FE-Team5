import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundLayout } from './round.component';

describe('RoundLayout', () => {
  let component: RoundLayout;
  let fixture: ComponentFixture<RoundLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoundLayout]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
