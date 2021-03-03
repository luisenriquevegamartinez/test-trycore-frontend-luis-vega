import { Persona } from './../../models/persona';
import { PersonasService } from './../../services/personas.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  persona: Persona = null;

  constructor(
    public dialogRef: MatDialogRef<ShowComponent>,
    private personasService: PersonasService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.personasService.get$(data).subscribe(r => {
      console.log(r);
      this.persona = r;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }



}
