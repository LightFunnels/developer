import { mdxAnnotations } from 'mdx-annotations'
import remarkGfm from 'remark-gfm'

// remark-gfm@3 — pinned to the MDX 2 / micromark 3 ecosystem (v4 targets MDX 3).
// Enables GFM tables, strikethrough, autolinks, task lists.
export const remarkPlugins = [mdxAnnotations.remark, remarkGfm]
