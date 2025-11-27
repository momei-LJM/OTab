import { prefix } from '@/consts/config';

export const getCssVar = (name: string) => {
  return `var(--${prefix}-${name})`;
};
