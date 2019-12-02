import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { PaginationConfig, TableConfig, PaginationEvent, ActionConfig, SortField, EmptyStateConfig, FilterConfig, SortConfig, ToolbarConfig, FilterType, FilterField, Action, Filter, FilterEvent, SortEvent, TableEvent } from 'patternfly-ng';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/core/data/data.service';


@Component({
  selector: 'cobro-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements AfterViewInit, OnInit {

  @ViewChild('documentoTemplate') documentoTemplate: TemplateRef<any>;
  @ViewChild('nombreTemplate') nombreTemplate: TemplateRef<any>;
  @ViewChild('apellidosTemplate') apellidosTemplate: TemplateRef<any>;
  @ViewChild('direccionTemplate') direccionTemplate: TemplateRef<any>;
  @ViewChild('celularTemplate') celularTemplate: TemplateRef<any>;
  @ViewChild('usuarioTemplate') usuarioTemplate: TemplateRef<any>;
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

  new(): void {
    this.router.navigate(["./create"], { relativeTo: this.route });
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
      { cellTemplate: this.documentoTemplate, draggable: true, prop: 'numeroDocumento', name: 'Num Documento', resizeable: true, sortable: false },
      { cellTemplate: this.nombreTemplate, draggable: true, prop: 'nombre', name: 'Nombres', resizeable: true, sortable: false },
      { cellTemplate: this.apellidosTemplate, draggable: true, prop: 'apellidos', name: 'Apellidos', resizeable: true, sortable: false },
      { cellTemplate: this.direccionTemplate, draggable: true, prop: 'direccion', name: 'Direccion', resizeable: true, sortable: false },
      { cellTemplate: this.celularTemplate, draggable: true, prop: 'numeroCelular', name: 'Num Celular', resizeable: true, sortable: false },
      { cellTemplate: this.usuarioTemplate, draggable: true, prop: 'userName', name: 'Usuario', resizeable: true, sortable: false },
      { cellTemplate: this.accionTemplate, draggable: true, prop: 'id', name: 'Acciones', resizeable: true, sortable: false }
    ];

    this.data.usuarios().getAll().subscribe(d => {
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
        { id: 'direccion', title: 'Direccion', placeholder: 'Buscar por Direccion...', type: FilterType.TEXT },
        { id: 'numeroCelular', title: 'Num Celular', placeholder: 'Buscar por Num Celular...', type: FilterType.TEXT },
        { id: 'userName', title: 'Usuario', placeholder: 'Buscar por Usuario...', type: FilterType.TEXT }
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
        { id: 'direccion', title: 'Direccion', sortType: 'alpha' },
        { id: 'numeroCelular', title: 'Num Celular', sortType: 'alpha' },
        { id: 'userName', title: 'Usuario', sortType: 'alpha' }
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
      toolbarConfig: this.toolbarConfig
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
    } else if (filter.field.id === 'direccion') {
      match = item.persona.direccion === filter.value;
    } else if (filter.field.id === 'numeroCelular') {
      match = item.persona.numeroCelular === filter.value;
    } else if (filter.field.id === 'userName') {
      match = item.userName === filter.value;
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
    } else if (this.currentSortField.id === 'direccion') {
      compValue = item1.persona.direccion.localeCompare(item2.persona.direccion);
    } else if (this.currentSortField.id === 'numeroCelular') {
      compValue = item1.persona.numeroCelular.localeCompare(item2.persona.numeroCelular);
    } else if (this.currentSortField.id === 'userName') {
      compValue = item1.userName.localeCompare(item2.userName);
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
