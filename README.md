# Angular Web Worker Demo

An Angular application that demonstrates how to use **Web Workers** to offload CPU-intensive tasks from the main thread, keeping the UI responsive. The project compares three approaches side by side so you can see the real impact of blocking vs. non-blocking computation.

## What It Demonstrates

| Demo              | Route          | Description                                                                                                     |
| ----------------- | -------------- | --------------------------------------------------------------------------------------------------------------- |
| **No Worker**     | `/no-worker`   | Runs a 10-billion-iteration loop directly on the main thread — the UI freezes completely                        |
| **Single Worker** | `/worker`      | Offloads the same computation to a dedicated Web Worker — UI stays fully responsive                             |
| **Worker Pool**   | `/pool-worker` | Manages a pool of 4 reusable workers — supports up to 4 concurrent jobs; returns `null` if all workers are busy |

Each demo includes a live counter so you can immediately observe whether the UI is blocked or responsive during the heavy task.

## Project Structure

```
src/app/
├── components/
│   ├── home/            # Landing page with navigation links
│   ├── no-worker/       # Main-thread blocking demo
│   ├── worker/          # Single Web Worker demo
│   └── pool-worker/     # Worker pool demo
└── services/
    ├── worker-test.service.ts   # Single worker — wraps communication in an Observable
    ├── worker-poll.service.ts   # Worker pool — manages 4 reusable workers
    └── worker-test.worker.ts    # The actual worker script (runs in a separate thread)
```

All routes are **lazy-loaded**. The worker script is compiled separately via `tsconfig.worker.json` and bundled by the Angular CLI (esbuild).

## Tech Stack

- **Angular** 21.2.11
- **RxJS** 7.8.2 — worker communication wrapped as Observables
- **Angular Signals** — reactive UI state
- **SCSS** — component styles

## Getting Started

### Prerequisites

- Node.js ≥ 20
- [pnpm](https://pnpm.io/)

### Install dependencies

```bash
pnpm install
```

### Start the development server

```bash
pnpm start
```

Open your browser at `http://localhost:4200/`.

### Build for production

```bash
pnpm build
```

Artifacts are output to `dist/angular-web-worker-demo/`.

### Run unit tests

```bash
pnpm test
```

## How Web Workers Are Used

Workers are created using the standard Angular pattern:

```typescript
new Worker(new URL("./worker-test.worker.ts", import.meta.url));
```

The Angular CLI detects `.worker.ts` files and bundles them as separate chunks. Communication is two-way:

- **Main → Worker**: `worker.postMessage(data)`
- **Worker → Main**: `postMessage(result)` received via `worker.onmessage`

Both services wrap this communication in an RxJS `Observable`, allowing components to subscribe declaratively and use standard reactive operators.

### Worker Pool Pattern

`WorkerPoolService` pre-creates 4 workers at startup. When a job arrives:

1. A worker is popped from the pool.
2. If the pool is empty, the method returns `null` (caller must handle this case).
3. Once the worker finishes, it is pushed back into the pool automatically.

## Resources

- [Web Workers API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [Angular Web Workers guide](https://angular.dev/ecosystem/web-workers)
- [Angular CLI Overview](https://angular.dev/tools/cli)
