import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CobranzaListComponent } from './cobranza-list.component';

describe('CobranzaListComponent', () => {
  let component: CobranzaListComponent;
  let fixture: ComponentFixture<CobranzaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CobranzaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CobranzaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
