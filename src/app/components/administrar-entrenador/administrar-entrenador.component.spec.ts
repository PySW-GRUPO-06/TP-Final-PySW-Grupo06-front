import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarEntrenadorComponent } from './administrar-entrenador.component';

describe('AdministrarEntrenadorComponent', () => {
  let component: AdministrarEntrenadorComponent;
  let fixture: ComponentFixture<AdministrarEntrenadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarEntrenadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarEntrenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
