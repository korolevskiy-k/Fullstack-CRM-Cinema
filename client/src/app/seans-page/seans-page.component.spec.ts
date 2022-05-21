import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeansPageComponent } from './seans-page.component';

describe('SeansPageComponent', () => {
  let component: SeansPageComponent;
  let fixture: ComponentFixture<SeansPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeansPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeansPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
