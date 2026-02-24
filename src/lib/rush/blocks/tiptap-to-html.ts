import type { TipTapDocument, TipTapNode, TipTapMark } from './types'

export function tiptapToHtml(doc: TipTapDocument): string {
	if (!doc || !doc.content) {
		return ''
	}

	return doc.content.map(node => nodeToHtml(node)).join('')
}

function nodeToHtml(node: TipTapNode): string {
	switch (node.type) {
		case 'paragraph': {
			const attrs = (node.attrs as { textAlign?: string }) || {}
			const style = attrs.textAlign ? ` style="text-align: ${attrs.textAlign}"` : ''
			return `<p${style}>${renderContent(node)}</p>`
		}

		case 'heading': {
			const attrs = (node.attrs as { level?: number, textAlign?: string }) || {}
			const level = attrs.level || 1
			const style = attrs.textAlign ? ` style="text-align: ${attrs.textAlign}"` : ''
			return `<h${level}${style}>${renderContent(node)}</h${level}>`
		}

		case 'hardBreak':
			return '<br />'

		case 'text':
			return renderText(node)

		case 'bulletList':
			return `<ul>${renderContent(node)}</ul>`

		case 'orderedList':
			return `<ol>${renderContent(node)}</ol>`

		case 'listItem':
			return `<li>${renderContent(node)}</li>`

		case 'blockquote':
			return `<blockquote>${renderContent(node)}</blockquote>`

		case 'codeBlock': {
			const attrs = (node.attrs as { language?: string }) || {}
			const language = attrs.language || 'plaintext'
			const code = node.content?.[0] && node.content[0].type === 'text' && node.content[0].text ? node.content[0].text : ''
			return `<pre><code class="language-${language}">${escapeHtml(code)}</code></pre>`
		}

		case 'horizontalRule':
			return '<hr />'

		default:
			return renderContent(node)
	}
}

function renderContent(node: TipTapNode): string {
	if (!node.content) {
		return ''
	}

	return node.content.map(child => nodeToHtml(child)).join('')
}

function renderText(node: TipTapNode): string {
	if (!node.text) {
		return ''
	}

	let html = escapeHtml(node.text)

	if (node.marks && node.marks.length > 0) {
		html = applyMarks(html, node.marks)
	}

	return html
}

function applyMarks(text: string, marks: TipTapMark[]): string {
	let result = text

	for (const mark of marks) {
		switch (mark.type) {
			case 'bold':
				result = `<strong>${result}</strong>`
				break

			case 'italic':
				result = `<em>${result}</em>`
				break

			case 'code':
				result = `<code>${result}</code>`
				break

			case 'strike':
				result = `<s>${result}</s>`
				break

			case 'underline':
				result = `<u>${result}</u>`
				break

			case 'link': {
				const attrs = (mark.attrs as { href?: string; target?: string }) || {}
				const href = attrs.href || '#'
				const target = attrs.target || '_self'
				result = `<a href="${escapeHtml(href)}" target="${target}">${result}</a>`
				break
			}

			case 'highlight': {
				const attrs = (mark.attrs as { color?: string }) || {}
				const color = attrs.color || 'yellow'
				result = `<mark style="background-color: ${color}">${result}</mark>`
				break
			}
		}
	}

	return result
}

function escapeHtml(text: string): string {
	const map: Record<string, string> = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	}

	return text.replace(/[&<>"']/g, char => map[char] || char)
}
