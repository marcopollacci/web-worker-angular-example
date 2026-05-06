import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { tap } from 'rxjs';
import { WorkerTestService } from '../../services/worker-test.service';

@Component({
  selector: 'app-worker',
  imports: [RouterLink],
  templateUrl: './worker.component.html',
  styleUrls: ['../../common/styles/section.components.scss'],
})
export class WorkerComponent {
  readonly #workerService = inject(WorkerTestService);
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
