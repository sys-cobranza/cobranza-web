import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CobranzaEditComponent } from './cobranza-edit.component';

describe('CobranzaEditComponent', () => {
  let component: CobranzaEditComponent;
  let fixture: ComponentFixture<CobranzaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CobranzaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CobranzaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
