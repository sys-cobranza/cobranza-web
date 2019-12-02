import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cobro-persona-create',
  templateUrl: './persona-create.component.html',
  styleUrls: ['./persona-create.component.scss']
})
export class PersonaCreateComponent implements OnInit {

  form: FormGroup;
  working = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private data: DataService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      numeroDocumento: [null, Validators.compose([Validators.required, Validators.maxLength(11)])],
      nombre: [null, Validators.compose([Validators.required])],
      apellidos: [null, Validators.compose([Validators.required])],
      numeroCelular: [null],
      direccion: ['']
    });
  }

  save(form) {
    if (!this.form.valid) {
      this.data.messages().warning("Datos incompletos para crear persona");
      return;
    }
    this.data.personas().create(this.form.value).subscribe(
      (data) => {
        if (data.success) {
          this.data.messages().success("Cliente creado exitosamente");
          this.cancel();
        } else {
          this.data.messages().error("Error al crear el cliente, por favor intentelo mas tarde");
        }
      }, error => {
        this.data.messages().error("Error en la cracion del cliente.");
      });
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
