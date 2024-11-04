import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeticionRealizadaComponent } from './peticion-realizada.component';

describe('PeticionRealizadaComponent', () => {
  let component: PeticionRealizadaComponent;
  let fixture: ComponentFixture<PeticionRealizadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeticionRealizadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeticionRealizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
