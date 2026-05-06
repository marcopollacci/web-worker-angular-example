import { Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WorkerPoolService } from '../../services/worker-poll.service';

@Component({
  selector: 'app-pool-worker',
  imports: [RouterLink],
  templateUrl: './pool-worker.component.html',
  styleUrls: [
    '../../common/styles/section.components.scss',
    './pool-worker.component.scss',
  ],
})
export class PoolWorkerComponent implements OnDestroy {
  #poolWorkerService = inject(WorkerPoolService);
  actualPoolSize = this.#poolWorkerService.actualPoolSize;
  isPoolFull = computed(() => this.actualPoolSize() === 0);
  logs = signal<string[]>([]);

  constructor() {
    this.#poolWorkerService.createPoolWorkers();
  }

  startNewHeavyJob() {
    const newWorker = this.#poolWorkerService.getWorker(crypto.randomUUID());
    if (!newWorker) {
      console.error('No worker available');
      return;
    }
    newWorker.subscribe((data) => {
      this.logs.update((prev) => [
        `[${new Date().toLocaleTimeString()}] ${data}`,
        ...prev,
      ]);
    });
  }

  ngOnDestroy() {
    // Terminate all workers in the pool when the component is destroyed..this is optional, but it's a good practice to clean up resources.
    this.#poolWorkerService.destroyPoolWorkers();
  }
}
