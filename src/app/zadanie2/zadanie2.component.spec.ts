import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zadanie2Component } from './zadanie2.component';

describe('Zadanie2Component', () => {
  let component: Zadanie2Component;
  let fixture: ComponentFixture<Zadanie2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Zadanie2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Zadanie2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
