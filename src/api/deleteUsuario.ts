import { assert } from 'console';
import { envConfig } from '../../playwright.config';

export const deleteUsuario = async (email: string, token?: string) => {
  assert(typeof email === 'string' && email, 'Email para exlcusão de usuário inválido');
  assert(token === undefined || (typeof token === 'string' && token), 'Token de autenticação para exlcusão de usuário inválido');

  const variables = envConfig.variables;
  const headers = {
    authorization: `Bearer ${token ?? variables.auth0M2MClientId ?? ''}`,
    "Content-Type": "application/json",
  };
  const data = [email]
  const response = await fetch(new URL('usuarios/bulk', variables.apiUrl), {method: 'DELETE', headers, body: JSON.stringify(data)})
  assert(response.ok, `Erro ao excluir usuário: ${email}`);
}