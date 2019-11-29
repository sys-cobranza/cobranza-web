import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CobranzaCreateComponent } from './cobranza-create.component';

describe('CobranzaCreateComponent', () => {
  let component: CobranzaCreateComponent;
  let fixture: ComponentFixture<CobranzaCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CobranzaCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CobranzaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
