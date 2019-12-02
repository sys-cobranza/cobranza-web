import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { PaginationConfig, TableConfig, PaginationEvent, ActionConfig, SortField, EmptyStateConfig, FilterConfig, SortConfig, ToolbarConfig, FilterType, FilterField, Action, Filter, FilterEvent, SortEvent, TableEvent } from 'patternfly-ng';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/core/data/data.service';

@Component({
  selector: 'cobro-cobranza-list',
  templateUrl: './cobranza-list.component.html',
  styleUrls: ['./cobranza-list.component.scss']
})
export class CobranzaListComponent implements AfterViewInit, OnInit {

  @ViewChild('documentoTemplate') documentoTemplate: TemplateRef<any>;
  @ViewChild('clienteTemplate') clienteTemplate: TemplateRef<any>;
  @ViewChild('fechaVentaTemplate') fechaVentaTemplate: TemplateRef<any>;
  @ViewChild('montoVentaTemplate') montoVentaTemplate: TemplateRef<any>;
  @ViewChild('cuotaDiariaTemplate') cuotaDiariaTemplate: TemplateRef<any>;
  @ViewChild('usuarioCreacionTemplate') usuarioCreacionTemplate: TemplateRef<any>;
  @ViewChild('descripcionTemplate') descripcionTemplate: TemplateRef<any>;
  @ViewChild('accionTemplate') accionTemplate: TemplateRef<any>;

  allRows: any[];
  columns: any[];
  currentSortField: SortField;
  tableConfig: TableConfig;
  filterConfig: FilterConfig;
  filteredRows: any[];
  filtersText: string = '';
  isAscendingSort: boolean = true;
  paginationConfig: PaginationConfig;
  rows: any[];
  rowsAvailable: boolean = true;
  separator: Object;
  sortConfig: SortConfig;
  toolbarConfig: ToolbarConfig;

