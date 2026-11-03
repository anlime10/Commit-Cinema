# 📖 Solucionario y Guía Docente: Práctica de Git Avanzado
## Solución Detallada y Roles Tripartitos (Preguntas 11 a 20 — 60 Minutos)

---

### Solución Pregunta 11: Fork del Proyecto, Clonación y Configuración Tripartita
* **Acción en GitHub (A)**: Dev A realiza Fork de `https://github.com/anlime10/Commit-Cinema` a su organización/cuenta y añade a Dev B y Dev C en *Settings > Collaborators*.
* **Comandos en terminal (Ejecutados por A, B y C individualmente)**:
  ```bash
  git clone https://github.com/<VUESTRO_GRUPO>/Commit-Cinema.git
  cd Commit-Cinema
  git config user.name "Nombre Alumno"
  git config user.email "alumno@alum.uca.es"
  git remote add upstream https://github.com/anlime10/Commit-Cinema.git
  git remote -v
  ```

---

### Solución Pregunta 12: Distribución y Creación de Ramas de Trabajo
* **Desarrollador A**:
  ```bash
  git checkout -b feature/cartelera-navidad
  git push -u origin feature/cartelera-navidad
  ```
* **Desarrollador B**:
  ```bash
  git fetch origin
  git checkout feature/cartelera-navidad
  ```
* **Desarrollador C**:
  ```bash
  git checkout main
  git checkout -b feature/decoracion-navidad
  git push -u origin feature/decoracion-navidad
  ```
* **Comprobación conjunta (A, B y C)**:
  ```bash
  git branch -a
  ```

---

### Solución Pregunta 13: Concurrencia en la Misma Rama y Sincronización Tripartita
* **Desarrollador A**:
  Edita `index.html` (Película 1: portada `assets/Solo en casa.jpeg` y título `Solo en Casa`):
  ```html
  <img src="assets/Solo en casa.jpeg" alt="Solo en Casa" loading="lazy">
  <h4 class="movie-title">Solo en Casa</h4>
  ```
  ```bash
  git add index.html
  git commit -m "feat: anadir Solo en Casa y portada a cartelera"
  git push origin feature/cartelera-navidad
  ```
* **Desarrollador B**:
  Edita `index.html` (Película 2: portada `assets/The Grinch.jpeg` y título `El Grinch`):
  ```html
  <img src="assets/The Grinch.jpeg" alt="El Grinch" loading="lazy">
  <h4 class="movie-title">El Grinch</h4>
  ```
  ```bash
  git add index.html
  git commit -m "feat: anadir El Grinch y portada a cartelera"
  git push origin feature/cartelera-navidad
  # Recibe el error: [rejected] (fetch first)
  git pull origin feature/cartelera-navidad
  # Git realiza merge automático por tratarse de líneas distintas
  git push origin feature/cartelera-navidad
  ```
* **Desarrollador C y Desarrollador A**:
  ```bash
  git pull origin feature/cartelera-navidad   # (o git fetch origin)
  git log --oneline -n 3
  ```

---

### Solución Pregunta 14: Cambio de Estilos, Inspección con `git diff` y Revisión Cruzada
* **Desarrollador C**:
  Modifica en `css/styles.css` las variables de color en `:root`:
  ```bash
  git diff css/styles.css
  git add css/styles.css
  git commit -m "style: actualizar colores a tonos navidenos"
  git push origin feature/decoracion-navidad
  ```
* **Desarrollador A y B**:
  ```bash
  git fetch origin
  git diff HEAD origin/feature/decoracion-navidad
  ```

---

### Solución Pregunta 15: Pausa Rápida de Trabajo con `git stash` y Validación en Equipo
* **Desarrollador A**:
  ```bash
  git status
  git stash push -m "WIP: nuevo badge"
  git status
  ```
* **Desarrollador B y C (Indican los comandos a A)**:
  ```bash
  git stash list
  git stash pop
  git restore index.html
  ```
* **Todos (A, B y C)**:
  ```bash
  git status
  # Comprueban que el árbol de trabajo está limpio
  ```

---

