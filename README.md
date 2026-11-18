# ⚔️ Asistente del Dungeon Master (D&D 5e)

Herramienta para un Dungeon Master hecha con **React + Vite + JavaScript + CSS**, que consume la API pública [dnd5eapi.co](https://www.dnd5eapi.co/api/) y se empaqueta para Android con **CapacitorJS**.

## 🔗 Enlaces

- 🌐 **Aplicación en Vercel:** https://TU-APP.vercel.app  <!-- reemplazar -->
- 📱 **APK (Releases):** https://github.com/TU-USUARIO/dnd-dm-assistant/releases  <!-- reemplazar -->

## Módulos

1. **Bestiario:** lista y busca monstruos (`/api/monsters`). Cada tarjeta muestra nombre, Clase de Armadura, Puntos de Golpe y Nivel de Desafío usando un componente `Card` reutilizable.
2. **Generador de Botín:** eliges el nivel de desafío (0–30) y se generan monedas (cobre, plata, oro, platino) y objetos reales de `/api/equipment` y `/api/magic-items`. A mayor nivel, más monedas, más objetos y más probabilidad de objetos mágicos.
3. **Bandeja de dados:** d4, d6, d8, d10, d12, d20 y d100 con botón de lanzamiento, resultado grande y animado, y historial.

## Estructura

```
src/
  App.jsx                  # pestañas de navegación
  styles.css               # estilos mobile-first
  components/
    Card.jsx               # tarjeta genérica reutilizable
    Bestiary.jsx           # módulo 1
    LootGenerator.jsx      # módulo 2
    DiceTray.jsx           # módulo 3
```

## Ejecutar en local

```bash
npm install
npm run dev
```

## Generar el APK

```bash
npm run build                  # genera dist/
npx cap add android            # solo la primera vez
npx cap sync android           # copia dist/ al proyecto Android
npx cap open android           # abre Android Studio
```

En Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)**.
El archivo queda en `android/app/build/outputs/apk/debug/app-debug.apk` y se publica en la sección **Releases** (versión `v1.0.0`).
