import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmaTablosuComponent } from './sma-tablosu.component';

describe('SmaTablosuComponent', () => {
  let component: SmaTablosuComponent;
  let fixture: ComponentFixture<SmaTablosuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmaTablosuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmaTablosuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
