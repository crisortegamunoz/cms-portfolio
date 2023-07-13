import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TechnologyDTO } from '@core/models/website/technology.model';
import { TechnologyService } from '@core/service/website/technology.service';

@Component({
  selector: 'app-add-technology',
  templateUrl: './add-technology.component.html',
  styleUrls: ['./add-technology.component.scss']
})
export class AddTechnologyComponent implements OnInit {

  @Output() addTechnologies = new EventEmitter<TechnologyDTO[]>();

  @Input()
  technologiesRelated: TechnologyDTO[];

  technologiesToAdd: TechnologyDTO[];
  technologiesAdded: TechnologyDTO[];


  constructor(private technologyService: TechnologyService) {
    this.technologiesRelated = [];
    this.technologiesToAdd = [];
    this.technologiesAdded = [];
  }

  ngOnInit() {
    this.technologyService.getAll().subscribe(technologies => {
      this.technologiesToAdd = this.technologiesRelated && this.technologiesRelated.length > 0 ? technologies.filter(technology => {
        return !this.technologiesRelated.some(relatedTechnology => relatedTechnology.id === technology.id);
      }) : technologies;
    });
  }

  drop(event: CdkDragDrop<TechnologyDTO[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.emitTechnologies();
  }

  private emitTechnologies(): void {
    this.addTechnologies.emit(this.technologiesAdded);
  }


}
