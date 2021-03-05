import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cviko3Component } from './cviko3.component';

describe('Cviko3Component', () => {
  let component: Cviko3Component;
  let fixture: ComponentFixture<Cviko3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cviko3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cviko3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
