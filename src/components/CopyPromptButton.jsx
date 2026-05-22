import { useState } from 'react'
import clsx from 'clsx'

function CopyIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

/**
 * Copy-the-whole-prompt button.
 *
 * Fetches /htmlflux-prompt.md (served from /public) and writes it to clipboard.
 * Show a brief "Copied!" state on success.
 *
 * Default source: `/htmlflux-prompt.md` — override via the `src` prop.
 */
export function CopyPromptButton({ src = '/htmlflux-prompt.md', className }) {
  const [state, setState] = useState('idle') // 'idle' | 'copying' | 'copied' | 'error'

  async function handleCopy() {
    if (state === 'copying') return
    setState('copying')
    try {
      const res = await fetch(src)
      if (!res.ok) throw new Error('Fetch failed: ' + res.status)
      const text = await res.text()
      await navigator.clipboard.writeText(text)
      setState('copied')
      setTimeout(() => setState('idle'), 2000)
    } catch (err) {
      console.error('CopyPromptButton failed:', err)
      setState('error')
      setTimeout(() => setState('idle'), 2500)
    }
  }

  const label = {
    idle: 'Copy prompt',
    copying: 'Copying…',
    copied: 'Copied!',
    error: 'Failed — try again',
  }[state]

  return (
    <div className={clsx('not-prose my-6 flex flex-wrap items-center gap-3', className)}>
      <button
        type="button"
        onClick={handleCopy}
        disabled={state === 'copying'}
        className={clsx(
          'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition',
          'ring-1 ring-inset',
          state === 'copied'
            ? 'bg-emerald-500/10 text-emerald-700 ring-emerald-500/30 dark:text-emerald-400 dark:ring-emerald-400/30'
            : state === 'error'
            ? 'bg-rose-500/10 text-rose-700 ring-rose-500/30 dark:text-rose-400 dark:ring-rose-400/30'
            : 'bg-zinc-900 text-white ring-zinc-900/20 hover:bg-zinc-700 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30 dark:hover:bg-blue-400/15 dark:hover:text-blue-300'
        )}
      >
        {state === 'copied' ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
        <span>{label}</span>
      </button>

      <span className="text-xs text-zinc-500 dark:text-zinc-400">
        Paste this into a fresh Claude session as the system prompt.
      </span>
    </div>
  )
}
