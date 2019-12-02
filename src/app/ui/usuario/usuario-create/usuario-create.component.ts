import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/core/data/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'cobro-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.scss']
})
export class UsuarioCreateComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  working = false;


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
      this.data.messages().error("Error creando usuarios.");
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
      userName: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
      personaId: [null, Validators.compose([Validators.required])],
      nombreCompleto: [null, Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(25)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(25), this.isEqualPassword.bind(this)])],
    });
  }

  isEqualPassword(control: FormControl): { [s: string]: boolean } {
    if (!this.form) {
      return { passwordsNotMatch: true };
    }
    if (control.value !== this.form.controls['password'].value) {
      return { passwordsNotMatch: true };
    }
  }

  selectedItem(selected, form) {
    form.patchValue({
      personaId: selected.item.id,
      nombreCompleto: { nombreCompleto: selected.item.numeroDocumento + " - " + selected.item.nombre + " " + selected.item.apellidos },
    });
  }

  save(form) {
    const val = this.form.value;
    this.data.usuarios().create(val).subscribe(
      (data) => {
        if (data.success) {
          this.data.messages().success("Usuario creado correctamente");
        } else {
          this.data.messages().error("Error al crear el usuario, por favor intentelo mas tarde");
        }
      }, error => {
        this.data.messages().error("Error en la cracion del usuario.");
      });
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
