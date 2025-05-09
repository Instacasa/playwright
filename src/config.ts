import assert from 'assert';
import { camelToSnake } from './utils';

type TEnvUrl = string;
type TEnvEmail = string;
interface TEnvVariables {
  plataformaUrl: TEnvUrl,
  adminUrl: TEnvUrl,
  apiUrl: TEnvUrl,
  auth0M2MClientId?: string,
  adminUser: TEnvEmail,
  adminPassword: string,
}

export interface TConfig {
  readonly variables: TEnvVariables 
}

export default class Config implements TConfig {
  private static instance: TConfig;

  private envs: Record<string, string | undefined>
  readonly variables: TEnvVariables;

  private constructor(envs: Record<string, string | undefined>) {
    this.envs = envs;
    this.variables = {
      plataformaUrl: this.setEnvUrl('plataformaUrl'),
      adminUrl: this.setEnvUrl('adminUrl'),
      apiUrl: this.setEnvUrl('apiUrl'),
      adminUser: this.setEnvEmail('adminUser'),
      adminPassword: this.setEnv('adminPassword'),
      // Exemplo de variável não obrigatória
      auth0M2MClientId: envs.AUTH0_M2M_CLIENT_ID,
    };
  }

  private setEnvUrl = (variable: string): TEnvUrl => { 
    const envName = camelToSnake(variable, true);
    return this.setEnv(
      variable,
      `Váriavel de ambiente ${envName}, do tipo URL, inválida ou não definida!`,
      /^[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+-~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)?/,
    ) as TEnvUrl;
  };

  private setEnvEmail = (variable: string): TEnvUrl => { 
    const envName = camelToSnake(variable, true)
    return this.setEnv(
      variable,
      `Váriavel de ambiente ${envName}, do tipo email, inválida ou não definida!`,
      /^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9._%+-]+@[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9.-]+\.[a-zA-Z]{2,}$/,
    ) as TEnvEmail;
  };

  private setEnv = (variable: string, message?: string, pattern: RegExp = /^(.+)$/): string => {
    const envName = camelToSnake(variable, true)
    const value = this.envs[envName];
    assert(value && value?.trim() && pattern.test(value), message ?? `Váriavel de ambiente ${envName} inválida ou não definida!`);
    return value;
  }

  static getInstance(envs?: Record<string, any>) {
    assert(envs || Config.instance, 'Problemas na construção das configurações')
    if(envs && !Config.instance){
      Config.instance = new Config(envs);
    }
    return Config.instance;
  }
}
