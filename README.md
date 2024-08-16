# Development

Pasos para levantar la app en desarrollo

1. Levantar la base de datos

```bash
docker compose up -d
```

2. Renombrar el .env.template a .env
3. Remplazar variables de entorno
4. Ejecutar el SEED para [crear la bd local](localhost:3000/api/seed)

# Prisma comands

```bash
npx prisma init

npx prisma migrate dev

npx prisma generate
```

# Prod

# Stage
