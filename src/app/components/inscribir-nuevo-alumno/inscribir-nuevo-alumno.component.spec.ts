import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscribirNuevoAlumnoComponent } from './inscribir-nuevo-alumno.component';

describe('InscribirNuevoAlumnoComponent', () => {
  let component: InscribirNuevoAlumnoComponent;
  let fixture: ComponentFixture<InscribirNuevoAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscribirNuevoAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscribirNuevoAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
