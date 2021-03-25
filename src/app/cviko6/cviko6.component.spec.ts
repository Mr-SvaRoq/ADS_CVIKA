import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cviko6Component } from './cviko6.component';

describe('Cviko6Component', () => {
  let component: Cviko6Component;
  let fixture: ComponentFixture<Cviko6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cviko6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cviko6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
