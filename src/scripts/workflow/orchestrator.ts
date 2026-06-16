import { spawn } from 'node:child_process';
import path from 'node:path';

async function runScript(scriptName: string, folder: string) {
  return new Promise((resolve, reject) => {
    console.log(`\n--- Starting script: ${scriptName} ---\n`);
    const scriptPath = path.resolve(process.cwd(), 'src/scripts/', folder, scriptName);
    const childProcess = spawn('node', ['--import', 'tsx', scriptPath], { stdio: 'inherit' });

    childProcess.on('close', (code) => {
      if (code === 0) {
        console.log(`\n--- Script ${scriptName} finished successfully ---\n`);
        resolve(code);
      } else {
        console.error(`\n--- Script ${scriptName} failed with code ${code} ---\n`);
        reject(new Error(`Script ${scriptName} failed`));
      }
    });
  });
}

async function orchestrator() {
  try {
    // 1. Update Portfolio (Translation to portfolio files & Copy CVs)
    await runScript('update-portfolio.ts', 'update-portfolio');

    // 2. Update Secret (Sync portfolio changes to remote repo as GitHub secret)
    await runScript('update-secret.ts', 'update-portfolio');

    // 3. Trigger Workflow (Deploy portfolio site to GitHub Pages)
    await runScript('trigger-workflow.ts', 'update-portfolio');

    console.log('All automation tasks completed successfully.');
  } catch (error) {
    console.error('Orchestration failed:', error);
    process.exit(1);
  }
}

orchestrator();
