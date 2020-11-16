import { AfterContentInit, Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  constructor(private observableMedia: MediaObserver) { }

  sidebaropen = true;

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    this.observableMedia.asObservable().subscribe((change: MediaChange[]) => {
      if(change[0].mqAlias == 'xs') {
        this.sidebaropen = false
      }
      else {
        this.sidebaropen = true
      }
    });
  }

  sidebar() {
    this.sidebaropen = !this.sidebaropen;
  }

}
