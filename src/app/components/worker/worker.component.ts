import { Component, inject, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { tap } from 'rxjs';
import { WorkerTestService } from '../../services/worker-test.service';

@Component({
  selector: 'app-worker',
  imports: [RouterLink],
  templateUrl: './worker.component.html',
  styleUrls: ['../../common/styles/section.components.scss'],
})
export class WorkerComponent implements OnDestroy {
  readonly #workerService = inject(WorkerTestService);
  counter = signal<number>(0);
  disableButton = signal<boolean>(false);

  constructor() {
    this.#workerService.createWorker();
  }

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

  ngOnDestroy() {
    // Terminate the worker when the component is destroyed to free up resources. This is optional, but it's a good practice to clean up resources.
    this.#workerService.destroyWorker();
  }
}
