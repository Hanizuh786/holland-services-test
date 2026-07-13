
'use client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { hlsApi } from '../features/api/hlsApi';
const store = configureStore({ reducer: { [hlsApi.reducerPath]: hlsApi.reducer }, middleware: gDM => gDM().concat(hlsApi.middleware) });
export function Providers({ children }) { return <Provider store={store}>{children}</Provider>; }
