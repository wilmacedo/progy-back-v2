import * as jobs from './handlers';

const queues = Object.values(jobs).map(job => new job().buildQueue());

const add = (name: string, data: any) => {
  const queue = queues.find(queue => queue.name === name);
  if (!queue) {
    throw new Error('Queue not found');
  }

  return queue.bull.add(data);
};

const process = () =>
  queues.forEach(queue => {
    queue.bull.process(job => {
      console.log(
        `[${new Date().toLocaleString()}] \x1b[31mqueue:${
          queue.name
        }\x1b[37m started`,
      );
      return queue.handle(job.data);
    });

    queue.bull.on('failed', (_, err) => {
      console.log(
        `[${new Date().toLocaleString()}] \x1b[31mqueue:${
          queue.name
        }\x1b[37m failed:`,
        err,
      );
    });

    queue.bull.on('completed', () => {
      console.log(
        `[${new Date().toLocaleString()}] \x1b[31mqueue:${
          queue.name
        }\x1b[37m completed`,
      );
    });
  });

export const Queue = { queues, add, process };
