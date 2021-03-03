import { ShowComponent } from './../show/show.component';
import { Persona } from './../../models/persona';
import { PersonasService } from './../../services/personas.service';
import { FormComponent } from './../form/form.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  panelOpenState = false;
  personas: Persona[] = null;
  paginacion: any = {};
  termino: string = null;
  constructor(
    public dialog: MatDialog,
    private personasService: PersonasService) {
    this.getPersonas();
  }

  getPersonas() {
    if (this.termino) {
      this.personasService.search$({ termino: this.termino }).subscribe(r => this.personas = r);
    } else {
      this.personasService.getAll$().subscribe(r => this.personas = r);
    }
  }

  openDialogConfirm(persona): void {
    const dialogConfim =

      Swal.fire({
        title: `¿Esta seguro de eliminar a ${persona.nombres}?`,
        showCancelButton: true,
        confirmButtonText: `Confirmar`,
        confirmButtonColor: '#F44336'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.personasService.delete$(persona.id).subscribe(r => {
            if (r.success) {
              Swal.fire(r.data, '', 'success');
              this.getPersonas();
            }
          })
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      });

  }

  openDialogForm(persona?: any): void {
    const dialogConfim = this.dialog.open(FormComponent, {
      data: persona || {},
    });

    dialogConfim.afterClosed().subscribe(persona => {
      if (persona) {

        if (persona.id!=0) {
          this.personasService.update$(persona).subscribe(r => {
            if (r.success) {
              Swal.fire(`la información de ${r.data?.nombres} se ha guardado satisfactoriamente`, '', 'success');
              this.getPersonas();
            }
          }
          );
        } else {
          this.personasService.create$(persona).subscribe(r => {
            if (r.success) {
              Swal.fire(`la información de ${persona.nombres} se ha guardado satisfactoriamente`, '', 'success');
              this.getPersonas();
            }
          }
          );
        }


      }

    });
  }

  ngOnInit(): void {

  }

  openShowModal(persona): void {
    const dialogRef = this.dialog.open(ShowComponent, {
      data: persona
    });

    dialogRef.afterClosed().subscribe(r => {
      this.getPersonas();
    });
  }



}
