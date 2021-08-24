import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongBoxComponent } from './song-box.component';

describe('SongBoxComponent', () => {
  let component: SongBoxComponent;
  let fixture: ComponentFixture<SongBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
