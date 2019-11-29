import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { NotifyService } from './notify.service';
import { PreviewService } from './preview.service';
import { CobranzaService } from './cobranza.service';
import { PersonaService } from './persona.service';
import { ProductoService } from './producto.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private message: MessageService,
    private notify: NotifyService,
    private preview: PreviewService,
    private cobranza: CobranzaService,
    private persona: PersonaService,
    private producto: ProductoService,
    private usuario: UsuarioService
  ) { }

  messages(): MessageService {
    return this.message;
  }
  notifies(): NotifyService {
    return this.notify;
  }
  previews(): PreviewService {
    return this.preview;
  }
  cobranzas(): CobranzaService {
    return this.cobranza;
  }
  personas(): PersonaService {
    return this.persona;
  }
  productos(): ProductoService {
    return this.producto;
  }
  usuarios(): UsuarioService {
    return this.usuario;
  }
}
