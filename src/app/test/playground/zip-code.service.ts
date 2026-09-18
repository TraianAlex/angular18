import { httpResource } from '@angular/common/http';
import { Service, Signal } from '@angular/core';

export interface ZipCodeLookupResult {
  ok: boolean;
}

@Service()
export class ZipCodeService {
  createZipCodeResource(zip: Signal<string | undefined>) {
    return httpResource<ZipCodeLookupResult>(
      () => {
        const value = zip()?.trim().replace(/\s+/g, '');
        if (!value) {
          return undefined;
        }
        return `https://api.zippopotam.us/us/${value}`;
      },
      {
        parse: (response: unknown) => {
          const places = (response as { places?: unknown[] } | null)?.places;
          return { ok: Array.isArray(places) && places.length > 0 };
        },
      },
    );
  }
}
