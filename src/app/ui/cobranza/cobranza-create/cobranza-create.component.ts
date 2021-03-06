import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { DataService } from 'src/app/core/data/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { TableConfig, TableEvent } from 'patternfly-ng';

@Component({
  selector: 'cobro-cobranza-create',
  templateUrl: './cobranza-create.component.html',
  styleUrls: ['./cobranza-create.component.scss']
})
export class CobranzaCreateComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  working = false;

  fecha: Date = new Date();

  /*Deuda Grid */
  @ViewChild('fechaTemplate') fechaTemplate: TemplateRef<any>;
  @ViewChild('totalVentaTemplate') totalVentaTemplate: TemplateRef<any>;
  @ViewChild('totalCobradoTemplate') totalCobradoTemplate: TemplateRef<any>;
  @ViewChild('totalDeudaTemplate') totalDeudaTemplate: TemplateRef<any>;
  @ViewChild('cuotaTemplate') cuotaTemplate: TemplateRef<any>;

  allRows: any[];
  columns: any[];
  rows: any[];
  tableConfig: TableConfig;

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
    this.buildGrid();
    this.data.personas().getAll().subscribe(data => {
      if (data.success) {
        this.personas = data.response;
      } else {
        this.personas = [];
      }
    }, error => {
      this.data.messages().error("Error en obtener clientes.");
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

  buildGrid() {
    this.columns = [
      { cellTemplate: this.fechaTemplate, draggable: true, prop: 'fecha', name: 'Fecha Venta', resizeable: true },
      { cellTemplate: this.totalVentaTemplate, draggable: true, prop: 'totalVenta', name: 'Total Venta', resizeable: true },
      { cellTemplate: this.totalCobradoTemplate, draggable: true, prop: 'totalCobrado', name: 'Total Cobrado', resizeable: true },
      { cellTemplate: this.totalDeudaTemplate, draggable: true, prop: 'totalDeuda', name: 'Total Deuda', resizeable: true },
      { cellTemplate: this.cuotaTemplate, draggable: true, prop: 'cuota', name: 'Cuota', resizeable: true },
    ];

    this.tableConfig = {
      showCheckbox: true
    } as TableConfig;
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
        .pipe(map((term: string) => (term === '' ? this.personas : this.personas.filter(v => (v.nombreCompleto).toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)));
    }
  }

  buildForm() {
    this.form = this.fb.group({
      fecha: [this.fecha, Validators.compose([Validators.required, Validators.maxLength(100)])],
      personaId: [null, Validators.compose([Validators.required])],
      ventaId: [null, Validators.compose([Validators.required])],
      usuarioCreaId: [null, Validators.compose([Validators.required])],
      nombreCompleto: [null, Validators.compose([Validators.required])],
      montoCobro: [null, Validators.compose([Validators.required])],
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
    this.buildDeuda(selected.item.id);
  }

  buildDeuda(clienteId) {
    this.data.cobranzas().deuda(clienteId).subscribe((d: any) => {
      if (d.success) {
        this.rows = d.response;
      } else {
        this.data.messages().warning("El cliente no tiene deudas.");
      }
    }, error => {
      this.data.messages().error("Ocurrieron problemas al obtner la deuda del cliente.");
    })
  }

  onSelection($event: TableEvent): void {
    this.allRows = $event.selectedRows;
    if ($event.selectedRows.length > 1) {
      this.data.messages().warning("Por favor seleccione solamente una deuda.");
      return;
    }
    let data = $event.selectedRows[0];
    this.form.patchValue({
      ventaId: data.venta_Id,
      montoCobro: data.venta_CuotaDiaria
    });
  }

  save(form) {
    if (!this.form.valid) {
      this.data.messages().warning("Datos incompletos, por favor registre los campos obligatorios");
      return;
    }
    if (this.allRows.length > 1) {
      this.data.messages().warning("Datos incompletos, por favor seleccione solamente una deuda");
      return;
    }
    this.data.cobranzas().cobro(this.form.value).subscribe(
      (data) => {
        if (data.success) {
          this.data.messages().success("Cobro al cliente registrada correctamente");
          this.cancel();
        } else {
          this.data.messages().error("Error al registrar el cobro al cliente, por favor intentelo mas tarde");
        }
      }, error => {
        this.data.messages().error("Error en registrar el cobro al cliente.");
      });
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
