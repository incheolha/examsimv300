// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angular-6-social-login';

export const environment = {
  production: false
};

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('506098316522281')
      },
      {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('97692696799-l8i6pfujb3fnh1at7bgch6t48pdh90fo.apps.googleusercontent.com')
      }
    ]
  );
  return config;
}
