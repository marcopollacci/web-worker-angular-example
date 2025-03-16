import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const POOL_SIZE = 4;

@Injectable({
  providedIn: 'root',
})
export class WorkerPollService {
  #workers: Worker[] = [];

  constructor() {
    this.createPoolWorkers();
  }

  createPoolWorkers() {
    for (let i = 0; i < POOL_SIZE; i++) {
      const worker = new Worker(
        new URL('./worker-test.worker.ts', import.meta.url)
      );
      this.#workers.push(worker);
    }
  }

  getWorker(data: string): Observable<string> | null {
    const worker = this.#workers.pop();
    if (!worker) return null;
    return new Observable((observer) => {
      worker.onmessage = ({ data }: MessageEvent<string>) => {
        observer.next(data);
        observer.complete();
        this.releaseWorker(worker);
      };
      worker.onerror = (error) => observer.error(error);
      worker.postMessage(data);
    });
  }

  releaseWorker(worker: Worker) {
    this.#workers.push(worker);
  }
}
