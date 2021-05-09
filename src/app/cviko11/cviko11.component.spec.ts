import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cviko11Component } from './cviko11.component';

describe('Cviko11Component', () => {
  let component: Cviko11Component;
  let fixture: ComponentFixture<Cviko11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cviko11Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cviko11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
