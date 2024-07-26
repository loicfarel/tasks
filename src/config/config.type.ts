export interface Configuration {
  port: number;
  databaseUri: string;
  apiUrl: string;
  webFrontendUrl: string;
  maintainer: Maintainer;
  jwtSecret: string;
  jwtTtl: string | number; // JWT expiration time
}

export interface Maintainer {
  name: string;
  site: string;
  email: string;
}
