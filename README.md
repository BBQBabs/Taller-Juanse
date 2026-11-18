# Asistente para (D&D)

Taller individual de Desarrollo de Aplicaciones Multiplataforma. Es una app web hecha con React y Vite que le sirve a un Dungeon Master durante la partida: consultar monstruos, generar el botín cuando los jugadores ganan un combate y lanzar dados. Los datos salen de la API pública [dnd5eapi.co](https://www.dnd5eapi.co/api/) y la versión para Android la armé con Capacitor.

## Enlaces

- Aplicación web (Vercel): https://taller-juanse.vercel.app
- APK para Android: https://github.com/BBQBabs/Taller-Juanse/releases

## Qué hace

**Bestiario.** Trae la lista de monstruos desde `/api/monsters`, se pueden buscar por nombre y están paginados. Cada tarjeta muestra la clase de armadura, los puntos de golpe y el nivel de desafío. Hice un solo componente `Card` y lo reutilicé también en el botín.

**Botín.** Se elige el nivel de desafío del monstruo derrotado (de 0 a 30) y la app saca monedas de cobre, plata, oro y platino, además de objetos reales de `/api/equipment` y `/api/magic-items`. Entre más alto el nivel, más monedas y más objetos, y es más probable que salgan objetos mágicos.

**Dados.** Están el d4, d6, d8, d10, d12, d20 y d100. Se escoge el dado, se lanza y el resultado aparece grande con una pequeña animación. También guarda los últimos lanzamientos y en el d20 marca los críticos y las pifias.

## Estructura del proyecto

```
src/
  App.jsx                navegación entre los tres módulos
  styles.css             estilos (pensados primero para celular)
  components/
    Card.jsx             tarjeta reutilizable
    Bestiary.jsx         bestiario
    LootGenerator.jsx    generador de botín
    DiceTray.jsx         bandeja de dados
```

## Correrlo en local

```bash
npm install
npm run dev
```

## Generar el APK

Primero se compila la web y después se pasa a Android con Capacitor:

```bash
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

Ya en Android Studio, voy a Build > Build Bundle(s) / APK(s) > Build APK(s). El archivo queda en `android/app/build/outputs/apk/debug/app-debug.apk` y lo subí a la sección Releases del repositorio (versión v1.0.0).
