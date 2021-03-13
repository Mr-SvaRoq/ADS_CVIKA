import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zadanie1Component } from './zadanie1.component';

describe('Zadanie1Component', () => {
  let component: Zadanie1Component;
  let fixture: ComponentFixture<Zadanie1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Zadanie1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Zadanie1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
