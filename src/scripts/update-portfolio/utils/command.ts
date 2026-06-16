import { spawn } from 'node:child_process';
import type fs from 'node:fs';

export function runCommand(
  command: string,
  cwd: string,
  pipeStream?: fs.ReadStream,
): Promise<number> {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(command, [], {
      cwd,
      stdio: pipeStream ? ['pipe', 'inherit', 'inherit'] : 'inherit',
      shell: true,
    });

    if (pipeStream && childProcess.stdin) {
      pipeStream.pipe(childProcess.stdin);
    }

    childProcess.on('close', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(new Error(`Command "${command}" failed with code ${code}`));
      }
    });
  });
}
