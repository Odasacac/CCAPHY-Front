import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioResponsabilidadesComponent } from './cambio-responsabilidades.component';

describe('CambioResponsabilidadPacienteComponent', () => {
  let component: CambioResponsabilidadesComponent;
  let fixture: ComponentFixture<CambioResponsabilidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambioResponsabilidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambioResponsabilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
