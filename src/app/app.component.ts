import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ads-greedy-cviko1';

  something = 0;

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    console.log('I am here');
    this.something = 25;
  }

  changeSomething(): void {
    this.something = 69;
    console.log('CLICK');
  }


}
