import { Planeta } from './../../../planetas/models/planeta';
import { PlanetasService } from '../../../planetas/services/planetas.service';
import { ListComponent } from './../list/list.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formulario: FormGroup;
  error: HttpErrorResponse = null;
  cargaCompleta = false;

  terrenos = [
    'Rocoso',
    'Gaseoso',
    'Acuatico',
    'Plasmatico'
  ];

  climas = [
    'Seco',
    'Humedo',
    'Frio',
    'Caliente'
  ];

  constructor(
    public dialogRef: MatDialogRef<ListComponent>,
    private planetasService: PlanetasService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public planeta: Planeta) {
    this.crearFormulario();
  }

  expo(x) {
    return Number.parseFloat(x).toExponential();
  }

  crearFormulario() {
    this.planetasService.getAll$().subscribe(r => this.planeta = r);
    this.formulario = this.fb.group({
      id: [this.planeta.id||0],
      nombre: [this.planeta.nombre, [Validators.pattern(/^[A-Za-z0-9\s]{1,50}$/), Validators.required]],
      terreno: [this.planeta.terreno, [Validators.pattern(/^[A-Za-z0-9\s]{1,50}$/), Validators.required]],
      clima: [this.planeta.clima, [Validators.pattern(/^[A-Za-z0-9\s]{1,50}$/), Validators.required]],
      diametro: [this.expo(this.planeta.diametro), [Validators.pattern(/^[0-9]*?([\.]{1})?([0-9]*)?([eE]{1})?([+]{1}?[0-9]*)?$/), Validators.maxLength(50),Validators.required]],
      masa: [this.expo(this.planeta.masa),[Validators.pattern(/^[0-9]*?([\.]{1})?([0-9]*)?([eE]{1})?([+]{1}?[0-9]*)?$/), Validators.maxLength(50),Validators.required]],
      periodo_rotacion: [this.expo(this.planeta.periodo_rotacion), [Validators.pattern(/^[0-9]*?([\.]{1})?([0-9]*)?([eE]{1})?([+]{1}?[0-9]*)?$/), Validators.maxLength(50),Validators.required]],
      radio_orbital: [this.expo(this.planeta.radio_orbital), [Validators.pattern(/^[0-9]*?([\.]{1})?([0-9]*)?([eE]{1})?([+]{1}?[0-9]*)?$/), Validators.maxLength(50),Validators.required]],
    });
    this.cargaCompleta = true;
  }

  onNoClick(aceptar = false): void {
    if (aceptar) {
      this.dialogRef.close(this.formulario.value);
    } else {
      this.dialogRef.close();
    }
  }

  formula(){
    console.log(this.formulario.get('diametro'))
  }

  ngOnInit(): void {
  }

}
