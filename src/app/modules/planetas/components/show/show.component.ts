import { Planeta } from './../../models/planeta';
import { PlanetasService } from './../../services/planetas.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  planeta: Planeta = null;

  constructor(
    public dialogRef: MatDialogRef<ShowComponent>,
    private planetasService: PlanetasService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.planetasService.get$(data).subscribe(r => {
      console.log(r);
      this.planeta = r;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }



}
