import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-no-worker',
  imports: [],
  templateUrl: './no-worker.component.html',
  styleUrl: './no-worker.component.scss',
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
