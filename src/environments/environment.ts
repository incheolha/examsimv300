// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angular-6-social-login';

export const environment = {
  production: false            // 환경변수 설정
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
          provider: new GoogleLoginProvider('427231965425-vm5q3b8nhki1n7l5r6grseicif767jtd.apps.googleusercontent.com')
      }
    ]
  );
  return config;
}
