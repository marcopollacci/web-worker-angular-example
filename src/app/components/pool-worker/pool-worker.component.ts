import { Component, inject, signal } from '@angular/core';
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
export class PoolWorkerComponent {
  #poolWorkerService = inject(WorkerPoolService);
  disableButton = signal<boolean>(false);
  logs = signal<string[]>([]);

  startNewHeavyJob() {
    const newWorker = this.#poolWorkerService.getWorker(crypto.randomUUID());
    if (!newWorker) {
      this.disableButton.set(true);
      console.error('No worker available');
      return;
    }
    newWorker.subscribe((data) => {
      this.disableButton.set(false);
      console.log(data);
      this.logs.update((prev) => [
        `[${new Date().toLocaleTimeString()}] ${data}`,
        ...prev,
      ]);
    });
  }
}
