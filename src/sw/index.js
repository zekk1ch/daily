import * as handlers from './handlers';

self.addEventListener('install', handlers.handleInstall);
self.addEventListener('activate', handlers.handleActivate);
self.addEventListener('fetch',  handlers.handleFetch);
self.addEventListener('message',  handlers.handleMessage);
