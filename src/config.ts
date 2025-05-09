import assert from 'assert';

const getVariables = () => {
  const variables = {
    plataformaURL: process.env.PLATAFORMA_URL ?? '',
    adminURL: process.env.ADMIN_URL ?? '',
  };
  console.log(variables);
  assert(variables.adminURL !=='' && variables.plataformaURL !=='', 'Variável de ambiente (url da plataforma ou admin) não está definida');
  return variables;
}

const config ={getVariables};

export default config;
