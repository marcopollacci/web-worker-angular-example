import { Component, inject, signal } from '@angular/core';
import { WorkerPollService } from '../../services/worker-poll.service';

@Component({
  selector: 'app-pool-worker',
  imports: [],
  templateUrl: './pool-worker.component.html',
  styleUrl: './pool-worker.component.scss',
})
export class PoolWorkerComponent {
  #poolWorkerService = inject(WorkerPollService);
  disableButton = signal<boolean>(false);

  startNewHeavyJob() {
    const newWorker = this.#poolWorkerService.getWorker(crypto.randomUUID());
    if (!newWorker) {
      this.disableButton.set(true);
      console.warn('No worker available');
      return;
    }
    newWorker.subscribe((data) => {
      this.disableButton.set(false);
      console.log(data);
    });
  }
}
