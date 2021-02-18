import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cviko1Component } from './cviko1.component';

describe('Cviko1Component', () => {
  let component: Cviko1Component;
  let fixture: ComponentFixture<Cviko1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cviko1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cviko1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
