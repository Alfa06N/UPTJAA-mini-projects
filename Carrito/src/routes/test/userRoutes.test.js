import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../services/server'; 

describe('Rutas de Usuario', () => {
  it('debería crear un nuevo usuario', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password_hash: 'secretpass',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Usuario creado exitosamente.');
  });
});