import { assert } from 'console';
import config from '../config'

export const deleteUsuario = async (email: string, token?: string) => {
  assert(typeof email === 'string' && email, 'Email para exlcusão de usuário inválido');
  assert(token === undefined || (typeof token === 'string' && token), 'Token de autenticação para exlcusão de usuário inválido');

  const variables = config.getVariables();
  const headers = {
    authorization: `Bearer ${token ?? variables.auth0M2MClientId ?? ''}`,
    "Content-Type": "application/json",
  };
  const data = [email]
  const response = await fetch(new URL('usuarios/bulk', variables.apiURL), {method: 'DELETE', headers, body: JSON.stringify(data)})
  assert(!response.ok, `Erro ao excluir usuário: ${email}`);
}