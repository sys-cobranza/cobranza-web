import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/core/data/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'cobro-venta-create',
  templateUrl: './venta-create.component.html',
  styleUrls: ['./venta-create.component.scss']
})
export class VentaCreateComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  working = false;
  fecha: Date = new Date();

  /*Autocomplete */
  private personas: any[] = [];
  search;
  formatter = (x: { nombreCompleto: string }) => x.nombreCompleto;
  @ViewChildren('ngbTypeahead') ngbPersonas: QueryList<NgbTypeahead>;
  private focusObservableList = Array<Subject<string>>();
  private clickObservableList = Array<Subject<string>>();
  focus$ = new Subject<string>();
  click$ = new Subject<string>();


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private data: DataService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.data.personas().getAll().subscribe(data => {
      if (data.success) {
        this.personas = data.response;
      } else {
        this.personas = [];
      }
    }, error => {
      this.data.messages().error("Error en obtener los clientes.");
    })
    this.buildPersonas();
  }

  ngAfterViewInit() {
    this.focus$.subscribe((item) => {
      let focusItem$: Subject<string>
      let i: number = parseInt(item);
      this.focusObservableList.some((focus, index) => {
        if (index === i) {
          focusItem$ = focus;
          return true;
        } else {
          return false
        }
      });
      focusItem$.next(item);
    });
  }


  buildPersonas() {
    this.search = (text$: Observable<string>) => {
      const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
      const inputClick$ = new Subject<string>();
      this.clickObservableList.push(inputClick$);
      const clicksWithClosedPopup$ = inputClick$
        .pipe(filter((item) => {
          let ngbTypeHeader: NgbTypeahead;
          let i: number = parseInt(item);
          this.ngbPersonas.some((value, index) => {
            if (i === index) {
              ngbTypeHeader = value;
              return true;
            }
            return false;
          });
          return ngbTypeHeader && !ngbTypeHeader.isPopupOpen()
        }),
          map(item => '')
        );
      const inputFocus$ = new Subject<string>();
      this.focusObservableList.push(inputFocus$);
      const focusSteam$ = inputFocus$.pipe(map((item) => ''));
      return merge(debouncedText$, focusSteam$, clicksWithClosedPopup$)
        .pipe(map((term: string) => (term === '' ? this.personas : this.personas.filter(v => (v.numeroDocumento + " - " + v.nombre + " " + v.apellidos).toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)));
    }
  }

  buildForm() {
    this.form = this.fb.group({
      fecha: [this.fecha, Validators.compose([Validators.required, Validators.maxLength(100)])],
      personaId: [null, Validators.compose([Validators.required])],
      usuarioCreaId: [null, Validators.compose([Validators.required])],
      nombreCompleto: [null, Validators.compose([Validators.required])],
      montoVenta: [null, Validators.compose([Validators.required])],
      cuotaDiaria: [null, Validators.compose([Validators.required])],
      descripcion: ['', Validators.compose([Validators.required, Validators.maxLength(200)])]
    });
    this.buildUsuario();
  }

  buildUsuario() {
    this.form.patchValue({
      usuarioCreaId: this.data.usuarios().getItem()
    });
  }

  selectedItem(selected, form) {
    form.patchValue({
      personaId: selected.item.id,
      nombreCompleto: { nombreCompleto: selected.item.numeroDocumento + " - " + selected.item.nombre + " " + selected.item.apellidos },
    });
  }

  save(form) {
    if (!this.form.valid) {
      this.data.messages().warning("Datos incompletos, por favor registre los campos obligatorios");
      return;
    }
    this.data.cobranzas().venta(this.form.value).subscribe(
      (data) => {
        if (data.success) {
          this.data.messages().success("Venta registrada correctamente");
          this.cancel();
        } else {
          this.data.messages().error("Error al registrar la venta, por favor intentelo mas tarde");
        }
      }, error => {
        this.data.messages().error("Error en registrar la venta.");
      });
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
