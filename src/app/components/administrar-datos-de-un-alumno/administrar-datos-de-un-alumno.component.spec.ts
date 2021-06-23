import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarDatosDeUnAlumnoComponent } from './administrar-datos-de-un-alumno.component';

describe('AdministrarDatosDeUnAlumnoComponent', () => {
  let component: AdministrarDatosDeUnAlumnoComponent;
  let fixture: ComponentFixture<AdministrarDatosDeUnAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarDatosDeUnAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarDatosDeUnAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
