import { map } from 'rxjs/operators';
import { AbstractControl } from '@angular/forms';
import { PersonasService } from './../services/personas.service';
import { of } from 'rxjs';

export class Validation {

  static checkId(personaService: PersonasService, id) {
    return (control: AbstractControl) => {
      const value = control.value;
      return personaService.checkid$({ n_idententidad: value, id })
      .pipe(
        map(r => {
          return r.disponible ? null : { noDisponible: true };
        })
        )

    }
  }
}
