'use client';

import { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { tokens } from '@/lib/design-tokens';

type SearchInputProps = {
  onSearch?: (query: string) => void;
  placeholder?: string;
};

export default function SearchInput({ 
  onSearch,
  placeholder = 'Busca tu libro ideal...' 
}: SearchInputProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = useCallback(() => {
    setQuery('');
    onSearch?.('');
  }, [onSearch]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  }, [onSearch]);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '420px' }}>
      <div style={{ position: 'relative' }}>
        <input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Buscar libros"
          style={{
            width: '100%',
            height: '56px',
            padding: '0 48px 0 20px',
            borderRadius: tokens.borderRadius.lg,
            border: `2px solid ${isFocused ? tokens.colors.customBooks.primary : tokens.colors.neutral.surface.border}`,
            fontSize: tokens.typography.body.size,
            lineHeight: tokens.typography.body.lineHeight,
            outline: 'none',
            transition: `border-color ${tokens.transitions.base}`,
            background: tokens.colors.neutral.surface.base,
            color: tokens.colors.neutral.text.primary,
          }}
        />
        
        {query && (
          <button
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: tokens.borderRadius.sm,
              transition: `background-color ${tokens.transitions.fast}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = tokens.colors.neutral.surface.hover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <X size={20} color={tokens.colors.neutral.text.muted} />
          </button>
        )}
        
        {!query && (
          <div
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
            }}
          >
            <Search size={24} color={tokens.colors.neutral.text.muted} />
          </div>
        )}
      </div>
    </div>
  );
}
