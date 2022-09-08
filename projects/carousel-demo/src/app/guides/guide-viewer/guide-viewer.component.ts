import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  host: {
    'class': 'page'
  },
  selector: 'guide-viewer',
  templateUrl: './guide-viewer.component.html',
  styleUrls: ['./guide-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuideViewerComponent {

  title: string;
  content: string;

  constructor(private activatedRoute: ActivatedRoute, title: Title) {
    this.title = this.activatedRoute.snapshot.data.data.title;
    this.content = this.activatedRoute.snapshot.data.data.content;
    title.setTitle(`${ this.title } | ng-gallery`);
  }
}
