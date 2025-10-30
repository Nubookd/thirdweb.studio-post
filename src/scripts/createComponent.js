import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Путь к папке components (из scripts -> src -> components)
const componentsPath = path.resolve(__dirname, "..", "components");

const componentName = process.argv[2];
if (!componentName) {
  console.error("Укажите имя компонента");
  process.exit(1);
}

// Путь к файлу компонента
const filePath = path.join(componentsPath, `${componentName}.jsx`);

const jsxContent = `import React from 'react'

export default function ${componentName}() {
  return (
    <></>
  )
}
`;


// Проверяем, не существует ли уже файл
if (fs.existsSync(filePath)) {
  console.error(`❌ Файл ${componentName}.jsx уже существует!`);
  process.exit(1);
}

// Создаем файл
fs.writeFileSync(filePath, jsxContent);
console.log(`✅ Компонент создан: ${filePath}`);




// ====== С папкой


// const folderPath = path.join(srcPath, "components", componentName);

// if (!fs.existsSync(folderPath)) {
//   fs.mkdirSync(folderPath, { recursive: true });
//   console.log(`Папка создана: ${folderPath}`);
// } else {
//   console.log(`Папка уже существует: ${folderPath}`);
// }

// const jsxContent = `import React from 'react'
// import styles from './${componentName}.module.scss';

// export default function ${componentName}() {
//   return (
//     <div>ModalCreatePointTask</div>
//   )
// }
// `;

// const scssContent = `@use "../../assets/styles/variables.scss" as *;

// .container {
//   /* Стили для ${componentName} */
// }
// `;

// fs.writeFileSync(path.join(folderPath, `${componentName}.jsx`), jsxContent);
// fs.writeFileSync(
//   path.join(folderPath, `${componentName}.module.scss`),
//   scssContent
// );

// console.log(`Компонент ${componentName} создан в ${folderPath}`);
