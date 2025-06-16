// @ts-check
import { test, expect } from '@playwright/test';
//es una libreria para hacer test automaticos E2E
//prueban toda la app desde el frontend hasta el backend
const { loginWith, createNote } = require('./helper')

test.describe("Note app", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset');//resetea la base de datos
    await request.post('http://localhost:3001/api/users', {//crea un usuario
      data: {
        name: 'pepito',
        username: 'pepito',
        password: 'pepito'
      }
    });
    await page.goto("http://localhost:5173");
    //Simula que un usuario entra al sitio web escribiendo la URL. Abre frontend.
  });

  test('front page can be opened', async ({ page }) => {
    await expect(page.getByText('Notes')).toBeVisible();
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible();
  }); //verifica que muesstre el titulo y el pie de pagina

  test('login form can be opened', async ({ page }) => {
    await loginWith(page, "pepito", "pepito")
     await expect(page.getByText('pepito logged in')).toBeVisible();
  });//prueba el login con un usuario de prueba

//**
  test.describe('when logged in', () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, "pepito", "pepito")
    });

    test('a new note can be created', async ({ page }) => {
      await createNote(page, 'a note created by playwright')
      await expect(page.getByText('a note created by playwright')).toBeVisible();
    }); //crea una nota después de loguearse y verifica que aparece.
//**
    test.describe('and a note exists', () => {
      test.beforeEach(async ({ page }) => {
        await createNote(page, 'another note by playwright')
      });

      test('importance can be changed', async ({ page }) => {
        await page.getByRole('button', { name: 'make not important' }).click();
        await expect(page.getByRole('button', { name: 'make important' })).toBeVisible();
      });//cambia el estado de "importante" de una nota.
    });
  });
});
