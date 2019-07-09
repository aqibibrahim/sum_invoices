import { Component, ElementRef, Input, Renderer, ViewChild } from '@angular/core';

@Component({
  selector: 'itemslist',
  templateUrl: 'itemslist.html'
})
export class ItemslistComponent {
  @Input() headerColor: string = '#d3d3d3';
  @Input() textColor: string = '#747474';
  @Input() contentColor: string = '#ffffff';
  @Input() title: string;
  @Input() hasMargin: boolean = true;
  @Input() expanded: boolean;

  @ViewChild('accordionContent') elementView: ElementRef;

  viewHeight: number;

  constructor(public renderer: Renderer) { }

  ngAfterViewInit() {
    this.viewHeight = this.elementView.nativeElement.offsetHeight;

    if (!this.expanded) {
      this.renderer.setElementStyle(this.elementView.nativeElement, 'height', 0 + 'px');
    }
  }

  toggleAccordion() {
    this.expanded = !this.expanded;
    const newHeight = this.expanded ? '100%' : '0px';
    this.renderer.setElementStyle(this.elementView.nativeElement, 'height', newHeight);
  }

}