---
'@backstage/plugin-user-settings-backend': minor
---

In preparation to stop supporting the legacy backend system, the `createRouter` function is now deprecated and requires a `logger` and `config` service options in order to configure a an error handler in legacy systems without depending on the soon-to-be-removed `@backstage/backend-common` package. We strongly recommend migrate your backend to the new system since it automatically configures an error handler for you. In the event you still need to use the previous router, here is how you can pass a logger and config services to it.

````diff
```ts
// packages/backend/src/plugins/userSettings.ts
import { createRouter } from '@backstage/plugin-user-settings-backend';
import { PluginEnvironment } from '../types';

export default async function createPlugin(env: PluginEnvironment) {
  return await createRouter({
+    config; env.config
+    logger: env.logger,
    database: env.database,
    identity: env.identity,
  });
}
````

```

```
