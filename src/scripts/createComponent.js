import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Получаем текущую директорию в ES модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Путь к папке components
const srcPath = path.join(__dirname, '..');
const componentsPath = path.join(srcPath, 'components');

const componentName = process.argv[2];
if (!componentName) {
  console.error('❌ Please provide component name: npm run createComponent ComponentName');
  process.exit(1);
}

// Создаем пути для папки компонента
const componentPathType = process.argv[3]
const componentDir = path.join(componentsPath, componentPathType, componentName);

try {
  // Создаем папку компонента
  fs.mkdirSync(componentDir, { recursive: true });
  console.log(`📁 Created folder: ${componentDir}`);

  // Шаблон компонента
  const componentTemplate = `import styles from './${componentName}.module.scss';

export default function ${componentName}({ children }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}
`;

  // Шаблон стилей
  const stylesTemplate = `@use "../../../styles/variables.scss" as *;
`;

  // Шаблон index.js для чистого импорта
  const indexTemplate = `export { default } from './${componentName}';
`;

  // Создаем файлы
  fs.writeFileSync(path.join(componentDir, `${componentName}.jsx`), componentTemplate);
  fs.writeFileSync(path.join(componentDir, `${componentName}.module.scss`), stylesTemplate);
  fs.writeFileSync(path.join(componentDir, 'index.js'), indexTemplate);

  console.log(`✅ Component ${componentName} created successfully!`);
  console.log(`📁 Location: ${componentDir}`);
  console.log('📝 Created files:');
  console.log(`   - ${componentName}.jsx`);
  console.log(`   - ${componentName}.module.scss`);
  console.log(`   - index.js`);

} catch (error) {
  console.error('❌ Error creating component:', error.message);
  process.exit(1);
}