import assert from 'assert';

const getVariables = () => {
  const variables = {
    plataformaURL: process.env.PLATAFORMA_URL ?? '',
    adminURL: process.env.ADMIN_URL ?? '',
    apiURL: process.env.API_URL ?? '',
    auth0M2MClientId: process.env.AUTH0_M2M_CLIENT_ID,
  };

  assert(variables.plataformaURL, 'Variável de ambiente url da plataformanão está definida');
  assert(variables.adminURL, 'Variável de ambiente url do admin não está definida');
  assert(variables.apiURL, 'Variável de ambiente url da api não está definida');
  return variables;
}

const config ={getVariables};

export default config;
