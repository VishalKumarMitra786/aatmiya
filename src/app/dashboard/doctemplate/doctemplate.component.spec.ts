import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctemplateComponent } from './doctemplate.component';

describe('DoctemplateComponent', () => {
  let component: DoctemplateComponent;
  let fixture: ComponentFixture<DoctemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
