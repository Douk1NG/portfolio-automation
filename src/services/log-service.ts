export const LogService = {
  subscribe(onMessage: (message: string) => void): () => void {
    const eventSource = new EventSource('/api/logs');

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data.message);
      } catch (error) {
        console.error('Failed to parse log message:', error);
      }
    };

    return () => eventSource.close();
  },
};
