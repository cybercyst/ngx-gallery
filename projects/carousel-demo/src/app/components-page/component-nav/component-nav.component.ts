import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StoryService } from '../../story';

@Component({
  selector: 'component-nav',
  templateUrl: './component-nav.component.html',
  styleUrls: ['./component-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentNavComponent implements OnInit {

  constructor(public story: StoryService) {
  }

  ngOnInit(): void {
  }

}
