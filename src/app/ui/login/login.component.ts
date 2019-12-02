import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/core/data/data.service';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/core/data/notify.service';

@Component({
  selector: 'cobro-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  working = false;

  constructor(
    private formBuilder: FormBuilder,
    private data: DataService,
    private notify: NotifyService,
    private router: Router,
    private renderer: Renderer2
  ) {
    this.renderer.addClass(document.body.parentElement, 'login-pf');
  }

  ngOnInit() {
    this.buildForm();
    this.notify.update('Acceso denegado,' + "hola mundo", 'error');
  }

  buildForm() {
    this.form = this.formBuilder.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(25)])]
    });
  }

  login(form) {
    this.working = true;
    if (!this.form.valid) {
      this.notify.update('Informacion,' + " Los datos del usuario son invalidos", 'info');
      return;
    }
    this.data.usuarios().login(this.form.value).subscribe(data => {
      if (data.success) {
        if (typeof (Storage) !== "undefined") {
          this.notify.update('Informacion,' + " Acceso correcto", 'success');
          this.data.usuarios().setItem(data.response.id);
          this.router.navigate(['/app']);
        } else {
          this.data.usuarios().removeItem();
          this.notify.update('Informacion,' + " Acceso correcto, El navegador no soporta almacenamiento de datos", 'info');
        }
        this.working = false;
      } else {
        this.notify.update('Alerta,' + " Error al ingresar, por favor intentelo mas tarde", 'error');
        this.working = false;
      }
    }, error => {
      this.notify.update('Alerta,' + " Error al ingresar, por favor intentelo mas tarde", 'error');
      this.working = false;
    });

  }

}
