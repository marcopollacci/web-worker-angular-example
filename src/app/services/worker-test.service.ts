import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkerTestService {
  #worker!: Worker;
  constructor() {
    this.createWorker();
  }

  createWorker() {
    this.#worker = new Worker(
      new URL('./worker-test.worker.ts', import.meta.url)
    );
  }

  doHeavyWork(data: string): Observable<string> {
    return new Observable((observer) => {
      this.#worker.onmessage = ({ data }: MessageEvent<string>) => {
        observer.next(data);
        observer.complete();
      };
      this.#worker.onerror = (error) => observer.error(error);
      this.#worker.postMessage(data);
    });
  }
}
