import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarRutinasComponent } from './administrar-rutinas.component';

describe('AdministrarRutinasComponent', () => {
  let component: AdministrarRutinasComponent;
  let fixture: ComponentFixture<AdministrarRutinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarRutinasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarRutinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
