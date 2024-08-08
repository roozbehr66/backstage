/*
 * Copyright 2024 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  DatabaseService,
  RootConfigService,
  RootLoggerService,
} from '@backstage/backend-plugin-api';
import { MiddlewareFactory } from '@backstage/backend-defaults/rootHttpRouter';
import express from 'express';
import { IdentityApi } from '@backstage/plugin-auth-node';
import { SignalsService } from '@backstage/plugin-signals-node';
import { createRouter as _createRouter } from './service';

/**
 * Type for the options passed to the "createRouter" function.
 *
 * @public
 * @deprecated This type is only exported for legacy reasons and will be removed in the future.
 */
export type RouterOptions = {
  config: RootConfigService;
  logger: RootLoggerService;
  database: DatabaseService;
  identity: IdentityApi;
  signals?: SignalsService;
};

/**
 * Create the user settings backend routes.
 *
 * @public
 * @deprecated This function is only exported for legacy reasons and will be removed in the future.
 */
export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const router = await _createRouter(options);
  const middleware = MiddlewareFactory.create(options);
  router.use(middleware.error());
  return router;
}
