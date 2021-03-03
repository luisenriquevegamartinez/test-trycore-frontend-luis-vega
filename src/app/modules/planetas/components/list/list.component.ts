import { ShowComponent } from './../show/show.component';
import { Planeta } from './../../models/planeta';
import { PlanetasService } from './../../services/planetas.service';
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
  planetas: Planeta[] = null;
  paginacion: any = {};
  termino: string = null;
  arr = [];
  constructor(
    public dialog: MatDialog,
    private planetasService: PlanetasService) {
    this.getPlanetas();
  }

  getPlanetas() {
    if (this.termino) {
      this.planetasService.search$({ termino: this.termino }).subscribe(r => this.planetas = r);
    } else {
      this.planetasService.getAll$().subscribe(r => this.planetas = r);
    }
  }

  openDialogConfirm(planeta): void {
    Swal.fire({
      title: `¿Esta seguro de eliminar a ${planeta.nombre}?`,
      showCancelButton: true,
      confirmButtonText: `Confirmar`,
      confirmButtonColor: '#F44336'
    }).then((result) => {
      if (result.isConfirmed) {
        this.planetasService.delete$(planeta.id).subscribe(r => {
          if (r.success) {
            Swal.fire(r.data, '', 'success');
            this.getPlanetas();
          }
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    });

  }

  openDialogForm(planeta?: any): void {
    const dialogConfim = this.dialog.open(FormComponent, {
      data: planeta || {},
    });

    dialogConfim.afterClosed().subscribe(planeta => {
      if (planeta.id != 0) {
        this.planetasService.update$(planeta).subscribe(r => {
          if (r.success) {
            Swal.fire(`la información de ${r.data?.nombre} se ha guardado satisfactoriamente`, '', 'success');
            this.getPlanetas();
          }
        });
      } else {
        this.planetasService.create$(planeta).subscribe(r => {
          if (r.success) {
            Swal.fire(`la información de ${planeta.nombres} se ha guardado satisfactoriamente`, '', 'success');
            this.getPlanetas();
          }
        }
        );
      }

    });
  }

  ngOnInit(): void {

  }

  openShowModal(planeta): void {
    const dialogRef = this.dialog.open(ShowComponent, {
      data: planeta
    });

    dialogRef.afterClosed().subscribe(r => {
      this.getPlanetas();
    });
  }

}
