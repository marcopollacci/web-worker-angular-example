import { Component, inject, signal } from '@angular/core';
import { tap } from 'rxjs';
import { WorkerTestService } from '../../services/worker-test.service';

@Component({
  selector: 'app-worker',
  imports: [],
  templateUrl: './worker.component.html',
  styleUrl: './worker.component.scss',
})
export class WorkerComponent {
  readonly #workerService = inject(WorkerTestService);
  // readonly workerResponse$ = this.#workerService.doHeavyWork('test');
  counter = signal<number>(0);
  disableButton = signal<boolean>(false);

  constructor() {}

  startHeavyWorkInWorker() {
    this.disableButton.set(true);
    this.#workerService
      .doHeavyWork('test')
      .pipe(tap(() => this.disableButton.set(false)))
      .subscribe((data) => console.log(data));
  }

  incrementCounter() {
    this.counter.update((value) => value + 1);
  }
}
