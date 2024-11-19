import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioContrasenyaComponent } from './cambio-contrasenya.component';

describe('CambioContrasenyaComponent', () => {
  let component: CambioContrasenyaComponent;
  let fixture: ComponentFixture<CambioContrasenyaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambioContrasenyaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambioContrasenyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
