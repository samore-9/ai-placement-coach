import { useCallback, useRef, useState } from 'react';
import { FiUploadCloud, FiFile, FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

const MAX_SIZE = 5 * 1024 * 1024;

export function ResumeUploadZone({ onUpload, uploading, hasExisting }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const validateAndUpload = useCallback(
    (file) => {
      if (!file) return;
      if (file.type !== 'application/pdf') {
        toast.error('Only PDF files are supported');
        return;
      }
      if (file.size > MAX_SIZE) {
        toast.error('File must be under 5MB');
        return;
      }
      onUpload(file);
    },
    [onUpload]
  );

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    validateAndUpload(e.dataTransfer.files?.[0]);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
      onClick={() => !uploading && inputRef.current?.click()}
      className={cn(
        'flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-colors',
        dragActive ? 'border-signal-500 bg-signal-50 dark:bg-signal-900/20' : 'border-ink-100 dark:border-ink-700',
        uploading && 'pointer-events-none opacity-70'
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => validateAndUpload(e.target.files?.[0])}
      />

      {uploading ? (
        <>
          <FiLoader className="animate-spin text-signal-500" size={32} />
          <p className="mt-4 text-sm font-medium text-ink-900 dark:text-ink-100">Analyzing your resume…</p>
          <p className="mt-1 text-xs text-ink-400">Parsing sections, scoring strength, checking grammar. Usually takes 10-20 seconds.</p>
        </>
      ) : (
        <>
          {hasExisting ? <FiFile className="text-ink-300" size={32} /> : <FiUploadCloud className="text-ink-300" size={32} />}
          <p className="mt-4 text-sm font-medium text-ink-900 dark:text-ink-100">
            {hasExisting ? 'Upload a new version' : 'Drop your resume here, or click to browse'}
          </p>
          <p className="mt-1 text-xs text-ink-400">PDF only, up to 5MB</p>
        </>
      )}
    </div>
  );
}