  constructor(
    private data: DataService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  vender(): void {
    this.router.navigate(["./vender"], { relativeTo: this.route });
  }
  cobrar(): void {
    this.router.navigate(["./cobrar"], { relativeTo: this.route });
  }

  edit(id): void {
    console.log(id);
  }
  delete(id): void {
    console.log(id);
  }

  ngAfterViewInit(): void {
    this.updateRows(false); // Reinitialize expanded rows in order to render properly with tabs
  }

  ngOnInit(): void {
    this.columns = [
      { cellTemplate: this.documentoTemplate, draggable: true, prop: 'documento', name: 'Num Documento', resizeable: false, sortable: false, width: "100" },
      { cellTemplate: this.clienteTemplate, draggable: true, prop: 'cliente', name: 'Cliente', resizeable: true, sortable: false, width: "30" },
      { cellTemplate: this.fechaVentaTemplate, draggable: true, prop: 'fechaVenta', name: 'Fecha Venta', resizeable: false, sortable: false, width: "5" },
      { cellTemplate: this.montoVentaTemplate, draggable: true, prop: 'montoVenta', name: 'Monto Venta', resizeable: true, sortable: false, width: "5" },
      { cellTemplate: this.cuotaDiariaTemplate, draggable: true, prop: 'cuotaDiaria', name: 'Cuota Diaria', resizeable: true, sortable: false, width: "5" },
      { cellTemplate: this.usuarioCreacionTemplate, draggable: true, prop: 'usuarioCreacion', name: 'Usuario Creacion', resizeable: true, sortable: false, width: "10" },
      { cellTemplate: this.descripcionTemplate, draggable: true, prop: 'descripcion', name: 'Descripcion', resizeable: true, sortable: false, width: "20" },
      { cellTemplate: this.accionTemplate, draggable: true, prop: 'id', name: 'Acciones', resizeable: true, sortable: false, width: "10" }
    ];

    this.data.cobranzas().getAll().subscribe(d => {
      if (d.success) {
        this.allRows = d.response;
        this.filteredRows = this.allRows;
        this.updateGrid();
      } else {
        this.data.messages().error(d.message);
      }
    }, error => {
      this.data.messages().error("Error cargado los usuarios.");
    });
  }

  updateGrid() {
    this.paginationConfig = {
      pageNumber: 1,
      pageSize: 3,
      pageSizeIncrements: [2, 3, 4],
      totalItems: this.filteredRows.length
    } as PaginationConfig;
    // Need to initialize for results/total counts
    this.updateRows(false);
    this.filterConfig = {
      fields: [
        { id: 'numeroDocumento', title: 'Num Documento', placeholder: 'Buscar por Num Documento...', type: FilterType.TEXT },
        { id: 'nombre', title: 'Nombre', placeholder: 'Buscar por Nombre...', type: FilterType.TEXT },
        { id: 'apellidos', title: 'Apellidos', placeholder: 'Buscar por Apellidos...', type: FilterType.TEXT },
        { id: 'fechaVenta', title: 'Fecha Venta', placeholder: 'Buscar por Fecha Venta...', type: FilterType.TEXT },
        { id: 'montoVenta', title: 'MontoVenta', placeholder: 'Buscar por Monto Venta...', type: FilterType.TEXT },
        { id: 'cuotaDiaria', title: 'Cuota Diaria', placeholder: 'Buscar por Cuota Diaria...', type: FilterType.TEXT },
        { id: 'usuarioCreacion', title: 'Usuario Creacion', placeholder: 'Buscar por Usuario Creacion...', type: FilterType.TEXT }
      ] as FilterField[],
      appliedFilters: [],
      resultsCount: this.rows.length,
      totalCount: this.allRows.length
    } as FilterConfig;

    this.sortConfig = {
      fields: [
        { id: 'numeroDocumento', title: 'Num Documento', sortType: 'alpha' },
        { id: 'nombre', title: 'Nombre', sortType: 'alpha' },
        { id: 'apellidos', title: 'Apellidos', sortType: 'alpha' },
        { id: 'fechaVenta', title: 'Fecha Venta', sortType: 'alpha' },
        { id: 'montoVenta', title: 'Monto Venta', sortType: 'alpha' },
        { id: 'cuotaDiaria', title: 'Cuota Diaria', sortType: 'alpha' },
        { id: 'usuarioCreacion', title: 'Usuario Creacion', sortType: 'alpha' }
      ],
      isAscending: this.isAscendingSort
    } as SortConfig;

    this.toolbarConfig = {
      filterConfig: this.filterConfig,
      sortConfig: this.sortConfig
    } as ToolbarConfig;

    this.tableConfig = {
      paginationConfig: this.paginationConfig,
      showCheckbox: false,
      toolbarConfig: this.toolbarConfig,
      useExpandRows: true
    } as TableConfig;
  }


  applyFilters(filters: Filter[]): void {
    this.filteredRows = [];
    if (filters && filters.length > 0) {
      this.allRows.forEach((item) => {
        if (this.matchesFilters(item, filters)) {
          this.filteredRows.push(item);
        }
      });
    } else {
      this.filteredRows = this.allRows;
    }
    this.toolbarConfig.filterConfig.resultsCount = this.filteredRows.length;
    this.updateRows(true);
  }

  // Handle filter changes
  filterChanged($event: FilterEvent): void {
    this.filtersText = '';
    $event.appliedFilters.forEach((filter) => {
      this.filtersText += filter.field.title + ' : ' + filter.value + '\n';
    });
    this.applyFilters($event.appliedFilters);
  }

  matchesFilter(item: any, filter: Filter): boolean {
    let match = true;
    let re = new RegExp(filter.value, 'i');
    if (filter.field.id === 'numeroDocumento') {
      match = item.persona.numeroDocumento.match(re) !== null;
    } else if (filter.field.id === 'nombre') {
      match = item.persona.nombre.match(re) !== null;
    } else if (filter.field.id === 'apellidos') {
      match = item.persona.apellidos === filter.value;
    } else if (filter.field.id === 'fechaVenta') {
      match = item.fecha === filter.value;
    } else if (filter.field.id === 'montoVenta') {
      match = item.montoVenta === filter.value;
    } else if (filter.field.id === 'cuotaDiaria') {
      match = item.cuotaDiaria === filter.value;
    }else if (filter.field.id === 'usuarioCreacion') {
      match = item.usuario_crea.userName === filter.value;
    }
    return match;
  }

  matchesFilters(item: any, filters: Filter[]): boolean {
    let matches = true;
    filters.forEach((filter) => {
      if (!this.matchesFilter(item, filter)) {
        matches = false;
        return matches;
      }
    });
    return matches;
  }

  // Pagination
  handlePageSize($event: PaginationEvent): void {
    this.updateRows(false);
  }

  handlePageNumber($event: PaginationEvent): void {
    this.updateRows(false);
  }

  updateRows(reset: boolean): void {
    if (reset) {
      this.paginationConfig.pageNumber = 1;
    }
    if (this.filteredRows) {
      this.paginationConfig.totalItems = this.filteredRows.length;
      this.rows = this.filteredRows.slice((this.paginationConfig.pageNumber - 1) * this.paginationConfig.pageSize,
        this.paginationConfig.totalItems).slice(0, this.paginationConfig.pageSize);
    }
  }

  // Sort
  compare(item1: any, item2: any): number {
    let compValue = 0;
    if (this.currentSortField.id === 'numeroDocumento') {
      compValue = item1.persona.numeroDocumento.localeCompare(item2.persona.numeroDocumento);
    } else if (this.currentSortField.id === 'nombre') {
      compValue = item1.persona.nombre.localeCompare(item2.persona.nombre);
    } else if (this.currentSortField.id === 'apellidos') {
      compValue = item1.persona.apellidos.localeCompare(item2.persona.apellidos);
    } else if (this.currentSortField.id === 'fechaVenta') {
      compValue = item1.fecha.localeCompare(item2.fecha);
    } else if (this.currentSortField.id === 'montoVenta') {
      compValue = item1.montoVenta.localeCompare(item2.montoVenta);
    } else if (this.currentSortField.id === 'cuotaDiaria') {
      compValue = item1.cuotaDiaria.localeCompare(item2.cuotaDiaria);
    }else if (this.currentSortField.id === 'usuarioCreacion') {
      compValue = item1.usuario_crea.userName.localeCompare(item2.usuario_crea.userName);
    }
    if (!this.isAscendingSort) {
      compValue = compValue * -1;
    }
    return compValue;
  }

  // Handle sort changes
  handleSortChanged($event: SortEvent): void {
    this.currentSortField = $event.field;
    this.isAscendingSort = $event.isAscending;
    this.allRows.sort((item1: any, item2: any) => this.compare(item1, item2));
    this.applyFilters(this.filterConfig.appliedFilters || []);
  }

  updateItemsAvailable(): void {
    if (this.rowsAvailable) {
      this.toolbarConfig.filterConfig.totalCount = this.allRows.length;
      this.filteredRows = this.allRows;
      this.updateRows(false);
    } else {
      // Clear previously applied properties to simulate no rows available
      this.toolbarConfig.filterConfig.totalCount = 0;
      this.filterConfig.appliedFilters = [];
      this.rows = [];
    }
  }
}