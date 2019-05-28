// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urls: {
    auth: {
      token: '/api/oauth/token',
      me: '/api/me'
    },
    apartments: {
      list: '/api/apartment',
      create: '/api/apartment',
      update: (id: string) => `/api/apartment/${id}`,
      get: (id: string) => `/api/apartment/${id}`,
      delete: (id: string) => `/api/apartment/${id}`,
      all: '/api/apartment/all'
    },
    trip: {
      list: '/api/trip',
      byId: (tripId: string) => `api/trip/${tripId}`,
      confirm: (tripId: string) => `/api/trip/${tripId}/confirm`,
      decline: (tripId: string) => `/api/trip/${tripId}/decline`,
      match: (tripId: string) => `/api/trip/${tripId}/match`,
      merge: `/api/trip/merge`,
      userView: (id: string) => `/api/trip/${id}/user-view`
    },
    users: {
      list: '/api/user',
      allList: '/api/user/all',
      create: '/api/user',
      resetPassword: '/api/user/resetPassword',
      savePassword: '/api/user/savePassword',
      get: (userId: string) => `/api/user/${userId}`,
      update: (userId: string) => `/api/user/${userId}`
    },
    events: {
      create: '/api/event',
      list: '/api/event',
      delete: (id: string) => `/api/event/${id}`
    }
  },
  constants: {
    pageSize: 5
  },
  homePageUrls: {
    admin: 'users',
    organiser: 'apartments',
    user: 'apartments'
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
