"# Portfolio Experimental - RPG Interface

Portfolio web personal con estética retro game + brutalism digital.

## Concepto Visual

- **Estilo:** Pixel Art + Brutalism + Retro Game UI
- **Paleta:** Negro profundo con acentos verde terminal (#00ff41) y magenta glitch (#ff00ff)
- **Inspiración:** Videojuegos retro, interfaces de sistema, estética post-digital

## Estructura del Sitio

### Secciones:

1. **[BOOT]** - Pantalla de inicio tipo sistema operativo
2. **[PROFILE]** - Presentación personal como ficha de personaje RPG
3. **[SKILLS]** - Skills representadas como atributos RPG con barras de progreso
4. **[PROJECTS]** - Proyectos como items de inventario con rareza (Common, Rare, Epic, Legendary)
5. **[EXPERIENCE]** - Experiencia laboral como quest log / misiones completadas
6. **[CONTACT]** - Terminal interactiva para contacto

## Características

### Panel Lateral RPG
- Avatar personalizable
- Stats del personaje (STR, INT, DEX, LUK)
- Indicador de estado ONLINE
- Navegación tipo menú de juego
- Sistema de información del sistema (uptime)

### Efectos Visuales
- Glitch text animado
- Scanlines CRT
- Efecto blur tipo monitor CRT
- Efectos de brillo (glow)
- Hover states interactivos
- Partículas sutiles decorativas
- Barras de progreso animadas

### Terminal Interactiva
Comandos disponibles:
- `email` - Abre cliente de correo
- `github` - Abre perfil de GitHub
- `linkedin` - Abre perfil de LinkedIn
- `twitter` - Abre perfil de Twitter
- `help` - Muestra ayuda
- `clear` - Limpia la terminal

### Atajos de Teclado
- `Ctrl/Cmd + K` - Focus en terminal
- `ESC` - Limpiar input de terminal
- `1-5` - Navegación rápida entre secciones

## Sistema de Rareza de Proyectos

- **COMMON** (Gris) - Proyectos básicos
- **RARE** (Azul) - Proyectos importantes
- **EPIC** (Púrpura) - Proyectos destacados
- **LEGENDARY** (Dorado) - Proyectos principales

## Tecnologías

- HTML5
- CSS3 (Variables CSS, Grid, Flexbox, Animaciones)
- JavaScript Vanilla (ES6+)
- Google Fonts (Press Start 2P, JetBrains Mono, Space Mono)

## Responsive

El sitio es completamente responsive:
- Desktop: Panel lateral fijo + contenido principal
- Tablet/Mobile: Layout en columna, panel arriba

## Paleta de Colores

```css
--color-bg: #0a0a0a          /* Fondo oscuro */
--color-text: #ffffff         /* Texto blanco */
--color-primary: #00ff41      /* Verde terminal */
--color-secondary: #ff00ff    /* Magenta glitch */
--color-accent: #00ffff       /* Cian tech */
--color-gray: #333333         /* Gris oscuro */
```

## Personalización

### Para personalizar tu portfolio:

1. **Información Personal:**
   - Edita el nombre en el HTML (busca "TU_NOMBRE")
   - Cambia las stats del personaje en el panel lateral
   - Actualiza el nivel

2. **Skills:**
   - Modifica los porcentajes en `style="--skill: 85%"`
   - Agrega o elimina categorías de skills

3. **Proyectos:**
   - Cambia la rareza de los items
   - Actualiza títulos, descripciones y tags
   - Añade enlaces a tus proyectos reales

4. **Experiencia:**
   - Edita los trabajos en la sección de quests
   - Ajusta fechas, empresas y descripciones

5. **Contacto:**
   - Actualiza los enlaces en la sección de contact
   - Modifica los comandos del terminal en script.js

6. **Avatar:**
   - Reemplaza el placeholder con tu imagen pixel art

## Tipografías

- **Press Start 2P** - Títulos pixel art
- **JetBrains Mono** - Texto principal monospace
- **Space Mono** - Textos alternativos

## Traducción de Información Real a UI RPG

### Skills → Attributes:
- **STR (Strength):** Habilidades técnicas fuertes (Backend, Databases)
- **INT (Intelligence):** Conocimientos teóricos (Algorithms, Architecture)
- **DEX (Dexterity):** Habilidades prácticas (Frontend, UI/UX)
- **LUK (Luck):** Soft skills (Teamwork, Communication)

### Proyectos → Inventory Items:
- **Item Icon:** Emoji representativo del proyecto
- **Rarity:** Importancia/impacto del proyecto
- **Stats/Tags:** Tecnologías usadas
- **Description:** Breve explicación del proyecto

### Experiencia → Quest Log:
- **Quest Title:** Puesto de trabajo
- **Company:** Nombre de la empresa
- **Status:** Completado (✓)
- **Rewards:** Skills ganadas, XP (años de experiencia)

---

**Desarrollado con *** usando HTML, CSS y JavaScript**" 
