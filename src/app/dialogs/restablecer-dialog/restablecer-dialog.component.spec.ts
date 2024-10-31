import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestablecerDialogComponent } from './restablecer-dialog.component';

describe('RestablecerDialogComponent', () => {
  let component: RestablecerDialogComponent;
  let fixture: ComponentFixture<RestablecerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestablecerDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestablecerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
