import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalEntrenadorComponent } from './principal-entrenador.component';

describe('PrincipalEntrenadorComponent', () => {
  let component: PrincipalEntrenadorComponent;
  let fixture: ComponentFixture<PrincipalEntrenadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalEntrenadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalEntrenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
