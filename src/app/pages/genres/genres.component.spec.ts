import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresPage } from './genres.component';

describe('GenresComponent', () => {
  let component: GenresPage;
  let fixture: ComponentFixture<GenresPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenresPage]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
