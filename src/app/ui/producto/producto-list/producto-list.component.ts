import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { PaginationConfig, TableConfig, PaginationEvent, SortField, FilterConfig, SortConfig, ToolbarConfig, FilterType, FilterField, Filter, FilterEvent, SortEvent } from 'patternfly-ng';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/core/data/data.service';

@Component({
  selector: 'cobro-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.scss']
})
export class ProductoListComponent implements AfterViewInit, OnInit {

  @ViewChild('denominacionTemplate') denominacionTemplate: TemplateRef<any>;
  @ViewChild('categoriaTemplate') categoriaTemplate: TemplateRef<any>;
  @ViewChild('precioTemplate') precioTemplate: TemplateRef<any>;
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
      { cellTemplate: this.denominacionTemplate, draggable: true, prop: 'denominacion', name: 'Denominacion', resizeable: true, sortable: false },
      { cellTemplate: this.categoriaTemplate, draggable: true, prop: 'categoria', name: 'Categoria', resizeable: true, sortable: false },
      { cellTemplate: this.precioTemplate, draggable: true, prop: 'precio', name: 'Precio', resizeable: true, sortable: false },
      { cellTemplate: this.usuarioTemplate, draggable: true, prop: 'usuario', name: 'Usuario', resizeable: true, sortable: false },
      { cellTemplate: this.accionTemplate, draggable: true, prop: 'id', name: 'Acciones', resizeable: true, sortable: false }
    ];

    this.data.productos().getAll().subscribe(d => {
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
        { id: 'denominacion', title: 'Denominacion', placeholder: 'Buscar por Denominacion...', type: FilterType.TEXT },
        { id: 'categoria', title: 'Categoria', placeholder: 'Buscar por Categoria...', type: FilterType.TEXT },
        { id: 'precio', title: 'Precio', placeholder: 'Buscar por Precio...', type: FilterType.TEXT }
      ] as FilterField[],
      appliedFilters: [],
      resultsCount: this.rows.length,
      totalCount: this.allRows.length
    } as FilterConfig;

    this.sortConfig = {
      fields: [
        { id: 'denominacion', title: 'Denominacion', sortType: 'alpha' },
        { id: 'categoria', title: 'Categoria', sortType: 'alpha' },
        { id: 'precio', title: 'Precio', sortType: 'alpha' }
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
    if (filter.field.id === 'denominacion') {
      match = item.denominacion.match(re) !== null;
    } else if (filter.field.id === 'categoria') {
      match = item.categoria.match(re) !== null;
    } else if (filter.field.id === 'precio') {
      match = item.precio === filter.value;
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
    if (this.currentSortField.id === 'denominacion') {
      compValue = item1.denominacion.localeCompare(item2.denominacion);
    } else if (this.currentSortField.id === 'categoria') {
      compValue = item1.categoria.localeCompare(item2.categoria);
    } else if (this.currentSortField.id === 'precio') {
      compValue = item1.precio.localeCompare(item2.precio);
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
