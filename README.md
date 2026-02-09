# 🎮 Taboo - Juego de Palabras

Un juego interactivo de Taboo desarrollado con React + Vite, optimizado para dispositivos móviles con animaciones CSS puras.

## 🚀 Características

- ✨ **Diseño moderno y vibrante** con gradientes y animaciones suaves
- 📱 **Optimizado para móviles** con gestos de swipe intuitivos
- 🎨 **Animaciones CSS puras** sin librerías externas
- ⏱️ **Temporizador visual** con indicador circular
- 👥 **Múltiples equipos** (2-6 equipos)
- 🎯 **Sistema de puntos** personalizable
- 🔄 **Revisión de ronda** para validar cartas adivinadas
- 🏆 **Pantalla de victoria** con clasificación de equipos

## 📋 Cómo jugar

1. **Configuración inicial:**
   - Selecciona el tiempo por turno (60, 80 o 90 segundos)
   - Elige el número de equipos (2-6)
   - Define los puntos necesarios para ganar

2. **Durante el juego:**
   - Un jugador toma el celular y ve la carta
   - Debe hacer que su equipo adivine la palabra principal
   - **NO puede decir** ninguna de las 5 palabras prohibidas
   - **Swipe hacia arriba (↑)** si adivinan la palabra
   - **Swipe hacia abajo (↓)** para pasar a la siguiente carta

3. **Revisión:**
   - Al finalizar el tiempo, revisa las cartas marcadas como correctas
   - Elimina cualquier carta que se haya marcado por error
   - Confirma para sumar los puntos al equipo

4. **Victoria:**
   - El primer equipo en alcanzar el puntaje objetivo gana
   - Se muestra el podio con todos los equipos ordenados

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 📱 Estructura del proyecto

```
taboo-game/
├── src/
│   ├── taboo-game.jsx       # Componente principal del juego
│   ├── taboo-game.css        # Estilos y animaciones
│   ├── App.jsx               # Componente raíz
│   ├── App.css               # Estilos de App
│   ├── main.jsx              # Punto de entrada
│   └── index.css             # Estilos globales
├── index.html                # HTML base
├── package.json              # Dependencias
└── vite.config.js            # Configuración de Vite
```

## 🎨 Características de diseño

- **Tipografía:** Bebas Neue para títulos, Archivo para cuerpo
- **Paleta de colores:** Gradientes vibrantes (púrpura, rosa, azul, verde)
- **Animaciones:**
  - Entrada de elementos con stagger
  - Transiciones de swipe suaves
  - Efectos de pulso y rebote
  - Rotación del trofeo
  - Timer circular animado

## 🎯 Base de datos de cartas

El juego incluye 30 cartas pre-cargadas. Para agregar más, edita el array `CARD_DATABASE` en `taboo-game.jsx`:

```javascript
const CARD_DATABASE = [
  { word: 'PALABRA', forbidden: ['PROHIBIDA1', 'PROHIBIDA2', ...] },
  // Agrega más cartas aquí
];
```

## 📱 Gestos táctiles

- **Swipe arriba:** Marca la carta como adivinada correctamente
- **Swipe abajo:** Pasa a la siguiente carta sin sumar punto
- **Tap en revisión:** Elimina una carta marcada incorrectamente

## 🌟 Optimizaciones móviles

- Viewport configurado para prevenir zoom
- Touch-action optimizado
- Animaciones con GPU acceleration
- Diseño responsivo con breakpoints
- Máximo ancho en tablets para mejor experiencia

## 📄 Licencia

Proyecto de código abierto para uso personal y educativo.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Siéntete libre de mejorar el juego agregando:
- Más cartas a la base de datos
- Nuevas categorías o niveles de dificultad
- Sonidos y efectos
- Persistencia de datos con localStorage
- Modo multijugador online

¡Diviértete jugando! 🎉
