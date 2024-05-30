import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async get<T>(key: string): Promise<T | null> {
    try {
      const cachedObject = await this.cacheManager.get<string>(key);

      if (!cachedObject) return null;

      return JSON.parse(cachedObject) as T;
    } catch (e) {
      console.log({ e });

      return null;
    }
  }

  async set<T>(
    key: string,
    value: T,
    expiration: number = 300000, // cache expira em 5 minutos
  ): Promise<void> {
    try {
      const serializeValue = JSON.stringify(value);
      return await this.cacheManager.set(key, serializeValue, expiration);
    } catch (e) {
      console.log(e);
    }
  }
}
