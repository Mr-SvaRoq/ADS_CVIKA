import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cviko5Component } from './cviko5.component';

describe('Cviko5Component', () => {
  let component: Cviko5Component;
  let fixture: ComponentFixture<Cviko5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cviko5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cviko5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
