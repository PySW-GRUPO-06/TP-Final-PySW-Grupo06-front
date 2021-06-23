import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarAlumnosComponent } from './administrar-alumnos.component';

describe('AdministrarAlumnosComponent', () => {
  let component: AdministrarAlumnosComponent;
  let fixture: ComponentFixture<AdministrarAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarAlumnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
