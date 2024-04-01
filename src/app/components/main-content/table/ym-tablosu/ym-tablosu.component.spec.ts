import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YmTablosuComponent } from './ym-tablosu.component';

describe('YmTablosuComponent', () => {
  let component: YmTablosuComponent;
  let fixture: ComponentFixture<YmTablosuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YmTablosuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YmTablosuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
