import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cviko4Component } from './cviko4.component';

describe('Cviko4Component', () => {
  let component: Cviko4Component;
  let fixture: ComponentFixture<Cviko4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cviko4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cviko4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
