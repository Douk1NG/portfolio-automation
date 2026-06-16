import { renderHook, act } from '@testing-library/react';
import { useLogs } from '@/hooks/useLogs';
import { useUIStore } from '@/store/useUIStore';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// A controllable stand-in for EventSource that lets tests push messages.
class MockEventSource {
  static lastInstance: MockEventSource | null = null;

  onmessage: ((event: MessageEvent) => void) | null = null;
  readonly url: string;
  close = vi.fn();

  constructor(url: string) {
    this.url = url;
    MockEventSource.lastInstance = this;
  }

  /** Helper to simulate the server sending a log message. */
  emit(message: string) {
    const event = new MessageEvent('message', {
      data: JSON.stringify({ message }),
    });
    this.onmessage?.(event);
  }
}

global.EventSource = MockEventSource as object as typeof EventSource;

describe('useLogs', () => {
  beforeEach(() => {
    useUIStore.setState({ logs: [] });
    MockEventSource.lastInstance = null;
    vi.clearAllMocks();
  });

  it('adds a log entry when the server emits a message', () => {
    renderHook(() => useLogs());

    act(() => {
      MockEventSource.lastInstance?.emit('Build succeeded');
    });

    expect(useUIStore.getState().logs).toHaveLength(1);
    expect(useUIStore.getState().logs[0]).toContain('Build succeeded');
  });

  it('accumulates multiple log messages in order', () => {
    renderHook(() => useLogs());

    act(() => {
      MockEventSource.lastInstance?.emit('Step 1');
      MockEventSource.lastInstance?.emit('Step 2');
      MockEventSource.lastInstance?.emit('Step 3');
    });

    const { logs } = useUIStore.getState();
    expect(logs).toHaveLength(3);
    expect(logs[0]).toContain('Step 1');
    expect(logs[1]).toContain('Step 2');
    expect(logs[2]).toContain('Step 3');
  });

  it('closes the EventSource connection when the hook unmounts', () => {
    const { unmount } = renderHook(() => useLogs());

    const instance = MockEventSource.lastInstance;
    expect(instance).not.toBeNull();

    unmount();

    expect(instance?.close).toHaveBeenCalledOnce();
  });

  it('returns the current logs from the store', () => {
    useUIStore.setState({ logs: ['existing log'] });
    const { result } = renderHook(() => useLogs());

    expect(result.current.logs).toHaveLength(1);
    expect(result.current.logs[0]).toBe('existing log');
  });
});
