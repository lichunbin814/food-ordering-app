import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { PreloadService, PreloadPriority } from '../preload.service';

describe('PreloadService', () => {
  let preloadService: PreloadService;
  
  beforeEach(() => {
    vi.useFakeTimers();
    preloadService = new PreloadService();
    (window as any).requestIdleCallback = (cb: IdleRequestCallback) => setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 10 }), 0);
    (window as any).requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(cb, 0);
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    preloadService.clearAll();
  });

  describe('addTask', () => {
    it('should add task with LOW priority', async () => {
      const task = vi.fn().mockResolvedValue(undefined);
      
      preloadService.addTask(task, PreloadPriority.LOW);
      preloadService.startPreloading();
      
      await vi.runAllTimersAsync();
      
      expect(task).toHaveBeenCalled();
    });

    it('should add task with MEDIUM priority', async () => {
      const task = vi.fn().mockResolvedValue(undefined);
      
      preloadService.addTask(task, PreloadPriority.MEDIUM);
      preloadService.startPreloading();
      
      await vi.runAllTimersAsync();
      
      expect(task).toHaveBeenCalled();
    });

    it('should add task with HIGH priority', async () => {
      const task = vi.fn().mockResolvedValue(undefined);
      
      preloadService.addTask(task, PreloadPriority.HIGH);
      preloadService.startPreloading();
      
      await vi.runAllTimersAsync();
      
      expect(task).toHaveBeenCalled();
    });

    it('should process tasks in priority order', async () => {
      const executionOrder: string[] = [];
      
      const highTask = vi.fn().mockImplementation(async () => {
        executionOrder.push('high');
        return Promise.resolve();
      });
      
      const mediumTask = vi.fn().mockImplementation(async () => {
        executionOrder.push('medium');
        return Promise.resolve();
      });
      
      const lowTask = vi.fn().mockImplementation(async () => {
        executionOrder.push('low');
        return Promise.resolve();
      });

      preloadService.addTask(lowTask, PreloadPriority.LOW);
      preloadService.addTask(mediumTask, PreloadPriority.MEDIUM);
      preloadService.addTask(highTask, PreloadPriority.HIGH);
      
      preloadService.startPreloading();
      
      await vi.runAllTimersAsync();
      
      expect(executionOrder).toEqual(['high', 'medium', 'low']);
    });
  });

  describe('queue processing', () => {
    it('should process tasks immediately after startPreloading', async () => {
      const task = vi.fn().mockResolvedValue(undefined);
      
      preloadService.addTask(task, PreloadPriority.HIGH);
      expect(task).not.toHaveBeenCalled();
      
      preloadService.startPreloading();
      await vi.runAllTimersAsync();
      
      expect(task).toHaveBeenCalled();
    });

    it('should process new tasks immediately if preloading already started', async () => {
      const task = vi.fn().mockResolvedValue(undefined);
      
      preloadService.startPreloading();
      preloadService.addTask(task, PreloadPriority.HIGH);
      
      await vi.runAllTimersAsync();
      
      expect(task).toHaveBeenCalled();
    });

    it('should handle task failures without breaking the queue', async () => {
      const successTask = vi.fn().mockResolvedValue(undefined);
      const failureTask = vi.fn().mockRejectedValue(new Error('Task failed'));
      
      preloadService.addTask(failureTask, PreloadPriority.HIGH);
      preloadService.addTask(successTask, PreloadPriority.HIGH);
      
      preloadService.startPreloading();
      await vi.runAllTimersAsync();
      
      expect(successTask).toHaveBeenCalled();
    });
  });

  describe('clearAll', () => {
    it('should clear all queues', async () => {
      const task = vi.fn().mockResolvedValue(undefined);
      
      preloadService.addTask(task, PreloadPriority.LOW);
      preloadService.addTask(task, PreloadPriority.MEDIUM);
      preloadService.addTask(task, PreloadPriority.HIGH);
      
      preloadService.clearAll();
      preloadService.startPreloading();
      
      await vi.runAllTimersAsync();
      
      expect(task).not.toHaveBeenCalled();
    });
  });
});
