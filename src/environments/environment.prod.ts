
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angular-6-social-login';

export const environment = {
  production: true
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