### Solución Pregunta 16: El Conflicto de Fusión a Tres Bandas (Merge Conflict)
* **Desarrollador A** (en `feature/cartelera-navidad`):
  Modifica el Hero Banner en `index.html` a `Festival de Cine Navideño Familiar`.
  ```bash
  git add index.html
  git commit -m "feat(hero): titular familiar para navidad"
  git push origin feature/cartelera-navidad
  ```
* **Desarrollador C** (en `feature/decoracion-navidad`):
  Modifica el Hero Banner en `index.html` a `Gran Estreno de Películas Navideñas`.
  ```bash
  git add index.html
  git commit -m "feat(hero): titular de grandes estrenos"
  git push origin feature/decoracion-navidad
  ```
* **Desarrollador B (Líder de Integración en `main`)**:
  ```bash
  git checkout main
  git pull origin main
  git merge feature/cartelera-navidad
  git merge feature/decoracion-navidad
  # Conflicto reportado en index.html
  ```
  Los tres consensúan el texto:
  `<h2 class="hero-title">Festival de Cine: Grandes Estrenos Navideños</h2>`
  ```bash
  git add index.html
  git commit -m "merge: resolver conflicto en titulo del hero banner"
  git push origin main
  ```
* **Desarrollador A y C**:
  ```bash
  git checkout main
  git pull origin main
  git log -n 1 --stat
  ```

---

### Solución Pregunta 17: Creación Experimental y `git cherry-pick` Colaborativo
* **Desarrollador B**:
  ```bash
  git checkout -b experimento/promo
  # Edita activeDiscountCode: 'NAVIDAD2026' en js/main.js
  git add js/main.js
  git commit -m "feat(promo): activar codigo promocional NAVIDAD2026"
  git push -u origin experimento/promo
  ```
* **Desarrollador A y C**:
  ```bash
  git fetch origin
  git log origin/experimento/promo --oneline -n 1
  # Localizan el hash, ej: c81a9f2
  ```
* **Desarrollador A**:
  ```bash
  git checkout main
  git cherry-pick c81a9f2
  git push origin main
  ```
* **Desarrollador B y C**:
  ```bash
  git checkout main
  git pull origin main
  ```

---

### Solución Pregunta 18: Simulación de Error y `git revert` Supervisado
* **Desarrollador C** (en `main`):
  Borra la línea del footer en `index.html`.
  ```bash
  git add index.html
  git commit -m "oops: borrado accidental del footer"
  git push origin main
  ```
* **Desarrollador A y B**:
  ```bash
  git pull origin main
  # Detectan la falta del footer
  ```
* **Desarrollador A**:
  ```bash
  git log -n 1 --oneline
  git revert HEAD --no-edit
  git push origin main
  ```
* **Todos (A, B y C)**:
  ```bash
  git pull origin main
  git log -n 2 --oneline
  # Verifican que se creó un commit compensatorio sin reescribir la historia
  ```

---

### Solución Pregunta 19: Etiquetado de Versión (`git tag`) y Limpieza Colegiada de Ramas
* **Desarrollador A**:
  ```bash
  git tag -a v2.0.0-navidad -m "Lanzamiento oficial de la web navidena"
  ```
* **Desarrollador B**:
  ```bash
  git show v2.0.0-navidad
  ```
* **Desarrollador C**:
  ```bash
  git branch -d feature/cartelera-navidad
  git branch -d feature/decoracion-navidad
  git branch -d experimento/promo
  git push origin --delete feature/cartelera-navidad
  git push origin --delete feature/decoracion-navidad
  git push origin --delete experimento/promo
  ```
* **Desarrollador A y B**:
  ```bash
  git branch -d feature/cartelera-navidad
  git branch -d feature/decoracion-navidad
  git branch -d experimento/promo
  git branch -a
  ```

---

### Solución Pregunta 20: Visualización Gráfica Conjunta y Entrega por Pull Request
* **Desarrollador A**:
  ```bash
  git push origin main --tags
  ```
* **Todos (A, B y C)**:
  ```bash
  git fetch --tags
  git log --oneline --graph --all --decorate
  ```
* **Desarrollador B**:
  En GitHub abre el Pull Request desde el Fork hacia `anlime10/Commit-Cinema` pegando el gráfico obtenido en terminal.
