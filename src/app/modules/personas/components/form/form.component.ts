import { Validation } from './../../classes/validations';
import { Planeta } from './../../../planetas/models/planeta';
import { PlanetasService } from '../../../planetas/services/planetas.service';
import { PersonasService } from './../../services/personas.service';
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
  planetas: Planeta;

  constructor(
    public dialogRef: MatDialogRef<ListComponent>,
    private personasService: PersonasService,
    private planetasService: PlanetasService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public persona: any) {
    this.crearFormulario();
  }

  crearFormulario() {
    this.planetasService.getAll$().subscribe(r => this.planetas = r);
    this.formulario = this.fb.group({
      id: [this.persona.id||0],
      planeta_id: [this.persona.planeta_id || 1, Validators.required],
      n_idententidad: [this.persona.n_idententidad, [Validators.pattern(/^[0-9]{1,50}$/), Validators.required], Validation.checkId(this.personasService,this.persona.id||0)],
      nombres: [this.persona.nombres, [Validators.pattern(/^[A-Za-z0-9\s]{1,50}$/), Validators.required]],
      apellidos: [this.persona.apellidos, [Validators.pattern(/^[A-Za-z0-9\s]{1,50}$/), Validators.required]],
      edad: [this.persona.edad, [Validators.pattern(/^[0-9]{1,3}$/), Validators.required]],
      peso: [this.persona.peso, [Validators.pattern(/^[0-9]{1,3}$/), Validators.required]],
      altura: [this.persona.altura, [Validators.pattern(/^[0-9]{1,3}$/), Validators.required]],
      genero: [this.persona.genero, [Validators.pattern(/^[FM]{1}$/), Validators.required]],
      fecha_nacimiento: [this.persona.fecha_nacimiento, [Validators.pattern(/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/), Validators.required]],
    });
    this.cargaCompleta = true;
  }

  onNoClick(aceptar=false): void {
    if(aceptar){
      this.dialogRef.close(this.formulario.value);
    }else{
      this.dialogRef.close();
    }
  }

  ngOnInit(): void {
  }

}
