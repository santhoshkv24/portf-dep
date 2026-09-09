import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

export type CursorState = 'default' | 'hover' | 'inspect' | 'drag';

export interface CursorContextValue {
  cursorState: CursorState;
  cursorText: string;
  setCursorState: (state: CursorState) => void;
  setCursorText: (text: string) => void;
  setCursor: (state: CursorState, text?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextValue | null>(null);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [cursorText, setCursorText] = useState<string>('');

  const resetCursor = useCallback(() => {
    setCursorState('default');
    setCursorText('');
  }, []);

  const setCursor = useCallback((state: CursorState, text: string = '') => {
    setCursorState(state);
    setCursorText(text);
  }, []);

  const value = useMemo(
    () => ({
      cursorState,
      cursorText,
      setCursorState,
      setCursorText,
      setCursor,
      resetCursor,
    }),
    [cursorState, cursorText, resetCursor, setCursor]
  );

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
};

export function useOptionalCursor(): CursorContextValue | null {
  return useContext(CursorContext);
}

export function useCursor(): CursorContextValue {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}
