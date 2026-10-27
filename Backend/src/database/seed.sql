-- Estudiantes
INSERT INTO students_example (nombre, correo) 
VALUES
    ('Carlos Ramirez', 'carlos.example@example.com'),
    ('Laura Gomez', 'laura.example@example.com'),
    ('Andres Martinez', 'andres.example@example.com');

-- Cursos
INSERT INTO courses_example (nombre, creditos) 
VALUES
    ('Bases de Datos', 3),
    ('Programacion Web', 4),
    ('Arquitectura de Software', 3);

-- Matrículas
INSERT INTO enrollments_example (estudiante_id, curso_id, fecha_matricula, nota_final)
VALUES
    (1, 1, CURRENT_DATE, 4.5),
    (1, 2, CURRENT_DATE, 4.2),
    (2, 1, CURRENT_DATE, 3.8),
    (2, 3, CURRENT_DATE, 4.6),
    (3, 2, CURRENT_DATE, 4.0);

INSERT INTO eventos (nombre, descripcion, teatro, ciudad, fecha_inicio, fecha_fin, capacidad, precio, observaciones, estado)
VALUES
    ('Festival de Música del Valle', 'Festival con artistas nacionales y locales de diferentes géneros musicales.', 'Coliseo de Ferias', 'Tuluá', '2026-11-15 18:00', '2026-11-15 23:30', 5000, 85000, 'Apertura de puertas a las 5:00 PM.', 'Programado'),
    ('Concierto Sinfónico de Primavera', 'Presentación de la Orquesta Sinfónica del Valle con repertorio clásico y contemporáneo.', 'Teatro Municipal', 'Cali', '2026-11-20 19:00', '2026-11-20 21:30', 1200, 65000, 'Venta de boletería habilitada en puntos autorizados.', 'En Boleteria'),
    ('Rock al Parque Valle', 'Festival de rock con participación de bandas nacionales e internacionales.', 'Estadio Doce de Octubre', 'Tuluá', '2026-10-27 17:00', '2026-10-27 23:00', 8000, 45000, 'Evento actualmente en desarrollo.', 'En Vivo'),
    ('Obra de Teatro: El Principito', 'Adaptación teatral del clásico literario El Principito.', 'Teatro Municipal Enrique Buenaventura', 'Cali', '2026-09-28 19:00', '2026-09-28 21:00', 900, 55000, 'Evento finalizado satisfactoriamente.', 'Finalizado'),
    ('Concierto de Música Urbana', 'Concierto con los principales exponentes de música urbana de la región.', 'Centro de Eventos Valle del Pacífico', 'Cali', '2026-10-10 19:00', '2026-10-10 23:00', 6000, 75000, 'Cancelado por motivos logísticos. Se realizará devolución del dinero.', 'Cancelado'),
    ('Show de Comedia Stand Up', 'Noche de humor con comediantes invitados.', 'Auditorio Central', 'Buga', '2026-12-05 20:00', '2026-12-05 22:00', 300, 35000, NULL, 'En Boleteria');

INSERT INTO reservas (evento_codigo, cliente, fecha, entradas, total, observaciones, estado)
VALUES
    (1, 'Carlos Ramirez', '2026-10-01 10:15', 3, 255000, NULL, 'Confirmada'),
    (1, 'Laura Gomez', '2026-10-02 14:40', 2, 170000, 'Solicita ubicación central', 'Reservada'),
    (1, 'Andres Martinez', '2026-10-03 09:05', 4, 340000, NULL, 'Confirmada'),
    (2, 'Valentina Rojas', '2026-10-04 16:20', 2, 130000, NULL, 'Confirmada'),
    (2, 'Santiago Lopez', '2026-10-05 11:00', 1, 65000, 'Cancelación solicitada por el cliente', 'Cancelada'),
    (3, 'Daniela Castro', '2026-10-06 18:30', 5, 225000, NULL, 'Confirmada'),
    (3, 'Mateo Herrera', '2026-10-07 12:10', 2, 90000, NULL, 'Reservada'),
    (4, 'Camila Torres', '2026-09-10 08:45', 2, 110000, NULL, 'Confirmada'),
    (5, 'Juan Pablo Diaz', '2026-09-20 15:00', 3, 225000, 'Pendiente de devolución', 'Cancelada'),
    (6, 'Sofia Vargas', '2026-10-08 19:25', 4, 140000, NULL, 'Reservada'),
    (6, 'Nicolas Ortiz', '2026-10-09 10:00', 2, 70000, NULL, 'Confirmada');
