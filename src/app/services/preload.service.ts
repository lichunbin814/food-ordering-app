export enum PreloadPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export interface PreloadTask {
  task: () => Promise<any>;
  onComplete?: () => void;
}

export class PreloadService {
  private lowPriorityQueue: PreloadTask[] = [];
  private mediumPriorityQueue: PreloadTask[] = [];
  private highPriorityQueue: PreloadTask[] = [];
  private isProcessing: Record<PreloadPriority, boolean> = {
    [PreloadPriority.LOW]: false,
    [PreloadPriority.MEDIUM]: false,
    [PreloadPriority.HIGH]: false,
  };
  private isPreloadingStarted = false;

  startPreloading(): void {
    this.isPreloadingStarted = true;
    this.processAllQueues();
  }

  addTask(task: () => Promise<any>, priority: PreloadPriority = PreloadPriority.MEDIUM, onComplete?: () => void): void {
    const preloadTask: PreloadTask = { task, onComplete };
    switch (priority) {
      case PreloadPriority.LOW:
        this.lowPriorityQueue.push(preloadTask);
        break;
      case PreloadPriority.MEDIUM:
        this.mediumPriorityQueue.push(preloadTask);
        break;
      case PreloadPriority.HIGH:
        this.highPriorityQueue.push(preloadTask);
        break;
    }

    if (this.isPreloadingStarted) {
      this.processQueue(priority);
    }
  }

  private processAllQueues(): void {
    this.processQueue(PreloadPriority.HIGH);
    this.processQueue(PreloadPriority.MEDIUM);
    this.processQueue(PreloadPriority.LOW);
  }

  private processQueue(priority: PreloadPriority): void {
    if (this.isProcessing[priority]) {
      return;
    }

    this.isProcessing[priority] = true;
    
    switch (priority) {
      case PreloadPriority.LOW:
        this.processLowPriorityQueue();
        break;
      case PreloadPriority.MEDIUM:
        this.processMediumPriorityQueue();
        break;
      case PreloadPriority.HIGH:
        this.processHighPriorityQueue();
        break;
    }
  }

  private processLowPriorityQueue(): void {
    if (this.lowPriorityQueue.length === 0) {
      this.isProcessing[PreloadPriority.LOW] = false;
      if (this.highPriorityQueue.length > 0) {
        this.processQueue(PreloadPriority.HIGH);
      } else if (this.mediumPriorityQueue.length > 0) {
        this.processQueue(PreloadPriority.MEDIUM);
      }
      return;
    }

    const task = this.lowPriorityQueue.shift();
    
    const requestIdleCallbackPolyfill = 
      (typeof window !== 'undefined' && 'requestIdleCallback' in window) 
        ? (callback: IdleRequestCallback) => setTimeout(() => window.requestIdleCallback(callback), 0)
        : (callback: IdleRequestCallback) => setTimeout(callback, 0);

    if (task) {
      requestIdleCallbackPolyfill(() => {
        requestAnimationFrame(() => {
        task.task()
          .catch(() => {})
          .finally(() => {
            task.onComplete?.();
            this.processLowPriorityQueue();
          });
        });
      });
    } else {
      this.processLowPriorityQueue();
    }
  }

  private processMediumPriorityQueue(): void {
    if (this.mediumPriorityQueue.length === 0) {
      this.isProcessing[PreloadPriority.MEDIUM] = false;
      return;
    }

    const task = this.mediumPriorityQueue.shift();
    
    if (task) {
      setTimeout(() => {
        requestAnimationFrame(() => {
        task.task()
          .catch(() => {})
          .finally(() => {
            task.onComplete?.();
            this.processMediumPriorityQueue();
          });
        });
      }, 0);
    } else {
      this.processMediumPriorityQueue();
    }
  }

  private processHighPriorityQueue(): void {
    if (this.highPriorityQueue.length === 0) {
      this.isProcessing[PreloadPriority.HIGH] = false;
      return;
    }

    const task = this.highPriorityQueue.shift();
    
    if (task) {
      requestAnimationFrame(() => {
        task.task()
          .catch(() => {})
          .finally(() => {
            task.onComplete?.();
            this.processHighPriorityQueue();
          });
      });
    } else {
      this.processHighPriorityQueue();
    }
  }

  clearAll(): void {
    this.lowPriorityQueue = [];
    this.mediumPriorityQueue = [];
    this.highPriorityQueue = [];
  }
}

export const preloadService = new PreloadService();
