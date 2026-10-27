-- Tabla de estudiantes
CREATE TABLE IF NOT EXISTS students_example (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL
);

-- Tabla de cursos
CREATE TABLE IF NOT EXISTS courses_example (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    creditos INTEGER NOT NULL CHECK (creditos > 0)
);

-- Tabla intermedia para la relación N:M
CREATE TABLE IF NOT EXISTS enrollments_example (
    id SERIAL PRIMARY KEY,
    estudiante_id INTEGER NOT NULL REFERENCES students_example(id) ON DELETE CASCADE,
    curso_id INTEGER NOT NULL REFERENCES courses_example(id) ON DELETE CASCADE,
    fecha_matricula DATE NOT NULL DEFAULT CURRENT_DATE,
    nota_final NUMERIC(3, 1) CHECK (nota_final BETWEEN 0 AND 5),
    UNIQUE (estudiante_id, curso_id)
);

CREATE TABLE IF NOT EXISTS eventos (
    codigo SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    teatro VARCHAR(150) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    fecha_inicio TIMESTAMP NOT NULL,
    fecha_fin TIMESTAMP NOT NULL,
    capacidad INTEGER NOT NULL CHECK (capacidad > 0),
    precio NUMERIC(12, 2) NOT NULL CHECK (precio >= 0),
    observaciones TEXT,
    estado VARCHAR(20) NOT NULL DEFAULT 'Programado'
        CHECK (estado IN ('Programado', 'En Boleteria', 'En Vivo', 'Finalizado', 'Cancelado')),
    CHECK (fecha_fin > fecha_inicio)
);

CREATE TABLE IF NOT EXISTS reservas (
    codigo SERIAL PRIMARY KEY,
    evento_codigo INTEGER NOT NULL REFERENCES eventos(codigo) ON DELETE CASCADE,
    cliente VARCHAR(150) NOT NULL,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    entradas INTEGER NOT NULL CHECK (entradas BETWEEN 1 AND 10),
    total NUMERIC(12, 2) NOT NULL CHECK (total >= 0),
    observaciones TEXT,
    estado VARCHAR(20) NOT NULL DEFAULT 'Reservada'
        CHECK (estado IN ('Reservada', 'Confirmada', 'Cancelada'))
);
