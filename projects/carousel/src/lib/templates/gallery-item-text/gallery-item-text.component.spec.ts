import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryItemTextComponent } from './gallery-item-text.component';

describe('GalleryItemTextComponent', () => {
  let component: GalleryItemTextComponent;
  let fixture: ComponentFixture<GalleryItemTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryItemTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryItemTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
