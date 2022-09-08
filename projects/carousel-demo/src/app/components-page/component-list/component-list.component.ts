import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { STORY_CONFIG, StoryConfig } from '../../story';

@Component({
  host: {
    'class': 'page'
  },
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentListComponent {

  title: string = 'Components';

  constructor(@Inject(STORY_CONFIG) public config: StoryConfig, title: Title) {
    title.setTitle(`${ this.title } | ng-gallery`);
  }
}
