import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KmaTablosuComponent } from './kma-tablosu.component';

describe('KmaTablosuComponent', () => {
  let component: KmaTablosuComponent;
  let fixture: ComponentFixture<KmaTablosuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KmaTablosuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KmaTablosuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
