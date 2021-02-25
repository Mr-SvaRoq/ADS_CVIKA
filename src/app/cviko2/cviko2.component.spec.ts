import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cviko2Component } from './cviko2.component';

describe('Cviko2Component', () => {
  let component: Cviko2Component;
  let fixture: ComponentFixture<Cviko2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cviko2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cviko2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
