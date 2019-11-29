import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CobranzaViewComponent } from './cobranza-view.component';

describe('CobranzaViewComponent', () => {
  let component: CobranzaViewComponent;
  let fixture: ComponentFixture<CobranzaViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CobranzaViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CobranzaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
