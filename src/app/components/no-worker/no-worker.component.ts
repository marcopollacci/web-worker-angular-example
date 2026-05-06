import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-worker',
  imports: [RouterLink],
  templateUrl: './no-worker.component.html',
  styleUrls: ['../../common/styles/section.components.scss'],
})
export class NoWorkerComponent {
  counter = signal<number>(0);

  startHeavyWork() {
    //do heavy loop
    for (let i = 0; i < 10000000000; i++) {}
  }

  incrementCounter() {
    this.counter.update((value) => value + 1);
  }
}
