import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GuideConfig, GUIDES_CONFIG } from '../guides.model';

@Component({
  host: {
    'class': 'page'
  },
  selector: 'app-guides',
  templateUrl: './guides.component.html',
  styleUrls: ['./guides.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuidesComponent {

  title: string = 'Guides';

  constructor(@Inject(GUIDES_CONFIG) public config: GuideConfig, title: Title) {
    title.setTitle(`${ this.title } | ng-gallery`);
  }
}
