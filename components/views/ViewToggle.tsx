'use client';

interface Props {
  view: 'internal' | 'external';
  onChange: (view: 'internal' | 'external') => void;
}

export function ViewToggle({ view, onChange }: Props) {
  return (
    <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
      <button
        onClick={() => onChange('internal')}
        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
          view === 'internal'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Internal
      </button>
      <button
        onClick={() => onChange('external')}
        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
          view === 'external'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        External
      </button>
    </div>
  );
}
