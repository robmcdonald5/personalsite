import type { CarouselItem } from './carousel-state.svelte.js';

export const codeSnippets: CarouselItem[] = [
	{
		id: 'webgpu-canny',
		title: 'WebGPU Edge Detection',
		language: 'Rust',
		projectTitle: 'GPU Compute Shaders',
		projectLink: '#',
		description: 'Non-maximum suppression in a GPU edge detection pipeline',
		code: `@compute @workgroup_size(16, 16, 1)
fn non_maximum_suppression(
    @builtin(global_invocation_id) global_id: vec3<u32>
) {
    let x = global_id.x;
    let y = global_id.y;
    let idx = y * params.width + x;
    let magnitude = gradient_magnitude[idx];

    // Quantize direction to find neighbors
    var neighbor1_mag: f32;
    var neighbor2_mag: f32;

    if direction < PI / 8.0 {
        neighbor1_mag = gradient_magnitude[idx - 1];
        neighbor2_mag = gradient_magnitude[idx + 1];
    }`
	},
	{
		id: 'ssim-calculation',
		title: 'SSIM Image Analysis',
		language: 'Rust',
		projectTitle: 'Computer Vision',
		projectLink: '#',
		description: 'Structural similarity index for image quality comparison',
		code: `pub fn calculate_ssim(
    img1: &GrayImage,
    img2: &GrayImage
) -> Result<SsimResult> {
    let mut ssim_sum = 0.0;
    let half_window = WINDOW_SIZE / 2;

    for y in half_window..(height - half_window) {
        for x in half_window..(width - half_window) {
            let w1 = extract_window(img1, x, y)?;
            let w2 = extract_window(img2, x, y)?;

            let luminance = (2.0 * s1.mean * s2.mean + C1)
                / (s1.mean.powi(2) + s2.mean.powi(2) + C1);
        }
    }`
	},
	{
		id: 'menu-fuzzer',
		title: 'Intelligent Text Correction',
		language: 'Python',
		projectTitle: 'NLP Fuzzy Matching',
		projectLink: '#',
		description: 'Levenshtein-distance text correction for menu input',
		code: `def correct_text(self, text: str) -> Tuple[str, List]:
    words = text.split()
    corrections = []

    for word in words:
        if any(word.lower() in word_set
               for word_set in self.vocabulary.values()):
            corrected_words.append(word)
            continue

        corrected_word, category, dist = \\
            self._find_closest_match(word)
        if dist != -1:
            corrections.append((word, corrected_word))

    return ' '.join(corrected_words), corrections`
	},
	{
		id: 'debounce-throttle',
		title: 'Performance Utilities',
		language: 'TypeScript',
		projectTitle: 'Frontend Optimization',
		projectLink: '#',
		description: 'Generic debounce with TypeScript generics',
		code: `export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    immediate?: boolean
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };

        const callNow = immediate && !timeout;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}`
	},
	{
		id: 'speech-recognition',
		title: 'Browser Speech API',
		language: 'React',
		projectTitle: 'Voice Interface',
		projectLink: '#',
		description: 'Web Speech API integration for voice interfaces',
		code: `const handleMicClick = () => {
    if (!isRecording) {
        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = 'en-US';
        recognition.continuous = false;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setIsRecording(false);
            processUserInput(transcript);
        };

        recognition.start();
    }
};`
	},
	{
		id: 'svg-rendering',
		title: 'SVG to Image Pipeline',
		language: 'Rust',
		projectTitle: 'Graphics Processing',
		projectLink: '#',
		description: 'SVG to raster conversion using resvg + tiny-skia',
		code: `fn render_svg_to_image(
    svg_content: &str,
    dimensions: (u32, u32)
) -> Result<RgbaImage> {
    let (width, height) = dimensions;

    // Parse SVG with options
    let options = usvg::Options::default();
    let tree = usvg::Tree::from_str(svg_content, &options)?;

    // Create pixmap for rendering
    let mut pixmap = tiny_skia::Pixmap::new(width, height)?;

    // Render and convert BGRA to RGBA
    resvg::render(&tree, Transform::identity(), &mut pixmap);
    Ok(convert_pixmap_to_image(pixmap))
}`
	},
	{
		id: 'resilient-mongodb',
		title: 'Enterprise DB Connection',
		language: 'Python',
		projectTitle: 'Database Resilience',
		projectLink: '#',
		description: 'Retry-with-backoff MongoDB connection through SOCKS5',
		code: `def connect(self):
    for attempt in range(3):
        try:
            print(f"MongoDB attempt {attempt + 1}")
            proxy_url = os.getenv('QUOTAGUARD_URL')

            if proxy_url:
                parsed = urlparse(proxy_url)
                socks.setdefaultproxy(
                    socks.PROXY_TYPE_SOCKS5,
                    parsed.hostname,
                    parsed.port
                )

            self.client = MongoClient(self.uri, tls=True)
            self.client.admin.command('ping')
            break
        except Exception as e:
            time.sleep(5)`
	},
	{
		id: 'memoization',
		title: 'Function Caching',
		language: 'TypeScript',
		projectTitle: 'Performance Utils',
		projectLink: '#',
		description: 'Generic memoization with custom key generation',
		code: `export function memoize<T extends (...args: any[]) => any>(
    func: T,
    keyGenerator?: (...args: Parameters<T>) => string
): T & { cache: Map<string, ReturnType<T>> } {
    const cache = new Map<string, ReturnType<T>>();

    const memoizedFunc = (...args: Parameters<T>): ReturnType<T> => {
        const key = keyGenerator
            ? keyGenerator(...args)
            : JSON.stringify(args);

        if (cache.has(key)) {
            return cache.get(key)!;
        }

        const result = func(...args);
        cache.set(key, result);
        return result;
    };

    return Object.assign(memoizedFunc, { cache });
}`
	},
	{
		id: 'gpu-status',
		title: 'GPU Capabilities Check',
		language: 'Svelte',
		projectTitle: 'Hardware Detection',
		projectLink: '#',
		description: 'WebGPU capability detection with Svelte 5 runes',
		code: `import { onMount } from 'svelte';
import { gpuService } from '$lib/gpu-service';

let capabilities = $state(null);
let loading = $state(true);
let error = $state(null);

onMount(async () => {
    try {
        await gpuService.initialize();
        capabilities = await gpuService.getCapabilities();
        loading = false;
    } catch (e) {
        error = e.message;
        loading = false;
    }
});`
	},
	{
		id: 'portal-component',
		title: 'DOM Portal Pattern',
		language: 'Svelte',
		projectTitle: 'UI Components',
		projectLink: '#',
		description: 'DOM portal for rendering outside the component tree',
		code: `import { onMount, tick } from 'svelte';

interface Props {
    target?: Element | string;
    children?: import('svelte').Snippet;
}

let { target = 'body', children }: Props = $props();
let portal: Element;
let mounted = $state(false);

onMount(async () => {
    await tick();
    portal = typeof target === 'string'
        ? document.querySelector(target) ?? document.body
        : target;
    mounted = true;
});`
	},
	{
		id: 'window-extraction',
		title: 'Image Window Stats',
		language: 'Rust',
		projectTitle: 'Image Processing',
		projectLink: '#',
		description: 'Sliding window pixel extraction for convolution',
		code: `fn extract_window(
    img: &GrayImage,
    cx: usize, cy: usize,
    size: usize
) -> Result<Vec<f64>> {
    let half = size / 2;
    let mut window = Vec::with_capacity(size * size);

    for dy in 0..size {
        for dx in 0..size {
            let x = (cx + dx).saturating_sub(half);
            let y = (cy + dy).saturating_sub(half);

            if x < img.width() as usize {
                let pixel = img.get_pixel(x as u32, y as u32);
                window.push(pixel[0] as f64);
            }
        }
    }
    Ok(window)
}`
	},
	{
		id: 'validation-helpers',
		title: 'Input Validation',
		language: 'Rust',
		projectTitle: 'Error Handling',
		projectLink: '#',
		description: 'Dimension validation with structured Rust error types',
		code: `pub fn validate_dimensions(
    width: u32,
    height: u32,
    max_size: u32
) -> Result<(), ValidationError> {
    if width == 0 || height == 0 {
        return Err(ValidationError::InvalidDimensions(
            "Dimensions must be non-zero".into()
        ));
    }

    if width > max_size || height > max_size {
        return Err(ValidationError::TooLarge {
            width, height, max_size
        });
    }

    Ok(())
}`
	},
	{
		id: 'embedding-precomp',
		title: 'ML Embedding Pipeline',
		language: 'Python',
		projectTitle: 'Intent Recognition',
		projectLink: '#',
		description: 'SpaCy + Sentence-BERT embedding pipeline for intent training',
		code: `# Load SpaCy model and Sentence-BERT model
nlp = spacy.load(config.SPACY_MODEL)
sentence_model = SentenceTransformer(config.SENTENCE_MODEL)

# Prepare patterns and tags from the intents file
all_patterns = []
pattern_tags = []
for intent in intents['intents']:
    tag = intent['tag']
    for pattern in intent['patterns']:
        cleaned_pattern = clean_sentence(pattern)
        all_patterns.append(cleaned_pattern)
        pattern_tags.append(tag)

# Encode all patterns once using Sentence-BERT
pattern_embeddings = sentence_model.encode(all_patterns)`
	},
	{
		id: 'multi-metric-similarity',
		title: 'Multi-Metric Similarity',
		language: 'Python',
		projectTitle: 'NLP Analysis',
		projectLink: '#',
		description: 'Cosine + Jaccard similarity with dynamic weights',
		code: `# Compute cosine similarity between input and patterns
cosine_similarities = np.dot(pattern_embeddings, input_embedding) / (
    np.linalg.norm(pattern_embeddings, axis=1) *
    np.linalg.norm(input_embedding)
)

# Compute Jaccard similarity on token sets
input_tokens = set(cleaned_input.split())
jaccard_similarities = np.array([
    len(input_tokens.intersection(set(pattern.split()))) /
    len(input_tokens.union(set(pattern.split())))
    if len(input_tokens.union(set(pattern.split()))) > 0 else 0
    for pattern in all_patterns
])

# Dynamically choose metric weights based on input length
input_length = len(cleaned_input.split())
weights = (config.SHORT_INPUT_WEIGHTS if input_length <= 3
           else config.LONG_INPUT_WEIGHTS)`
	},
	{
		id: 'fuzzy-menu-matching',
		title: 'Fuzzy Text Correction',
		language: 'Python',
		projectTitle: 'Menu Processing',
		projectLink: '#',
		description: 'Edit-distance fuzzy matching against categorized vocabulary',
		code: `def _find_closest_match(self, word, max_distance=2):
    if len(word) < 3:
        return word, '', -1

    min_distance = max_distance + 1
    best_match = word
    best_category = ''

    # Check each vocabulary entry for minimal distance
    for category, valid_words in self.vocabulary.items():
        for valid_word in valid_words:
            if not self._should_attempt_correction(word, valid_word):
                continue

            current_distance = distance(word.lower(), valid_word.lower())
            if current_distance < min_distance and current_distance <= max_distance:
                min_distance = current_distance
                best_match = valid_word
                best_category = category

    if min_distance <= max_distance:
        return best_match, best_category, min_distance
    return word, '', -1`
	},
	{
		id: 'spacy-phrase-matching',
		title: 'spaCy Order Extraction',
		language: 'Python',
		projectTitle: 'Menu NLP',
		projectLink: '#',
		description: 'spaCy PhraseMatcher for structured order extraction',
		code: `def process_order_spacy(session_id, input_sentence):
    segments = segment_input(input_sentence)
    item_addons = defaultdict(
        lambda: {"meats": [], "rice": [], "beans": [], "toppings": []}
    )

    for seg in segments:
        doc = nlp(seg)
        main_items_in_seg = extract_menu_items(seg)

        if main_items_in_seg:
            main_item = main_items_in_seg[0]
            # Convert colloquial name to official name
            official_name = name_to_colloquial.get(main_item)
            if official_name:
                main_item = official_name

            # Match add-ons using PhraseMatcher
            matches = addon_matcher(doc)
            for match_id, start, end in matches:
                span = doc[start:end]
                category = nlp.vocab.strings[match_id]
                addon = span.text.lower()`
	},
	{
		id: 'menu-data-transform',
		title: 'Data Pipeline',
		language: 'Python',
		projectTitle: 'MongoDB ETL',
		projectLink: '#',
		description: 'MongoDB ETL normalizing menu items with name mapping',
		code: `def fetch_menu_data():
    menu_item_collection = db.get_db()['MenuItem']
    all_items = list(menu_item_collection.find({}))
    menu = {}
    name_to_colloquial = {}

    for item in all_items:
        name = item['name'].lower()
        price = (item['size_details'][0].get('price', 0)
                if 'size_details' in item and item['size_details'] else 0)
        category = item.get('category', 'other')
        colloquial = (item.get('colloquialism', '').lower()
                     if item.get('colloquialism') else None)

        # Normalize category to lowercase or default
        if isinstance(category, list):
            category = [c.lower() for c in category]
        elif isinstance(category, str):
            category = category.lower()`
	}
];