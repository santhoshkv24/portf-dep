import { describe, it, expect } from 'vitest';
import { cn } from '../src/utils/cn';

describe('Environment & Utility Setup', () => {
  it('correctly merges conditional tailwind classes', () => {
    expect(cn('px-4 py-2', true && 'bg-obsidian', false && 'hidden')).toBe('px-4 py-2 bg-obsidian');
  });

  it('resolves conflicting tailwind utility classes properly', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
    expect(cn('text-mist', 'text-chalk')).toBe('text-chalk');
  });

  it('handles falsy values, null, undefined, and nested arrays', () => {
    expect(cn('base-class', null, undefined, false, ['sub-class', true && 'active'])).toBe(
      'base-class sub-class active'
    );
  });
});
