import { describe, expect, it } from 'vitest';

describe('custom matcher', () => {
  it('should support toBeOneOf', () => {
    expect(1).toBeOneOf([1, 2, 3]);
    expect(4).not.toBeOneOf([1, 2, 3]);
  });
});
