import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarDieyaIdealesComponent } from './registrar-dieya-ideales.component';

describe('RegistrarDieyaIdealesComponent', () => {
  let component: RegistrarDieyaIdealesComponent;
  let fixture: ComponentFixture<RegistrarDieyaIdealesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarDieyaIdealesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarDieyaIdealesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
