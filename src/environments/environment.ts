// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urls: {
    auth: {
      token: '/api/oauth/token'
    },
    apartments: {
      list: 'api/apartment',
      all: '/api/apartment/all',
      byId: (id) => `/api/apartment/${id}`
    },
    trip: {
      list: '/api/trip',
      byId: (tripId: string) => `api/trip/${tripId}`,
      confirm: (tripId: string, userId: string) => `/api/trip/${tripId}/${userId}/confirm`,
      decline: (tripId: string, userId: string) => `/api/trip/${tripId}/${userId}/decline`,
      match: (tripId: string) => `/api/trip/${tripId}/match`,
      merge: `/api/trip/merge`,
      userTrips: (userId: string) => `/api/trip/user/${userId}/`
    },
    users: {
      list: '/api/user',
      allList: '/api/user/all',
      create: '/api/user',
      resetPassword: '/api/user/resetPassword',
      savePassword: '/api/user/savePassword',
      details: (userId: string) => `/api/user/details/${userId}`,
      update: (userId: string) => `/api/user/${userId}`
    }
  },
  constants: {
    pageSize: 5
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
