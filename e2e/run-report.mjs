import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const blobDir = path.join(root, 'blob-report');
const reportDir = path.join(root, 'playwright-report');

async function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: root,
      stdio: 'inherit',
      shell: true,
    });

    child.on('error', reject);
    child.on('close', (code) => resolve(code ?? 1));
  });
}

if (existsSync(blobDir)) {
  await rm(blobDir, { recursive: true, force: true });
}

console.log('Запуск E2E-тестов...');
const testCode = await run('npx.cmd', ['playwright', 'test']);

if (existsSync(blobDir)) {
  console.log('Сборка HTML-отчёта...');
  await run('npx.cmd', [
    'playwright',
    'merge-reports',
    'blob-report',
    '--reporter=html',
  ]);
}

if (existsSync(reportDir)) {
  console.log('Открытие отчёта в браузере...');
  await run('npx.cmd', ['playwright', 'show-report', 'playwright-report']);
} else {
  console.error('HTML-отчёт не создан.');
  process.exit(testCode === 0 ? 1 : testCode);
}

process.exit(testCode === 0 || existsSync(reportDir) ? 0 : testCode);
