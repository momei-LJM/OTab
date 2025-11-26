import { AppCtx } from '@/config';
import { defaultData } from '@/hooks/useAppContext';
import { createContext } from 'react';

export const AppContext = createContext<AppCtx>(defaultData);
