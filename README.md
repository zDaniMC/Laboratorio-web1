# Proyecto Integrador Web I — EventApp

Monorepo con un frontend en **Angular 20** y un backend en **Node.js (Express + TypeScript)** conectado a **PostgreSQL**.

## Laboratorio I — Funcionalidades desarrolladas

| # | Funcionalidad | Backend (API REST) | Frontend (Angular) |
|---|---------------|--------------------|--------------------|
| 1 | Cartelera de eventos | `GET /api/events` (filtros `?ciudad=` y `?estado=`) y `GET /api/events/:codigo` | Página `/client/catalog` con tarjetas, filtros y barra de ocupación |
| 2 | Reporte de reservas | `GET /api/reservations` (filtro `?estado=`) y `GET /api/reservations/summary` | Página `/agent/report` con indicadores, gráfica de barras, distribución por estado y tabla |

### Base de datos

Se agregaron dos tablas en `Backend/src/database/init.sql` y sus datos de prueba en `seed.sql`:

- **eventos**: código, nombre, descripción, teatro, ciudad, fechas, capacidad, precio, observaciones y estado.
- **reservas**: código, evento (llave foránea a `eventos`), cliente, fecha, entradas, total, observaciones y estado.

La ocupación de cada evento (entradas vendidas y disponibles) se calcula con las reservas que no están canceladas.

### Estructura agregada

```
Backend/src
├── domain/interfaces/event.interface.ts
├── domain/interfaces/reservation.interface.ts
└── presentation/modules
    ├── events/        (events.routes.ts, events.controller.ts, events.service.ts)
    └── reservations/  (reservations.routes.ts, reservations.controller.ts, reservations.service.ts)

Frontend/src/app
├── config/api.config.ts
├── interfaces/reservation-report.interface.ts
├── services/events/events.service.ts
├── services/reservations/reservations.service.ts
└── pages
    ├── client-catalog/
    └── agent-report/
```

## Cómo ejecutar

### 1. Base de datos y backend

```bash
cd Backend
docker compose up -d     # PostgreSQL en el puerto 5433 y pgAdmin en el 8081
npm install
npm run db:init          # crea las tablas
npm run db:seed          # inserta los datos de prueba
npm start                # API en http://localhost:3000
```

Documentación Swagger: http://localhost:3000/api/docs

### 2. Frontend

```bash
cd Frontend
npm install
npm start                # http://localhost:4200
```

- Cartelera de eventos: http://localhost:4200/client/catalog
- Reporte de reservas: http://localhost:4200/agent/report
