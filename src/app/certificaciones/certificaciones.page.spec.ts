import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificacionesPage } from './certificaciones.page';

describe('CertificacionesPage', () => {
  let component: CertificacionesPage;
  let fixture: ComponentFixture<CertificacionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
