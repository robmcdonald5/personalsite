<script lang="ts">
	import type { CarouselItem } from './carousel-state.svelte.js';

	interface Props {
		snippet: CarouselItem;
	}

	let { snippet }: Props = $props();

	// Map languages to their tech-stack SVG files
	const languageLogos: Record<string, string> = {
		'Rust': '/tech-stack__rust-icon.svg',
		'Python': '/tech-stack__python-icon.svg',
		'TypeScript': '/tech-stack__typescript-icon.svg',
		'React': '/tech-stack__react-icon.svg',
		'JSX': '/tech-stack__react-icon.svg',
		'Svelte': '/tech-stack__sveltekit-icon.svg',
		'WebAssembly': '/tech-stack__wasm-icon.svg',
		'PyTorch': '/tech-stack__pytorch-icon.svg',
		'Playwright': '/tech-stack__playwright-icon.svg',
		'MongoDB': '/tech-stack__mongodb-icon.svg'
	};

	const logoPath = $derived(languageLogos[snippet.language] || null);

	function getLanguageColor(language: string): string {
		const colors: Record<string, string> = {
			'Rust': 'text-orange-400',
			'TypeScript': 'text-blue-400',
			'Python': 'text-yellow-400',
			'React': 'text-cyan-400',
			'JSX': 'text-cyan-400',
			'Svelte': 'text-orange-500'
		};
		return colors[language] || 'text-gray-400';
	}

	function escapeHtml(text: string): string {
		return text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	}

	function highlightCode(code: string, language: string): string {
		const lines = code.split('\n');
		return lines.map(line => {
			// First, always escape HTML to prevent injection
			let highlighted = escapeHtml(line);

			if (language === 'Python') {
				// Create a tokenization approach to prevent overlapping replacements
				const tokens: Array<{start: number, end: number, replacement: string}> = [];

				// Find all strings first (highest priority)
				const stringRegex = /f?"[^"]*"|f?'[^']*'/g;
				let match: RegExpExecArray | null;
				while ((match = stringRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					tokens.push({
						start: matchIndex,
						end: matchIndex + matchLength,
						replacement: `<span class="text-[#ce9178]">${matchText}</span>`
					});
				}

				// Find comments
				const commentRegex = /#.*$/gm;
				while ((match = commentRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					const overlaps = tokens.some(t =>
						(matchIndex >= t.start && matchIndex < t.end) ||
						(matchIndex + matchLength > t.start && matchIndex + matchLength <= t.end)
					);
					if (!overlaps) {
						tokens.push({
							start: matchIndex,
							end: matchIndex + matchLength,
							replacement: `<span class="text-[#6a9955]">${matchText}</span>`
						});
					}
				}

				// Find keywords and built-ins
				const keywordRegex = /\b(def|class|if|elif|else|for|while|return|import|from|as|try|except|finally|with|pass|break|continue|async|await|lambda|in|range|print|self|None|True|False)\b/g;
				while ((match = keywordRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					const overlaps = tokens.some(t =>
						(matchIndex >= t.start && matchIndex < t.end) ||
						(matchIndex + matchLength > t.start && matchIndex + matchLength <= t.end)
					);
					if (!overlaps) {
						tokens.push({
							start: matchIndex,
							end: matchIndex + matchLength,
							replacement: `<span class="text-[#569cd6]">${matchText}</span>`
						});
					}
				}

				// Find types
				const typeRegex = /\b(str|int|float|bool|list|dict|tuple|set|List|Dict|Tuple|Set|Exception|MongoClient)\b/g;
				while ((match = typeRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					const overlaps = tokens.some(t =>
						(matchIndex >= t.start && matchIndex < t.end) ||
						(matchIndex + matchLength > t.start && matchIndex + matchLength <= t.end)
					);
					if (!overlaps) {
						tokens.push({
							start: matchIndex,
							end: matchIndex + matchLength,
							replacement: `<span class="text-[#4ec9b0]">${matchText}</span>`
						});
					}
				}

				// Find function calls
				const functionRegex = /\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\()/g;
				while ((match = functionRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					const overlaps = tokens.some(t =>
						(matchIndex >= t.start && matchIndex < t.end) ||
						(matchIndex + matchLength > t.start && matchIndex + matchLength <= t.end)
					);
					if (!overlaps) {
						tokens.push({
							start: matchIndex,
							end: matchIndex + matchLength,
							replacement: `<span class="text-[#dcdcaa]">${matchText}</span>`
						});
					}
				}

				// Sort tokens by start position (reverse order for replacement)
				tokens.sort((a, b) => b.start - a.start);

				// Apply replacements from end to start to maintain indices
				for (const token of tokens) {
					highlighted = highlighted.slice(0, token.start) + token.replacement + highlighted.slice(token.end);
				}

			} else if (language === 'Rust') {
				// Use tokenization approach for Rust too
				const tokens: Array<{start: number, end: number, replacement: string}> = [];

				// Find all strings first (highest priority)
				const stringRegex = /"[^"]*"/g;
				let match: RegExpExecArray | null;
				while ((match = stringRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					tokens.push({
						start: matchIndex,
						end: matchIndex + matchLength,
						replacement: `<span class="text-[#ce9178]">${matchText}</span>`
					});
				}

				// Find comments
				const commentRegex = /\/\/.*$/gm;
				while ((match = commentRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					const overlaps = tokens.some(t =>
						(matchIndex >= t.start && matchIndex < t.end) ||
						(matchIndex + matchLength > t.start && matchIndex + matchLength <= t.end)
					);
					if (!overlaps) {
						tokens.push({
							start: matchIndex,
							end: matchIndex + matchLength,
							replacement: `<span class="text-[#6a9955]">${matchText}</span>`
						});
					}
				}

				// Find attributes and macros
				const macroRegex = /@\w+|#\[.*?\]/g;
				while ((match = macroRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					const overlaps = tokens.some(t =>
						(matchIndex >= t.start && matchIndex < t.end) ||
						(matchIndex + matchLength > t.start && matchIndex + matchLength <= t.end)
					);
					if (!overlaps) {
						tokens.push({
							start: matchIndex,
							end: matchIndex + matchLength,
							replacement: `<span class="text-[#9cdcfe]">${matchText}</span>`
						});
					}
				}

				// Find keywords
				const keywordRegex = /\b(fn|let|mut|pub|impl|struct|enum|if|else|for|while|return|use|mod|const|type|match|async|await|var)\b/g;
				while ((match = keywordRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					const overlaps = tokens.some(t =>
						(matchIndex >= t.start && matchIndex < t.end) ||
						(matchIndex + matchLength > t.start && matchIndex + matchLength <= t.end)
					);
					if (!overlaps) {
						tokens.push({
							start: matchIndex,
							end: matchIndex + matchLength,
							replacement: `<span class="text-[#569cd6]">${matchText}</span>`
						});
					}
				}

				// Find types
				const typeRegex = /\b(u32|u64|i32|i64|f32|f64|bool|str|String|Vec|Result|Option|Ok|Err|usize|GrayImage|RgbaImage|ValidationError|Transform|Pixmap)\b/g;
				while ((match = typeRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					const overlaps = tokens.some(t =>
						(matchIndex >= t.start && matchIndex < t.end) ||
						(matchIndex + matchLength > t.start && matchIndex + matchLength <= t.end)
					);
					if (!overlaps) {
						tokens.push({
							start: matchIndex,
							end: matchIndex + matchLength,
							replacement: `<span class="text-[#4ec9b0]">${matchText}</span>`
						});
					}
				}

				// Find numbers
				const numberRegex = /\b\d+\.?\d*\b/g;
				while ((match = numberRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					const overlaps = tokens.some(t =>
						(matchIndex >= t.start && matchIndex < t.end) ||
						(matchIndex + matchLength > t.start && matchIndex + matchLength <= t.end)
					);
					if (!overlaps) {
						tokens.push({
							start: matchIndex,
							end: matchIndex + matchLength,
							replacement: `<span class="text-[#b5cea8]">${matchText}</span>`
						});
					}
				}

				// Find function calls
				const functionRegex = /\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\()/g;
				while ((match = functionRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					const overlaps = tokens.some(t =>
						(matchIndex >= t.start && matchIndex < t.end) ||
						(matchIndex + matchLength > t.start && matchIndex + matchLength <= t.end)
					);
					if (!overlaps) {
						tokens.push({
							start: matchIndex,
							end: matchIndex + matchLength,
							replacement: `<span class="text-[#dcdcaa]">${matchText}</span>`
						});
					}
				}

				// Sort tokens by start position (reverse order for replacement)
				tokens.sort((a, b) => b.start - a.start);

				// Apply replacements from end to start to maintain indices
				for (const token of tokens) {
					highlighted = highlighted.slice(0, token.start) + token.replacement + highlighted.slice(token.end);
				}
			} else if (language === 'TypeScript') {
				const tokens: Array<{start: number, end: number, replacement: string}> = [];

				// Find all strings and template literals first (highest priority)
				const stringRegex = /'[^']*'|`[^`]*`|"[^"]*"/g;
				let match: RegExpExecArray | null;
				while ((match = stringRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					tokens.push({
						start: matchIndex,
						end: matchIndex + matchLength,
						replacement: `<span class="text-[#ce9178]">${matchText}</span>`
					});
				}

				// Find comments
				const commentRegex = /\/\/.*$/gm;
				while ((match = commentRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					const overlaps = tokens.some(t =>
						(matchIndex >= t.start && matchIndex < t.end) ||
						(matchIndex + matchLength > t.start && matchIndex + matchLength <= t.end)
					);
					if (!overlaps) {
						tokens.push({
							start: matchIndex,
							end: matchIndex + matchLength,
							replacement: `<span class="text-[#6a9955]">${matchText}</span>`
						});
					}
				}

				// Find keywords
				const keywordRegex = /\b(export|function|const|let|var|if|else|for|while|return|import|from|extends|implements|interface|type|class|async|await|new)\b/g;
				while ((match = keywordRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					const overlaps = tokens.some(t =>
						(matchIndex >= t.start && matchIndex < t.end) ||
						(matchIndex + matchLength > t.start && matchIndex + matchLength <= t.end)
					);
					if (!overlaps) {
						tokens.push({
							start: matchIndex,
							end: matchIndex + matchLength,
							replacement: `<span class="text-[#569cd6]">${matchText}</span>`
						});
					}
				}

				// Find types
				const typeRegex = /\b(string|number|boolean|any|void|never|unknown|null|undefined|NodeJS|Timeout|Parameters|ReturnType|Map)\b/g;
				while ((match = typeRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					const overlaps = tokens.some(t =>
						(matchIndex >= t.start && matchIndex < t.end) ||
						(matchIndex + matchLength > t.start && matchIndex + matchLength <= t.end)
					);
					if (!overlaps) {
						tokens.push({
							start: matchIndex,
							end: matchIndex + matchLength,
							replacement: `<span class="text-[#4ec9b0]">${matchText}</span>`
						});
					}
				}

				// Find function calls
				const functionRegex = /\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\()/g;
				while ((match = functionRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					const overlaps = tokens.some(t =>
						(matchIndex >= t.start && matchIndex < t.end) ||
						(matchIndex + matchLength > t.start && matchIndex + matchLength <= t.end)
					);
					if (!overlaps) {
						tokens.push({
							start: matchIndex,
							end: matchIndex + matchLength,
							replacement: `<span class="text-[#dcdcaa]">${matchText}</span>`
						});
					}
				}

				// Sort tokens by start position (reverse order for replacement)
				tokens.sort((a, b) => b.start - a.start);

				// Apply replacements from end to start
				for (const token of tokens) {
					highlighted = highlighted.slice(0, token.start) + token.replacement + highlighted.slice(token.end);
				}
			} else if (language === 'JSX' || language === 'React') {
				const tokens: Array<{start: number, end: number, replacement: string}> = [];

				// Find all strings first
				const stringRegex = /'[^']*'|`[^`]*`|"[^"]*"/g;
				let match: RegExpExecArray | null;
				while ((match = stringRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					tokens.push({
						start: matchIndex,
						end: matchIndex + matchLength,
						replacement: `<span class="text-[#ce9178]">${matchText}</span>`
					});
				}

				// Find comments
				const commentRegex = /\/\/.*$/gm;
				while ((match = commentRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					const overlaps = tokens.some(t =>
						(matchIndex >= t.start && matchIndex < t.end) ||
						(matchIndex + matchLength > t.start && matchIndex + matchLength <= t.end)
					);
					if (!overlaps) {
						tokens.push({
							start: matchIndex,
							end: matchIndex + matchLength,
							replacement: `<span class="text-[#6a9955]">${matchText}</span>`
						});
					}
				}

				// Find keywords
				const keywordRegex = /\b(const|let|var|if|else|for|while|return|function|async|await|new)\b/g;
				while ((match = keywordRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					const overlaps = tokens.some(t =>
						(matchIndex >= t.start && matchIndex < t.end) ||
						(matchIndex + matchLength > t.start && matchIndex + matchLength <= t.end)
					);
					if (!overlaps) {
						tokens.push({
							start: matchIndex,
							end: matchIndex + matchLength,
							replacement: `<span class="text-[#569cd6]">${matchText}</span>`
						});
					}
				}

				// Find objects
				const objectRegex = /\b(window|document|console|event)\b/g;
				while ((match = objectRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					const overlaps = tokens.some(t =>
						(matchIndex >= t.start && matchIndex < t.end) ||
						(matchIndex + matchLength > t.start && matchIndex + matchLength <= t.end)
					);
					if (!overlaps) {
						tokens.push({
							start: matchIndex,
							end: matchIndex + matchLength,
							replacement: `<span class="text-[#9cdcfe]">${matchText}</span>`
						});
					}
				}

				// Find function calls
				const functionRegex = /\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\()/g;
				while ((match = functionRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					const overlaps = tokens.some(t =>
						(matchIndex >= t.start && matchIndex < t.end) ||
						(matchIndex + matchLength > t.start && matchIndex + matchLength <= t.end)
					);
					if (!overlaps) {
						tokens.push({
							start: matchIndex,
							end: matchIndex + matchLength,
							replacement: `<span class="text-[#dcdcaa]">${matchText}</span>`
						});
					}
				}

				// Sort and apply
				tokens.sort((a, b) => b.start - a.start);
				for (const token of tokens) {
					highlighted = highlighted.slice(0, token.start) + token.replacement + highlighted.slice(token.end);
				}
			} else if (language === 'Svelte') {
				const tokens: Array<{start: number, end: number, replacement: string}> = [];

				// Find all strings first
				const stringRegex = /'[^']*'|`[^`]*`|"[^"]*"/g;
				let match: RegExpExecArray | null;
				while ((match = stringRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					tokens.push({
						start: matchIndex,
						end: matchIndex + matchLength,
						replacement: `<span class="text-[#ce9178]">${matchText}</span>`
					});
				}

				// Find comments
				const commentRegex = /\/\/.*$/gm;
				while ((match = commentRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					const overlaps = tokens.some(t =>
						(matchIndex >= t.start && matchIndex < t.end) ||
						(matchIndex + matchLength > t.start && matchIndex + matchLength <= t.end)
					);
					if (!overlaps) {
						tokens.push({
							start: matchIndex,
							end: matchIndex + matchLength,
							replacement: `<span class="text-[#6a9955]">${matchText}</span>`
						});
					}
				}

				// Find Svelte-specific runes
				const svelteRegex = /\$(state|derived|effect|props)/g;
				while ((match = svelteRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					const overlaps = tokens.some(t =>
						(matchIndex >= t.start && matchIndex < t.end) ||
						(matchIndex + matchLength > t.start && matchIndex + matchLength <= t.end)
					);
					if (!overlaps) {
						tokens.push({
							start: matchIndex,
							end: matchIndex + matchLength,
							replacement: `<span class="text-[#c586c0]">${matchText}</span>`
						});
					}
				}

				// Find keywords
				const keywordRegex = /\b(let|const|var|import|from|export|async|await|try|catch|if|else|interface|type)\b/g;
				while ((match = keywordRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					const overlaps = tokens.some(t =>
						(matchIndex >= t.start && matchIndex < t.end) ||
						(matchIndex + matchLength > t.start && matchIndex + matchLength <= t.end)
					);
					if (!overlaps) {
						tokens.push({
							start: matchIndex,
							end: matchIndex + matchLength,
							replacement: `<span class="text-[#569cd6]">${matchText}</span>`
						});
					}
				}

				// Find types
				const typeRegex = /\b(string|boolean|null|Element|Props|Snippet)\b/g;
				while ((match = typeRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					const overlaps = tokens.some(t =>
						(matchIndex >= t.start && matchIndex < t.end) ||
						(matchIndex + matchLength > t.start && matchIndex + matchLength <= t.end)
					);
					if (!overlaps) {
						tokens.push({
							start: matchIndex,
							end: matchIndex + matchLength,
							replacement: `<span class="text-[#4ec9b0]">${matchText}</span>`
						});
					}
				}

				// Find specific functions
				const svelteFunctionRegex = /\b(onMount|tick|querySelector|document)\b/g;
				while ((match = svelteFunctionRegex.exec(highlighted)) !== null) {
					const matchIndex = match.index;
					const matchLength = match[0].length;
					const matchText = match[0];
					const overlaps = tokens.some(t =>
						(matchIndex >= t.start && matchIndex < t.end) ||
						(matchIndex + matchLength > t.start && matchIndex + matchLength <= t.end)
					);
					if (!overlaps) {
						tokens.push({
							start: matchIndex,
							end: matchIndex + matchLength,
							replacement: `<span class="text-[#dcdcaa]">${matchText}</span>`
						});
					}
				}

				// Sort and apply
				tokens.sort((a, b) => b.start - a.start);
				for (const token of tokens) {
					highlighted = highlighted.slice(0, token.start) + token.replacement + highlighted.slice(token.end);
				}
			} else {
				// For any other language, just return the escaped HTML
				highlighted = highlighted;
			}

			// Handle indentation with reduced spacing to prevent overflow
			const leadingSpaces = line.match(/^(\s*)/)?.[1] || '';
			const spacesCount = leadingSpaces.length;
			const paddingStyle = spacesCount > 0 ? ` style="padding-left: ${Math.min(spacesCount * 0.3, 4)}em"` : '';

			return `<div${paddingStyle}>${highlighted.trim() || '&nbsp;'}</div>`;
		}).join('');
	}
</script>

<div class="code-frame w-[320px] h-[220px] lg:w-[280px] lg:h-[240px] bg-[#1e1e1e] border border-[#2d2d30] rounded-lg flex flex-col transition-all duration-300 hover:bg-[#252526] hover:border-[#3e3e42] hover:shadow-[0_4px_20px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)] cursor-pointer">
	<div class="code-header h-6 bg-[#2d2d30] flex items-center justify-between px-2 rounded-t-lg">
		<div class="traffic-lights flex gap-1.5 group">
			<div class="w-3 h-3 rounded-full bg-[#ff5f56] transition-all duration-300 group-hover:shadow-[0_0_8px_#ff5f56]"></div>
			<div class="w-3 h-3 rounded-full bg-[#ffbd2e] transition-all duration-300 group-hover:shadow-[0_0_8px_#ffbd2e]"></div>
			<div class="w-3 h-3 rounded-full bg-[#27c93f] transition-all duration-300 group-hover:shadow-[0_0_8px_#27c93f]"></div>
		</div>
		<div class="language-label flex items-center gap-1">
			{#if logoPath}
				<img src={logoPath} alt="{snippet.language} logo" class="w-3 h-3" />
			{/if}
			<span class="text-[10px] {getLanguageColor(snippet.language)} font-mono">
				{snippet.language}
			</span>
		</div>
	</div>

	<div class="code-content flex-1 px-2 py-2 overflow-y-auto overflow-x-hidden custom-scrollbar">
		<div class="text-[10px] lg:text-[11px] font-mono text-[#d4d4d4] leading-[1.3]">
			{@html highlightCode(snippet.code, snippet.language)}
		</div>
	</div>

	<div class="code-footer h-10 flex flex-col items-center justify-center border-t border-[#2d2d30] py-1">
		<a
			href={snippet.projectLink || '#'}
			class="text-[10px] text-gray-400 hover:text-gray-300 transition-colors hover:underline"
		>
			{snippet.projectTitle}
		</a>
		{#if snippet.description}
			<span class="text-[8px] lg:text-[9px] text-gray-500 line-clamp-1 px-2 text-center">
				{snippet.description}
			</span>
		{/if}
	</div>
</div>

<style>
	.code-frame {
		flex-shrink: 0;
	}

	.code-content :global(span) {
		white-space: pre-wrap;
		word-wrap: break-word;
		overflow-wrap: break-word;
	}

	.code-content :global(div) {
		white-space: pre-wrap;
		word-wrap: break-word;
		overflow-wrap: break-word;
		line-height: 1.3;
		max-width: 100%;
	}

	/* Custom scrollbar styling */
	.custom-scrollbar {
		scrollbar-width: thin;
		scrollbar-color: #4d4d50 #2d2d30;
	}

	.custom-scrollbar::-webkit-scrollbar {
		width: 8px;
	}

	.custom-scrollbar::-webkit-scrollbar-track {
		background: #2d2d30;
		border-radius: 4px;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: #4d4d50;
		border-radius: 4px;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb:hover {
		background: #5d5d60;
	}
</style>