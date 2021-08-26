import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresTypePage } from './_type.component';

describe('GenresTypePage', () => {
  let component: GenresTypePage;
  let fixture: ComponentFixture<GenresTypePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenresTypePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenresTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
