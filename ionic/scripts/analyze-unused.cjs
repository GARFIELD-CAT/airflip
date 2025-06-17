#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Анализ неиспользуемых файлов и зависимостей...\n');

const timestamp = new Date().toISOString().split('T')[0];
const reportPath = path.join(__dirname, '..', `unused-analysis-${timestamp}.md`);

let report = `# Анализ неиспользуемого кода - ${timestamp}\n\n`;

// Function to run command and capture output
function runCommand(command, description) {
  try {
    console.log(`⏳ ${description}...`);
    const output = execSync(command, {
      cwd: path.join(__dirname, '..'),
      encoding: 'utf8',
      stdio: 'pipe'
    });
    console.log(`✅ ${description} завершен`);
    return output;
  } catch (error) {
    console.log(`⚠️  ${description} завершен с предупреждениями`);
    return error.stdout || error.message;
  }
}

// Run knip for files only
report += '## 🗂️ Неиспользуемые файлы (knip)\n\n';
const knipFiles = runCommand('yarn knip --include files', 'Поиск неиспользуемых файлов');
report += '```\n' + knipFiles + '\n```\n\n';

// Run knip for dependencies only  
report += '## 📦 Неиспользуемые зависимости (knip)\n\n';
const knipDeps = runCommand('yarn knip --include dependencies', 'Поиск неиспользуемых зависимостей');
report += '```\n' + knipDeps + '\n```\n\n';

// Run depcheck
report += '## 🔍 Анализ зависимостей (depcheck)\n\n';
const depcheck = runCommand('yarn depcheck', 'Анализ зависимостей через depcheck');
report += '```\n' + depcheck + '\n```\n\n';

// Run ts-unused-exports (first 50 lines to avoid huge output)
report += '## 📤 Неиспользуемые экспорты (ts-unused-exports)\n\n';
const tsUnused = runCommand('yarn ts-unused-exports tsconfig.json | head -50', 'Поиск неиспользуемых экспортов');
report += '```\n' + tsUnused + '\n```\n\n';

report += '## 📊 Сводка\n\n';
report += '- Проанализировано: ' + timestamp + '\n';
report += '- Инструменты: knip, depcheck, ts-unused-exports\n';
report += '- Рекомендация: Проверьте каждый файл/зависимость перед удалением\n\n';

report += '## ⚠️ Важно\n\n';
report += '1. Не удаляйте файлы автоматически\n';
report += '2. Проверьте динамические импорты\n';
report += '3. Убедитесь что приложение работает после изменений\n';

// Write report
fs.writeFileSync(reportPath, report);

console.log(`\n📄 Отчет сохранен: ${reportPath}`);
console.log('🎉 Анализ завершен!'); 