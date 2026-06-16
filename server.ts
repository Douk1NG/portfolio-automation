import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 4001;

app.use(express.json());

const PROFILE_JSON_PATH = path.resolve(process.cwd(), 'src/data/profile.json');
let logClients: { id: number; res: express.Response }[] = [];

// SSE for real-time logs
app.get('/api/logs', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const clientId = Date.now();
  const newClient = { id: clientId, res };
  logClients.push(newClient);

  req.on('close', () => {
    logClients = logClients.filter((c) => c.id !== clientId);
  });
});

const sendLog = (message: string) => {
  logClients.forEach((client) => {
    client.res.write(`data: ${JSON.stringify({ message, timestamp: new Date() })}\n\n`);
  });
};

const runScript = (scriptName: string, res: express.Response) => {
  const scriptMap: Record<string, string> = {
    'update-portfolio.ts': 'update-portfolio',
    'orchestrator.ts': 'workflow',
  };

  const folder = scriptMap[scriptName];
  const scriptPath = path.resolve(process.cwd(), 'src/scripts/', folder, scriptName);
  const childProcess = spawn(`tsx "${scriptPath}"`, {
    shell: true,
    stdio: ['inherit', 'pipe', 'pipe'],
  });

  childProcess.stdout.on('data', (data) => {
    const msg = data.toString().trim();
    if (msg) {
      console.log(msg);
      sendLog(msg);
    }
  });

  childProcess.stderr.on('data', (data) => {
    const msg = data.toString().trim();
    if (msg) {
      console.error(msg);
      sendLog(`ERROR: ${msg}`);
    }
  });

  childProcess.on('close', (code) => {
    sendLog(`Script ${scriptName} finished with code ${code}`);
    res.json({ success: code === 0, code });
  });
};

// Endpoints
app.get('/api/profile', async (req, res) => {
  try {
    const data = await fs.readFile(PROFILE_JSON_PATH, 'utf-8');
    res.json(JSON.parse(data));
  } catch {
    res.status(500).json({ error: 'Failed to read profile.json' });
  }
});

app.post('/api/save-profile', async (req, res) => {
  try {
    await fs.writeFile(PROFILE_JSON_PATH, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Failed to save profile.json' });
  }
});

app.post('/api/update-portfolio', (req, res) => {
  runScript('update-portfolio.ts', res);
});

app.post('/api/publish', (req, res) => {
  runScript('orchestrator.ts', res);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.post('/api/latex/compile', express.text({ type: 'application/x-tex' }), async (req, res) => {
  const resources = [{ main: true, content: req.body as string }];

  const response = await fetch('https://latex.ytotech.com/builds/sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      compiler: 'pdflatex',
      resources,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('[latex]', errorText);
    return res.status(500).send(errorText);
  }

  const pdf = await response.arrayBuffer();

  const savePath = req.query.savePath as string | undefined;
  const filename = req.query.filename as string | undefined;

  if (savePath && filename) {
    try {
      const fullPath = path.join(savePath, filename);
      await fs.writeFile(fullPath, Buffer.from(pdf));
      return res.json({ success: true, message: `Saved to ${fullPath}` });
    } catch (err) {
      console.error('[latex] Failed to save file locally:', err);
      return res.status(500).json({ error: 'Failed to save file locally' });
    }
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.send(Buffer.from(pdf));
});
