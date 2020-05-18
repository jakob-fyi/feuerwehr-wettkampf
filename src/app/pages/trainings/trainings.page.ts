import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Training } from 'src/app/models/training/training';
import { TrainingType } from 'src/app/models/training-type/training-type';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.page.html',
  styleUrls: ['./trainings.page.scss'],
})
export class TrainingsPage implements OnInit
{
  private filter = {
    kuppeln: true,
    gesamt: true
  };

  public constructor(private storage: StorageService) 
  { }

  ngOnInit() 
  { }

  private toggleFilterKuppeln = () => this.filter.kuppeln = !this.filter.kuppeln;
  private toggleFilterGesamt = () => this.filter.gesamt = !this.filter.gesamt;
}
