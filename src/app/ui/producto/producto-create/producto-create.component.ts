import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cobro-producto-create',
  templateUrl: './producto-create.component.html',
  styleUrls: ['./producto-create.component.scss']
})
export class ProductoCreateComponent implements OnInit {

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
      denominacion: [null, Validators.compose([Validators.required, Validators.maxLength(11)])],
      categoria: [null, Validators.compose([Validators.required])],
      precio: [null, Validators.compose([Validators.required])],
      usuarioCreaId: [null, Validators.compose([Validators.required])],
    });
    this.buildUsuario();
  }

  buildUsuario() {
    this.form.patchValue({
      usuarioCreaId: this.data.usuarios().getItem()
    });
  }

  save(form) {
    if (!this.form.valid) {
      this.data.messages().warning("Datos incompletos para crear producto");
      return;
    }
    this.data.productos().create(this.form.value).subscribe(
      (data) => {
        if (data.success) {
          this.data.messages().success("Producto creado exitosamente");
          this.cancel();
        } else {
          this.data.messages().error("Error al crear el producto, por favor intentelo mas tarde");
        }
      }, error => {
        this.data.messages().error("Error en la cracion del producto.");
      });
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
