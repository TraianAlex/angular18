import { expect } from 'vitest';

expect.extend({
  toBeOneOf(received: unknown, items: Array<unknown>) {
    const pass = items.includes(received);
    const message = () => `expected ${received} to be contained in array [${items}]`;
    if (pass) {
      return {
        message,
        pass: true,
      };
    }
    return {
      message,
      pass: false,
    };
  },
});

interface CustomMatchers<R = unknown> {
  toBeOneOf(items: Array<unknown>): R;
}

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type
  interface Assertion<T = any> extends CustomMatchers<T> {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
