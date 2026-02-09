# 🎮 Taboo Game - Inicio Rápido

## 📥 Instalación

1. Abre una terminal en esta carpeta
2. Ejecuta:
```bash
npm install
npm run dev
```

3. Abre tu navegador en `http://localhost:5173`

## 📱 Uso en celular

Para probar en tu celular:

1. Asegúrate de que tu celular y computadora están en la misma red WiFi
2. Ejecuta `npm run dev`
3. Busca la dirección que dice "Network: http://192.168.x.x:5173"
4. Abre esa dirección en el navegador de tu celular

## 🎯 Agregar más cartas

Edita el archivo `src/taboo-game.jsx` y agrega cartas al array `CARD_DATABASE`:

```javascript
const CARD_DATABASE = [
  { word: 'TU_PALABRA', forbidden: ['PALABRA1', 'PALABRA2', 'PALABRA3', 'PALABRA4', 'PALABRA5'] },
  // ... más cartas
];
```

## 🎨 Personalizar colores

Edita las variables CSS en `src/taboo-game.css`:

```css
:root {
  --primary: #FF3366;      /* Color principal */
  --secondary: #6C5CE7;    /* Color secundario */
  --accent: #FDCB6E;       /* Color de acento */
  --success: #00D4AA;      /* Color de éxito */
}
```

¡Diviértete! 🎉
