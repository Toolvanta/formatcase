import type { Metadata } from 'next';
import { FORMAT_DEFINITIONS, FormatDefinition } from './formatters';

export interface HowToStep {
  step: number;
  title: string;
  text: string;
}

export interface CodeSnippet {
  lang: string;
  title: string;
  code: string;
}

export interface ConversionExample {
  input: string;
  output: string;
  context: string;
}

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolDefinition {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: 'developer' | 'natural' | 'utility';
  categoryLabel: string;
  categorySlug: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  seoTitle: string;
  seoDescription: string;
  summary: string;
  description: string;
  rules: string[];
  howToUse: HowToStep[];
  features: string[];
  limitations: string[];
  benefits: string[];
  stacks: string[];
  codeSnippet: CodeSnippet;
  conversionTable: ConversionExample[];
  faqs: ToolFaq[];
  relatedSlugs: string[];
  example: string;
}

export interface CategoryInfo {
  id: 'developer' | 'natural' | 'utility';
  slug: string;
  name: string;
  title: string;
  description: string;
  longDescription: string;
  toolCount: number;
}

export const CATEGORIES: Record<'developer' | 'natural' | 'utility', CategoryInfo> = {
  developer: {
    id: 'developer',
    slug: 'developer',
    name: 'Code & Variables',
    title: 'Code & Variable Case Converters — camelCase, snake_case & More',
    description: 'Transform variable names, database column identifiers, and environment constants across 20+ programming naming conventions.',
    longDescription: 'In software development, identifiers must conform strictly to language syntax rules where spaces are prohibited. Explore our complete suite of developer casing utilities including camelCase, PascalCase, snake_case, SCREAMING_SNAKE_CASE, and specialized conventions for modern web, database, and backend architectures.',
    toolCount: 21,
  },
  natural: {
    id: 'natural',
    slug: 'natural',
    name: 'Text & Titles',
    title: 'Text & Editorial Case Converters — Title Case, Sentence case & Styles',
    description: 'Format headlines, article titles, book covers, and body paragraphs according to standard grammatical and editorial conventions.',
    longDescription: 'Editorial and content workflows demand accurate casing conventions for headlines, subheadings, and UI labels. Use our zero-latency natural text formatters to format articles in standard Title Case, Sentence case, UPPERCASE, and playful meme styles with zero data leaving your browser.',
    toolCount: 7,
  },
  utility: {
    id: 'utility',
    slug: 'utility',
    name: 'Web & URLs',
    title: 'Web & URL String Utilities — Slugify, Path & Delimiter Cleaners',
    description: 'Generate clean, URL-safe slugs, directory paths, and delimited strings with accent stripping and diacritic normalization.',
    longDescription: 'Clean URLs and file paths enhance SEO, accessibility, and user trust. FormatCase web utilities strip accents, remove unsafe URL characters, and generate canonical slug identifiers in real time with 100% client-side privacy.',
    toolCount: 1,
  },
};

const BASE_URL = 'https://formatcase.netlify.app';

// Scalable registry containing full technical SEO metadata and specifications for all 29 tools
export const TOOLS: ToolDefinition[] = [
  // 1. camelCase
  {
    id: 'camel',
    slug: 'camel-case',
    name: 'camelCase',
    shortName: 'camelCase Converter',
    category: 'developer',
    categoryLabel: 'Code & Variables',
    categorySlug: 'developer',
    primaryKeyword: 'camelcase converter',
    secondaryKeywords: ['camel case online', 'convert to camelcase', 'camelCase generator', 'camelCase variable formatter'],
    seoTitle: 'camelCase Converter — Convert Text to camelCase Online',
    seoDescription: 'Free, instant online camelCase converter. Transform strings, variable names, and multi-line text into clean camelCase with 100% in-browser privacy.',
    summary: 'Converts multi-word strings so that the first word is lowercase and every subsequent word is capitalized without spaces or separators.',
    description: 'camelCase (also known as lowerCamelCase) is the universal standard for naming variables, object properties, and functions across JavaScript, TypeScript, Java, Swift, and Kotlin. FormatCase tokenizes raw strings, preserves acronym boundaries (such as parsing HTTP to Http/HTTP correctly), and yields clean identifier names instantly.',
    rules: [
      'The first word is completely in lowercase (e.g., "user").',
      'Each subsequent word begins with an uppercase letter followed by lowercase characters (e.g., "Profile").',
      'All spaces, hyphens, underscores, and punctuation marks are completely removed.',
      'Numbers are preserved without breaking word capitalization boundaries.',
    ],
    howToUse: [
      { step: 1, title: 'Enter Text', text: 'Type or paste raw sentences, database columns, or words into the input workbench.' },
      { step: 2, title: 'Toggle Batch Mode', text: 'Keep Batch Mode active to convert each line independently, perfect for CSV lists or lists of fields.' },
      { step: 3, title: 'Instant Copy', text: 'Click the Copy button to copy your converted camelCase string directly to your clipboard.' },
    ],
    features: [
      'Smart Unicode tokenization preserving acronyms (e.g., parseHTTPResponse -> parseHttpResponse)',
      'Batch processing mode for multi-line code refactoring',
      '100% in-browser processing with zero server communication',
      'Direct in-place transformation or side-by-side preview',
    ],
    limitations: [
      'Cannot guess intended word breaks in unseparated lowercase text (e.g., "helloworld" needs spaces or delimiter hints).',
      'Programming keywords (e.g., "default", "class") are not automatically renamed.',
    ],
    benefits: [
      'Adheres to official ECMAScript (JavaScript/TypeScript) and Java naming guidelines.',
      'Prevents syntax errors caused by illegal spaces in code identifiers.',
      'Saves time during API JSON payload normalization and frontend model binding.',
    ],
    stacks: ['JavaScript (ES6+)', 'TypeScript', 'Java', 'Swift', 'Kotlin', 'JSON APIs'],
    codeSnippet: {
      lang: 'typescript',
      title: 'JavaScript / TypeScript Implementation',
      code: `function toCamelCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_\\s]+/g, ' ')
    .trim()
    .split(' ')
    .map((word, i) => i === 0 
      ? word.toLowerCase() 
      : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

// Example:
toCamelCase("user_first_name"); // "userFirstName"`,
    },
    conversionTable: [
      { input: 'user account settings', output: 'userAccountSettings', context: 'UI state identifier' },
      { input: 'first_name', output: 'firstName', context: 'Database column to JSON property' },
      { input: 'parse-xml-response', output: 'parseXmlResponse', context: 'Function name' },
      { input: 'API_KEY_SECRET', output: 'apiKeySecret', context: 'Env var to object property' },
    ],
    faqs: [
      {
        question: 'What is camelCase and where is it used?',
        answer: 'camelCase is a compound word convention where the first word is lowercase and each subsequent word starts with a capital letter. It is standard for variable and function names in JavaScript, TypeScript, Java, and Swift.',
      },
      {
        question: 'What is the difference between camelCase and PascalCase?',
        answer: 'camelCase begins with a lowercase letter (e.g., userProfile), whereas PascalCase begins with an uppercase letter (e.g., UserProfile). In frameworks like React, camelCase is used for variables and hooks, while PascalCase is reserved for components and classes.',
      },
      {
        question: 'How does FormatCase handle acronyms in camelCase?',
        answer: 'Our rule-based Unicode tokenizer recognizes acronym transitions (such as parseHTTPResponse) and avoids breaking every single uppercase character into an individual word, ensuring clean and readable camelCase.',
      },
    ],
    relatedSlugs: ['pascal-case', 'snake-case', 'kebab-case', 'screaming-snake-case'],
    example: 'userAccountSettings',
  },

  // 2. PascalCase
  {
    id: 'pascal',
    slug: 'pascal-case',
    name: 'PascalCase',
    shortName: 'PascalCase Converter',
    category: 'developer',
    categoryLabel: 'Code & Variables',
    categorySlug: 'developer',
    primaryKeyword: 'pascalcase converter',
    secondaryKeywords: ['pascal case online', 'convert to pascalcase', 'studlycaps generator', 'react component naming'],
    seoTitle: 'PascalCase Converter — Convert Text to PascalCase Online',
    seoDescription: 'Free online PascalCase converter. Convert strings and identifiers to PascalCase (UpperCamelCase) instantly in your browser with zero latency.',
    summary: 'Capitalizes the first letter of every single word and concatenates them with no spaces or punctuation.',
    description: 'PascalCase (often termed UpperCamelCase or StudlyCaps) is the primary naming standard for classes, interfaces, React/Vue components, and type declarations across C#, TypeScript, Python, and Java. FormatCase turns raw phrases, file paths, or snake_case variables into clean PascalCase identifiers instantly.',
    rules: [
      'Every word begins with an uppercase character (e.g., "User", "Account").',
      'Subsequent letters in each word are lowercased.',
      'All spaces, hyphens, and underscores are stripped.',
      'Common in component architectures (e.g., <UserProfileCard />).',
    ],
    howToUse: [
      { step: 1, title: 'Enter Text', text: 'Paste your component names, database entities, or class identifiers.' },
      { step: 2, title: 'Process Multi-line Lists', text: 'Use Batch Mode to convert multiple class names simultaneously.' },
      { step: 3, title: 'Copy Result', text: 'Click Copy to instantly transfer the clean PascalCase text to your clipboard.' },
    ],
    features: [
      'Preserves acronym integrity for modern component architectures',
      'Instant batch conversion for class and interface definitions',
      'No data upload—operates 100% in client-side browser memory',
      'Includes one-click in-place workbench transformation',
    ],
    limitations: [
      'Consecutive symbols or malformed strings should have basic space or delimiter separation.',
    ],
    benefits: [
      'Ensures compliance with C# .NET conventions and TypeScript type naming guidelines.',
      'Standardizes React and Vue component filenames and imports.',
      'Reduces manual refactoring errors when generating models from SQL schemas.',
    ],
    stacks: ['React', 'Vue', 'C# / .NET', 'TypeScript Types', 'Java Classes', 'Python Classes'],
    codeSnippet: {
      lang: 'typescript',
      title: 'TypeScript Implementation',
      code: `function toPascalCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_\\s]+/g, ' ')
    .trim()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('');
}

// Example:
toPascalCase("user_profile_modal"); // "UserProfileModal"`,
    },
    conversionTable: [
      { input: 'user profile modal', output: 'UserProfileModal', context: 'React component' },
      { input: 'customer_orders', output: 'CustomerOrders', context: 'C# class entity' },
      { input: 'payment-gateway-service', output: 'PaymentGatewayService', context: 'Service class' },
      { input: 'auth_token_payload', output: 'AuthTokenPayload', context: 'TypeScript interface' },
    ],
    faqs: [
      {
        question: 'What is PascalCase used for in software development?',
        answer: 'PascalCase is standard for naming classes in object-oriented languages (C#, Java, Python), components in frontend frameworks (React, Angular, Vue), and types/interfaces in TypeScript.',
      },
      {
        question: 'Why is it called PascalCase?',
        answer: 'It was popularized by the Pascal programming language, where capitalizing each word was the standard identifier convention, distinguishing it from C which predominantly used snake_case.',
      },
      {
        question: 'How do React components benefit from PascalCase?',
        answer: 'JSX uses PascalCase to distinguish custom React components (e.g. <Button />) from native HTML elements (e.g. <button />).',
      },
    ],
    relatedSlugs: ['camel-case', 'snake-case', 'kebab-case', 'train-case'],
    example: 'UserProfileModal',
  },

  // 3. snake_case
  {
    id: 'snake',
    slug: 'snake-case',
    name: 'snake_case',
    shortName: 'snake_case Converter',
    category: 'developer',
    categoryLabel: 'Code & Variables',
    categorySlug: 'developer',
    primaryKeyword: 'snake case converter',
    secondaryKeywords: ['snake case online', 'convert to snake_case', 'snake_case generator', 'python variable naming'],
    seoTitle: 'snake_case Converter — Convert Text to snake_case Online',
    seoDescription: 'Free online snake_case converter. Convert camelCase, PascalCase, and sentences into clean lowercase snake_case for Python, SQL, and database columns.',
    summary: 'Converts all tokens to lowercase and joins them together using single underscores.',
    description: 'snake_case is the mandatory convention in Python (PEP 8), PostgreSQL, MySQL, SQLite, Ruby, and Rust. FormatCase accurately splits camelCase tokens and eliminates special characters, delivering standardized, error-free database columns and variable names.',
    rules: [
      'All characters are lowercased (e.g., "user", "id").',
      'Words are separated exclusively by an underscore character (_).',
      'Leading, trailing, and duplicate underscores are removed.',
      'Numbers are cleanly joined without breaking delimiter consistency.',
    ],
    howToUse: [
      { step: 1, title: 'Input Text', text: 'Enter camelCase variables, form fields, or column headers.' },
      { step: 2, title: 'Convert Multiple Lines', text: 'Keep Batch Mode enabled to format an entire SQL schema or CSV header list.' },
      { step: 3, title: 'Copy Clean SQL/Python IDs', text: 'Click Copy to export your normalized snake_case identifiers.' },
    ],
    features: [
      'Splits camelCase and PascalCase transitions automatically (e.g. userAccountId -> user_account_id)',
      'Handles acronym boundaries cleanly (e.g. parseJSON -> parse_json)',
      'Fast batch processing for hundreds of database columns simultaneously',
      'Zero latency client-side execution with complete privacy',
    ],
    limitations: [
      'Consecutive punctuation marks are stripped to single underscores.',
    ],
    benefits: [
      'Full compliance with Python PEP 8 style guide.',
      'Industry standard for relational database column and table naming.',
      'High readability in terminal commands and backend logging.',
    ],
    stacks: ['Python (PEP 8)', 'PostgreSQL', 'MySQL', 'Rust', 'Ruby', 'C / C++'],
    codeSnippet: {
      lang: 'python',
      title: 'Python (PEP 8) Implementation',
      code: `import re

def to_snake_case(text: str) -> str:
    s = re.sub(r'([A-Z]+)([A-Z][a-z])', r'\\1_\\2', text)
    s = re.sub(r'([a-z0-9])([A-Z])', r'\\1_\\2', s)
    s = re.sub(r'[-\\s]+', '_', s)
    return s.strip('_').lower()

# Example:
to_snake_case("UserProfileModal") # "user_profile_modal"`,
    },
    conversionTable: [
      { input: 'userProfileModal', output: 'user_profile_modal', context: 'camelCase to SQL column' },
      { input: 'CreatedDateUtc', output: 'created_date_utc', context: 'Entity property to DB field' },
      { input: 'api-access-token', output: 'api_access_token', context: 'kebab-case to Python variable' },
      { input: 'CustomerBillingAddress', output: 'customer_billing_address', context: 'Object to table name' },
    ],
    faqs: [
      {
        question: 'Why is snake_case preferred in SQL and Python?',
        answer: 'SQL is case-insensitive in many engines; snake_case uses explicit underscores that prevent casing ambiguity. Python official PEP 8 style guide designates snake_case as the standard for functions and variables.',
      },
      {
        question: 'How does snake_case compare to kebab-case?',
        answer: 'snake_case uses underscores (user_name), making it valid in programming identifiers. kebab-case uses hyphens (user-name), which compilers interpret as a minus subtraction operator, making it illegal in most programming languages.',
      },
      {
        question: 'Can snake_case handle abbreviations like ID or URL?',
        answer: 'Yes. FormatCase tokenizes "userID" into "user_id" rather than "user_i_d".',
      },
    ],
    relatedSlugs: ['screaming-snake-case', 'camel-case', 'kebab-case', 'pascal-snake-case'],
    example: 'user_account_settings',
  },

  // 4. SCREAMING_SNAKE_CASE
  {
    id: 'screaming_snake',
    slug: 'screaming-snake-case',
    name: 'SCREAMING_SNAKE_CASE',
    shortName: 'SCREAMING_SNAKE Converter',
    category: 'developer',
    categoryLabel: 'Code & Variables',
    categorySlug: 'developer',
    primaryKeyword: 'screaming snake case converter',
    secondaryKeywords: ['constant case converter', 'uppercase snake case', 'env variable naming', 'macro case converter'],
    seoTitle: 'SCREAMING_SNAKE_CASE Converter — Convert to Constant Case',
    seoDescription: 'Free online SCREAMING_SNAKE_CASE converter. Convert strings to uppercase underscore format for environment variables, config constants, and macros.',
    summary: 'Converts all letters to UPPERCASE and joins words with underscores, standard for constants and .env files.',
    description: 'SCREAMING_SNAKE_CASE (also known as CONSTANT_CASE or MACRO_CASE) is universally required for environment variables (.env files), system configuration keys, immutable global constants, and C/C++ preprocessor macros.',
    rules: [
      'Every letter is capitalized in UPPERCASE.',
      'Words are delimited by underscores (_).',
      'No spaces, hyphens, or periods are permitted.',
    ],
    howToUse: [
      { step: 1, title: 'Input Variable Names', text: 'Enter configuration keys, setting names, or constant identifiers.' },
      { step: 2, title: 'Format .env files', text: 'Paste dozens of environment variable names to convert all lines in batch.' },
      { step: 3, title: 'Copy Constants', text: 'Copy the uppercase underscore identifiers directly to your configuration file.' },
    ],
    features: [
      'Instant conversion of API settings into production .env variables',
      'Batch mode supports complete configuration files',
      '100% private client-side execution with zero logging',
    ],
    limitations: ['Special shell characters ($, %, &) are stripped.'],
    benefits: [
      'Conforms to POSIX environment variable naming standards.',
      'Clearly signifies immutable constants in JavaScript, Python, and Java.',
    ],
    stacks: ['.env files', 'Docker env', 'JavaScript Constants', 'Java static final', 'C / C++ Macros'],
    codeSnippet: {
      lang: 'typescript',
      title: 'TypeScript Implementation',
      code: `function toScreamingSnakeCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_\\s]+/g, ' ')
    .trim()
    .split(' ')
    .map(w => w.toUpperCase())
    .join('_');
}`,
    },
    conversionTable: [
      { input: 'api base url', output: 'API_BASE_URL', context: 'Environment variable' },
      { input: 'maxRetryCount', output: 'MAX_RETRY_COUNT', context: 'JavaScript constant' },
      { input: 'database-password', output: 'DATABASE_PASSWORD', context: 'Docker secret' },
      { input: 'jwt secret key', output: 'JWT_SECRET_KEY', context: 'Auth configuration' },
    ],
    faqs: [
      {
        question: 'Where is SCREAMING_SNAKE_CASE used?',
        answer: 'It is the universal standard for environment variables (.env), constant variables in code, and configuration flags across Linux, Docker, Node.js, and Java.',
      },
      {
        question: 'Is SCREAMING_SNAKE_CASE the same as CONSTANT_CASE?',
        answer: 'Yes, CONSTANT_CASE and SCREAMING_SNAKE_CASE are identical terms for uppercase words joined by underscores.',
      },
    ],
    relatedSlugs: ['snake-case', 'cobol-case', 'camel-case', 'kebab-case'],
    example: 'USER_ACCOUNT_SETTINGS',
  },

  // 5. kebab-case
  {
    id: 'kebab',
    slug: 'kebab-case',
    name: 'kebab-case',
    shortName: 'kebab-case Converter',
    category: 'developer',
    categoryLabel: 'Code & Variables',
    categorySlug: 'developer',
    primaryKeyword: 'kebab case converter',
    secondaryKeywords: ['kebab case online', 'convert to kebab-case', 'dash case converter', 'css class name generator'],
    seoTitle: 'kebab-case Converter — Convert Text to kebab-case Online',
    seoDescription: 'Free online kebab-case converter. Convert strings, titles, and variables into clean lowercase hyphenated format for URLs, CSS classes, and HTML attributes.',
    summary: 'Converts all characters to lowercase and separates words with single hyphens (dashes).',
    description: 'kebab-case (also known as dash-case or lisp-case) is the official naming convention for website URLs, CSS class names, HTML data attributes, and npm package names. FormatCase transforms raw text into hyphenated lowercase strings in real time.',
    rules: [
      'All letters are converted to lowercase.',
      'Words are separated strictly with single hyphens (-).',
      'Punctuation and non-alphanumeric symbols are removed.',
    ],
    howToUse: [
      { step: 1, title: 'Enter String', text: 'Type blog titles, CSS class concepts, or URLs.' },
      { step: 2, title: 'Enable Batch Mode', text: 'Convert hundreds of URL routes or CSS selectors on separate lines.' },
      { step: 3, title: 'Copy Result', text: 'Copy clean, web-ready hyphenated strings instantly.' },
    ],
    features: [
      'Automatic camelCase splitting before hyphenation',
      'Clean URL and CSS class generation',
      'Preserves numbers and alphanumeric boundaries',
    ],
    limitations: ['Not suitable for programming variable names because hyphens are interpreted as subtraction.'],
    benefits: [
      'Search engine friendly for URL slugs (Google recommends hyphens over underscores).',
      'Adheres to BEM and modern CSS naming methodologies.',
    ],
    stacks: ['CSS Classes', 'HTML data-* attributes', 'REST API URLs', 'npm packages', 'Lisp / Clojure'],
    codeSnippet: {
      lang: 'typescript',
      title: 'JavaScript Implementation',
      code: `function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_\\s]+/g, ' ')
    .trim()
    .split(' ')
    .map(w => w.toLowerCase())
    .join('-');
}`,
    },
    conversionTable: [
      { input: 'user profile card', output: 'user-profile-card', context: 'CSS class selector' },
      { input: 'UserProfileModal', output: 'user-profile-modal', context: 'HTML custom element' },
      { input: 'annual-report-2026', output: 'annual-report-2026', context: 'Website URL segment' },
    ],
    faqs: [
      {
        question: 'Why does Google prefer hyphens (kebab-case) over underscores for URLs?',
        answer: 'Google search crawler treats hyphens as word separators (reading "hello-world" as "hello world"), whereas underscores can be indexed as a single combined string ("hello_world").',
      },
      {
        question: 'Can I use kebab-case for JavaScript variables?',
        answer: 'No. In JavaScript and most C-family languages, a hyphen is the arithmetic subtraction operator, causing syntax errors.',
      },
    ],
    relatedSlugs: ['slugify', 'train-case', 'snake-case', 'camel-case'],
    example: 'user-account-settings',
  },

  // 6. Title Case
  {
    id: 'title',
    slug: 'title-case',
    name: 'Title Case',
    shortName: 'Title Case Converter',
    category: 'natural',
    categoryLabel: 'Text & Titles',
    categorySlug: 'natural',
    primaryKeyword: 'title case converter',
    secondaryKeywords: ['title case online', 'headline capitalization tool', 'convert to title case', 'capitalize titles'],
    seoTitle: 'Title Case Converter — Capitalize Headlines & Titles Online',
    seoDescription: 'Free online Title Case converter. Capitalize headlines, book titles, and article names accurately according to standard English editorial rules.',
    summary: 'Capitalizes major words while keeping minor grammatical articles, prepositions, and conjunctions in lowercase.',
    description: 'Title Case is the standard capitalization format for headlines, article titles, blog headers, and book names. FormatCase implements smart editorial capitalization, keeping minor words (a, an, the, and, but, or, for, nor, on, at, to, from, by, in, of) in lowercase unless they appear at the start or end of the title.',
    rules: [
      'The first and last words of the title are always capitalized.',
      'All major words (nouns, verbs, adjectives, adverbs) are capitalized.',
      'Minor conjunctions and prepositions under 4 letters remain lowercase.',
    ],
    howToUse: [
      { step: 1, title: 'Paste Title', text: 'Paste your draft article title, book chapter, or email subject line.' },
      { step: 2, title: 'Verify Minor Words', text: 'Our algorithm automatically adjusts prepositions and articles.' },
      { step: 3, title: 'Copy Formatted Title', text: 'Copy the publication-ready title in one click.' },
    ],
    features: [
      'Smart minor-word dictionary based on Chicago and AP style guidelines',
      'Batch mode supports lists of article headings or table of contents',
      'Client-side privacy ensures unpublished manuscripts stay secure',
    ],
    limitations: ['Specialized scientific or legal Latin capitalization styles may require custom manual review.'],
    benefits: [
      'Ensures consistent editorial quality across blog posts and publications.',
      'Improves click-through rates (CTR) on article headlines and SEO meta titles.',
    ],
    stacks: ['Blogs & Medium', 'Newspapers & AP Style', 'Chicago Manual of Style', 'YouTube Video Titles'],
    codeSnippet: {
      lang: 'typescript',
      title: 'JavaScript Title Case Function',
      code: `const MINOR_WORDS = new Set(['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from', 'by', 'in', 'of']);

function toTitleCase(str: string): string {
  const words = str.trim().split(/\\s+/);
  return words
    .map((word, i) => {
      const lower = word.toLowerCase();
      if (i > 0 && i < words.length - 1 && MINOR_WORDS.has(lower)) {
        return lower;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}`,
    },
    conversionTable: [
      { input: 'the quick brown fox jumps over the lazy dog', output: 'The Quick Brown Fox Jumps over the Lazy Dog', context: 'Standard headline' },
      { input: 'a guide to modern web development', output: 'A Guide to Modern Web Development', context: 'Blog title' },
      { input: 'how to build responsive apps with react', output: 'How to Build Responsive Apps with React', context: 'Technical article' },
    ],
    faqs: [
      {
        question: 'Which words are kept lowercase in Title Case?',
        answer: 'Short articles (a, an, the), coordinating conjunctions (and, but, or, nor, for), and short prepositions (in, on, at, to, by, of) remain lowercase unless they are the first or last word.',
      },
      {
        question: 'Is Title Case better for SEO titles?',
        answer: 'Yes. Research demonstrates that Title Case in search engine result pages (SERPs) achieves higher click-through rates compared to all-lowercase or all-caps titles.',
      },
    ],
    relatedSlugs: ['sentence-case', 'capitalized-case', 'uppercase', 'lowercase'],
    example: 'The Quick Brown Fox Jumps over the Lazy Dog',
  },

  // 7. Sentence case
  {
    id: 'sentence',
    slug: 'sentence-case',
    name: 'Sentence case',
    shortName: 'Sentence case Converter',
    category: 'natural',
    categoryLabel: 'Text & Titles',
    categorySlug: 'natural',
    primaryKeyword: 'sentence case converter',
    secondaryKeywords: ['sentence case online', 'convert to sentence case', 'capitalize first letter of sentence'],
    seoTitle: 'Sentence case Converter — Capitalize Sentences Online',
    seoDescription: 'Free online Sentence case converter. Capitalize only the first letter of each sentence and keep the rest in lowercase with 100% in-browser privacy.',
    summary: 'Capitalizes the first letter of each sentence boundary (. ! ?) and converts all subsequent characters to lowercase.',
    description: 'Sentence case is standard for clean UI microcopy, software button labels, documentation, and formal correspondence. FormatCase detects sentence boundaries (periods, question marks, exclamation marks) and formats paragraphs with proper grammatical capitalization.',
    rules: [
      'The first letter after each sentence boundary (. ! ?) is capitalized.',
      'All other letters are lowercased.',
      'Numbers and punctuation spacing are preserved.',
    ],
    howToUse: [
      { step: 1, title: 'Paste Paragraph', text: 'Paste text from uppercase transcripts, emails, or rough drafts.' },
      { step: 2, title: 'Auto-Detect Sentences', text: 'Sentence boundaries are parsed automatically.' },
      { step: 3, title: 'Copy Text', text: 'Copy clean sentence-cased prose instantly.' },
    ],
    features: ['Multi-sentence detection across periods, exclamation marks, and question marks', 'Fixes accidental ALL-CAPS text'],
    limitations: ['Proper nouns (e.g. London, Google) should be checked manually since they are lowercased by general rules.'],
    benefits: ['Modern digital design systems (Apple, Google Material) favor Sentence case for UI button and menu labels.'],
    stacks: ['Material Design UI', 'Apple HIG UI', 'Product Copy', 'Email Correspondence'],
    codeSnippet: {
      lang: 'typescript',
      title: 'JavaScript Sentence Case',
      code: `function toSentenceCase(str: string): string {
  return str.toLowerCase().replace(/(^|[.?!]\\s+)([a-z])/g, (_, p1, p2) => p1 + p2.toUpperCase());
}`,
    },
    conversionTable: [
      { input: 'WELCOME TO FORMATCASE. CONVERT YOUR TEXT NOW.', output: 'Welcome to formatcase. Convert your text now.', context: 'Caps cleanup' },
      { input: 'user settings saved successfully', output: 'User settings saved successfully', context: 'UI notification' },
    ],
    faqs: [
      {
        question: 'Why do modern UI designs use Sentence case instead of Title Case for buttons?',
        answer: 'Major design systems like Google Material and Apple Human Interface Guidelines recommend Sentence case because it is faster to read and feels less formal and cluttered.',
      },
    ],
    relatedSlugs: ['title-case', 'capitalized-case', 'lowercase', 'uppercase'],
    example: 'Welcome to formatcase. Convert your text now.',
  },

  // 8. slugify
  {
    id: 'slug',
    slug: 'slugify',
    name: 'slugify',
    shortName: 'Slugify URL Generator',
    category: 'utility',
    categoryLabel: 'Web & URLs',
    categorySlug: 'utility',
    primaryKeyword: 'slugify online',
    secondaryKeywords: ['url slug generator', 'string to slug converter', 'seo slug generator', 'clean url creator'],
    seoTitle: 'Slugify Online — Free URL Slug Generator & Cleaner',
    seoDescription: 'Free online slugify tool. Convert strings, titles, and filenames into clean, SEO-friendly, URL-safe slugs with accent stripping and zero latency.',
    summary: 'Strips diacritics/accents, removes unsafe URL characters, and joins words with hyphens for clean web links.',
    description: 'A URL slug is the human-readable, SEO-optimized portion of a web address that describes a page. FormatCase normalizes Unicode accents (e.g. transforming "crème brûlée" to "creme-brulee"), strips illegal punctuation, and outputs standard URL slugs compliant with RFC 3986.',
    rules: [
      'Normalizes diacritics via Unicode NFD (e.g. é -> e, ö -> o).',
      'Removes all non-alphanumeric characters except hyphens and spaces.',
      'Replaces consecutive spaces and underscores with a single hyphen.',
      'Trims leading and trailing hyphens.',
    ],
    howToUse: [
      { step: 1, title: 'Enter Article Title', text: 'Paste article titles, blog headlines, or product names.' },
      { step: 2, title: 'Auto-Normalize Accents', text: 'Accents, symbols, and currency signs are stripped automatically.' },
      { step: 3, title: 'Copy Slug', text: 'Copy the ready-to-use URL slug for your CMS, router, or static site generator.' },
    ],
    features: [
      'Unicode diacritic stripping (RFC 3986 URL safe)',
      'Removes query delimiters, brackets, and invalid characters',
      'Safe for WordPress, Next.js, Hugo, Jekyll, and database keys',
    ],
    limitations: ['Non-Latin scripts (e.g. Cyrillic, Kanji) without Latin equivalents should use specific transliteration.'],
    benefits: [
      'Directly boosts organic search ranking by generating concise, keyword-rich URLs.',
      'Prevents broken links caused by illegal URL characters or unescaped spaces.',
    ],
    stacks: ['Next.js routing', 'WordPress permalinks', 'Shopify URLs', 'REST API paths', 'Git branch names'],
    codeSnippet: {
      lang: 'typescript',
      title: 'JavaScript Slugify Implementation',
      code: `function toSlugify(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\\u0300-\\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\\s-]/g, '')
    .replace(/[\\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}`,
    },
    conversionTable: [
      { input: '10 Simple Tips for Web Developers in 2026!', output: '10-simple-tips-for-web-developers-in-2026', context: 'Blog permalink' },
      { input: 'Crème Brûlée & Café au Lait: Best Recipes', output: 'creme-brulee-cafe-au-lait-best-recipes', context: 'Recipe URL' },
      { input: 'What is Next.js? (A Complete Guide)', output: 'what-is-nextjs-a-complete-guide', context: 'Doc route' },
    ],
    faqs: [
      {
        question: 'What makes an SEO-friendly URL slug?',
        answer: 'An SEO-friendly slug is lowercase, short, descriptive, separates words with hyphens, and contains no accents, special symbols, or trailing spaces.',
      },
      {
        question: 'How does FormatCase handle foreign accents and umlauts in slugs?',
        answer: 'We use Unicode NFD normalization to separate base letters from diacritical marks, ensuring accents like é, ç, and ü cleanly become e, c, and u.',
      },
    ],
    relatedSlugs: ['kebab-case', 'path-case', 'lower-kebab-case', 'train-case'],
    example: 'clean-url-safe-slug',
  },

  // 9. Train-Case
  {
    id: 'train',
    slug: 'train-case',
    name: 'Train-Case',
    shortName: 'Train-Case Converter',
    category: 'developer',
    categoryLabel: 'Code & Variables',
    categorySlug: 'developer',
    primaryKeyword: 'train case converter',
    secondaryKeywords: ['header case converter', 'capitalized kebab case', 'http header naming tool'],
    seoTitle: 'Train-Case Converter — Format HTTP Headers & Titles',
    seoDescription: 'Free online Train-Case (Header-Case) converter. Format strings into capitalized hyphenated format (Word-Word-Word) for HTTP headers and documentation.',
    summary: 'Capitalizes each word and joins them with hyphens, standard for HTTP headers (e.g. Content-Type).',
    description: 'Train-Case (also known as Header-Case or Capitalized-Kebab-Case) is the official format for HTTP request and response headers (such as Authorization, Content-Type, and X-Requested-With). FormatCase capitalizes each word boundary and joins them cleanly with hyphens.',
    rules: ['Every token has its first letter capitalized.', 'Tokens are connected with hyphens (-).', 'Standard for RFC HTTP header specifications.'],
    howToUse: [
      { step: 1, title: 'Enter Text', text: 'Enter header names or capitalized identifiers.' },
      { step: 2, title: 'Batch Format Headers', text: 'Format multiple custom API headers on separate lines.' },
      { step: 3, title: 'Copy Result', text: 'Paste directly into your HTTP client or server configuration.' },
    ],
    features: ['RFC compliant HTTP header casing', 'Batch mode for API header dictionaries'],
    limitations: ['Not used for variable names due to subtraction syntax in code.'],
    benefits: ['Matches standards for curl, Postman, Express.js, and Fastify headers.'],
    stacks: ['HTTP 1.1 / HTTP 2 Headers', 'REST APIs', 'Postman', 'Network Protocols'],
    codeSnippet: {
      lang: 'typescript',
      title: 'JavaScript Train-Case',
      code: `function toTrainCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_\\s]+/g, ' ')
    .trim()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('-');
}`,
    },
    conversionTable: [
      { input: 'content type', output: 'Content-Type', context: 'Standard HTTP header' },
      { input: 'x api secret key', output: 'X-Api-Secret-Key', context: 'Custom API header' },
    ],
    faqs: [
      {
        question: 'What is Train-Case used for?',
        answer: 'Train-Case (or Header-Case) is primarily used for HTTP headers, such as Accept-Encoding, User-Agent, and Content-Security-Policy.',
      },
    ],
    relatedSlugs: ['kebab-case', 'pascal-case', 'cobol-case', 'slugify'],
    example: 'User-Account-Settings',
  },

  // 10. dot.case
  {
    id: 'dot',
    slug: 'dot-case',
    name: 'dot.case',
    shortName: 'dot.case Converter',
    category: 'developer',
    categoryLabel: 'Code & Variables',
    categorySlug: 'developer',
    primaryKeyword: 'dot case converter',
    secondaryKeywords: ['dot case online', 'dot notation generator', 'config property key converter'],
    seoTitle: 'dot.case Converter — Convert Strings to Dot Notation Online',
    seoDescription: 'Free online dot.case converter. Convert variable names and phrases into lowercase dot-delimited notation for YAML, JSON properties, and config keys.',
    summary: 'Converts all tokens to lowercase and separates them with periods (e.g. user.account.id).',
    description: 'dot.case is the industry standard for hierarchical configuration keys, translation property files (i18n), Java package references, and Spring Boot application.properties.',
    rules: ['All characters are lowercased.', 'Words are separated with periods (.).', 'Leading and trailing periods are trimmed.'],
    howToUse: [
      { step: 1, title: 'Enter Identifiers', text: 'Paste configuration names or translation phrases.' },
      { step: 2, title: 'Generate Dot Keys', text: 'Instantly get clean dot.separated.keys.' },
      { step: 3, title: 'Copy to Config', text: 'Paste into YAML, properties, or i18n JSON.' },
    ],
    features: ['Ideal for i18n localization keys', 'Supports multi-line translation key generation'],
    limitations: ['Avoid trailing dots that could break object path lookups.'],
    benefits: ['Standardizes keys across Spring Boot, i18next, and Kubernetes configs.'],
    stacks: ['i18n Translation Keys', 'Spring Boot properties', 'YAML Configurations', 'Java Packages'],
    codeSnippet: {
      lang: 'typescript',
      title: 'JavaScript dot.case',
      code: `function toDotCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_\\s.]+/g, ' ')
    .trim()
    .split(' ')
    .map(w => w.toLowerCase())
    .join('.');
}`,
    },
    conversionTable: [
      { input: 'user profile button save', output: 'user.profile.button.save', context: 'i18n translation key' },
      { input: 'server port ssl enabled', output: 'server.port.ssl.enabled', context: 'application.properties' },
    ],
    faqs: [
      {
        question: 'What is dot.case used for in software?',
        answer: 'It is commonly used for hierarchical configuration files, translation dictionaries (i18n), and nested object accessors.',
      },
    ],
    relatedSlugs: ['path-case', 'snake-case', 'kebab-case', 'camel-case'],
    example: 'user.account.settings',
  },

  // 11. path/case
  {
    id: 'path',
    slug: 'path-case',
    name: 'path/case',
    shortName: 'path/case Converter',
    category: 'developer',
    categoryLabel: 'Code & Variables',
    categorySlug: 'developer',
    primaryKeyword: 'path case converter',
    secondaryKeywords: ['slash case generator', 'url path converter', 'folder path case tool'],
    seoTitle: 'path/case Converter — Format Directory & File Paths',
    seoDescription: 'Free online path/case converter. Convert strings and titles into clean forward-slash separated paths for file systems and URL routes.',
    summary: 'Converts words into lowercase tokens separated by forward slashes (e.g. user/account/id).',
    description: 'path/case (also referred to as Slash Case) formats identifiers to match Unix directory paths, file system structures, and REST API nested routing paths.',
    rules: ['All characters are lowercased.', 'Words are joined with forward slashes (/).', 'Redundant slashes are collapsed.'],
    howToUse: [
      { step: 1, title: 'Enter Route Names', text: 'Type nested resource names or module hierarchies.' },
      { step: 2, title: 'Convert Paths', text: 'View instantly formatted directory paths.' },
      { step: 3, title: 'Copy Path', text: 'Use in routes or import paths.' },
    ],
    features: ['POSIX directory path generation', 'RESTful nested endpoint mapping'],
    limitations: ['Windows backslash (\\) is normalized to forward slash (/).'],
    benefits: ['Creates standardized folder structures and clean REST routes.'],
    stacks: ['Unix / Linux Paths', 'REST APIs', 'Next.js App Routes', 'Node.js Modules'],
    codeSnippet: {
      lang: 'typescript',
      title: 'JavaScript path/case',
      code: `function toPathCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_\\s/\\\\]+/g, ' ')
    .trim()
    .split(' ')
    .map(w => w.toLowerCase())
    .join('/');
}`,
    },
    conversionTable: [
      { input: 'api v1 user profile', output: 'api/v1/user/profile', context: 'REST endpoint' },
      { input: 'components auth login modal', output: 'components/auth/login/modal', context: 'File folder path' },
    ],
    faqs: [
      {
        question: 'What is path/case?',
        answer: 'path/case formats phrases into forward-slash delimited strings, matching file system paths and web URLs.',
      },
    ],
    relatedSlugs: ['dot-case', 'kebab-case', 'slugify', 'slash-case'],
    example: 'user/account/settings',
  },

  // 12. Slash Case
  {
    id: 'slash',
    slug: 'slash-case',
    name: 'Slash Case',
    shortName: 'Slash Case Converter',
    category: 'developer',
    categoryLabel: 'Code & Variables',
    categorySlug: 'developer',
    primaryKeyword: 'slash case converter',
    secondaryKeywords: ['forward slash case', 'slash separated string converter'],
    seoTitle: 'Slash Case Converter — Convert Words to Slash Notation',
    seoDescription: 'Free online Slash Case converter. Quickly convert strings and phrases into forward-slash separated path notation.',
    summary: 'Equivalent to path/case, separating words with forward slashes.',
    description: 'Slash Case provides a quick, convenient utility for developers needing forward-slash delimited tokens for routing, breadcrumb parsing, and file organization.',
    rules: ['Lowercases all tokens.', 'Joins tokens with forward slash (/).'],
    howToUse: [
      { step: 1, title: 'Input Words', text: 'Enter words or sentences.' },
      { step: 2, title: 'Copy Slashes', text: 'Copy the slash-delimited string.' },
    ],
    features: ['Instant conversion', 'Zero latency in-browser execution'],
    limitations: ['Leading slashes are omitted by default.'],
    benefits: ['Simplifies URL and route construction.'],
    stacks: ['Web Routing', 'Directory Maps'],
    codeSnippet: {
      lang: 'typescript',
      title: 'JavaScript Slash Case',
      code: `function toSlashCase(str: string): string {
  return str.trim().split(/\\s+/).map(w => w.toLowerCase()).join('/');
}`,
    },
    conversionTable: [{ input: 'user admin dashboard', output: 'user/admin/dashboard', context: 'Route' }],
    faqs: [{ question: 'Is Slash Case the same as path/case?', answer: 'Yes, both terms describe tokens separated by forward slashes.' }],
    relatedSlugs: ['path-case', 'dot-case', 'kebab-case'],
    example: 'user/account/settings',
  },

  // 13. Hash Case
  {
    id: 'hash',
    slug: 'hash-case',
    name: 'Hash Case',
    shortName: 'Hash Case Converter',
    category: 'developer',
    categoryLabel: 'Code & Variables',
    categorySlug: 'developer',
    primaryKeyword: 'hash case converter',
    secondaryKeywords: ['hashtag case converter', 'hash separated words tool'],
    seoTitle: 'Hash Case Converter — Convert Words to Hash Notation',
    seoDescription: 'Free online Hash Case converter. Format strings into lowercase words connected with hash (#) symbols for URI fragments and anchors.',
    summary: 'Separates words with the hash (#) character, useful for anchors, tags, and composite keys.',
    description: 'Hash Case joins lowercase words with hash (#) symbols, commonly used for database composite keys, URI fragments, and hashtag generator workflows.',
    rules: ['All characters are lowercased.', 'Words are joined with hash (#) symbols.'],
    howToUse: [{ step: 1, title: 'Input Text', text: 'Enter words or tags.' }, { step: 2, title: 'Copy Result', text: 'Copy hash-separated tokens.' }],
    features: ['Instant hashtag and anchor generation', 'Batch processing support'],
    limitations: ['Avoid using in raw URLs without proper percent-encoding if not intended as fragment identifier.'],
    benefits: ['Creates clean composite database keys and social media tags.'],
    stacks: ['NoSQL composite keys', 'URI fragments', 'Social metadata'],
    codeSnippet: {
      lang: 'typescript',
      title: 'JavaScript Hash Case',
      code: `function toHashCase(str: string): string {
  return str.trim().split(/\\s+/).map(w => w.toLowerCase()).join('#');
}`,
    },
    conversionTable: [{ input: 'tech trends 2026', output: 'tech#trends#2026', context: 'Composite key' }],
    faqs: [{ question: 'What is Hash Case used for?', answer: 'It is useful for creating compound key identifiers in Redis or DynamoDB, as well as URI anchor fragments.' }],
    relatedSlugs: ['dot-case', 'path-case', 'snake-case'],
    example: 'user#account#settings',
  },

  // 14. Pascal_Snake_Case
  {
    id: 'pascal_snake',
    slug: 'pascal-snake-case',
    name: 'Pascal_Snake_Case',
    shortName: 'Pascal_Snake_Case Converter',
    category: 'developer',
    categoryLabel: 'Code & Variables',
    categorySlug: 'developer',
    primaryKeyword: 'pascal snake case converter',
    secondaryKeywords: ['capitalized snake case', 'python exception naming', 'c macro case'],
    seoTitle: 'Pascal_Snake_Case Converter — Capitalized Underscore Case',
    seoDescription: 'Free online Pascal_Snake_Case converter. Convert strings to capitalized words joined with underscores for Python exceptions and C macros.',
    summary: 'Capitalizes the first letter of every word and joins them with underscores (e.g. User_Account_Settings).',
    description: 'Pascal_Snake_Case connects capitalized words with underscores. It is commonly observed in Python custom exceptions, C/C++ macro headers, database view naming conventions, and specialized ORM models.',
    rules: ['Every word starts with an uppercase letter.', 'Words are separated with underscores (_).'],
    howToUse: [{ step: 1, title: 'Enter Text', text: 'Enter exception or model names.' }, { step: 2, title: 'Copy Identifier', text: 'Copy formatted Pascal_Snake_Case.' }],
    features: ['High-contrast visibility for critical identifiers', 'Clean Python exception naming'],
    limitations: ['Not standard for regular variables in Python or JS.'],
    benefits: ['Improves code readability in large legacy C/C++ codebases.'],
    stacks: ['Python Exceptions', 'C / C++ Codebases', 'Database Views'],
    codeSnippet: {
      lang: 'typescript',
      title: 'JavaScript Pascal_Snake_Case',
      code: `function toPascalSnakeCase(str: string): string {
  return str.trim().split(/\\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('_');
}`,
    },
    conversionTable: [{ input: 'database connection error', output: 'Database_Connection_Error', context: 'Python exception' }],
    faqs: [{ question: 'When is Pascal_Snake_Case used?', answer: 'It is typically used for exception classes and structured errors where capitalized words with underscores provide high visual distinction.' }],
    relatedSlugs: ['snake-case', 'pascal-case', 'screaming-snake-case', 'camel-snake-case'],
    example: 'User_Account_Settings',
  },

  // 15. camel_Snake_Case
  {
    id: 'camel_snake',
    slug: 'camel-snake-case',
    name: 'camel_Snake_Case',
    shortName: 'camel_Snake_Case Converter',
    category: 'developer',
    categoryLabel: 'Code & Variables',
    categorySlug: 'developer',
    primaryKeyword: 'camel snake case converter',
    secondaryKeywords: ['camel snake case tool', 'mixed case underscore converter'],
    seoTitle: 'camel_Snake_Case Converter — Mixed Case with Underscores',
    seoDescription: 'Free online camel_Snake_Case converter. First word lowercase, subsequent words capitalized and joined by underscores.',
    summary: 'The first word is lowercase, and every subsequent word is capitalized with underscore delimiters (e.g. user_Account_Settings).',
    description: 'camel_Snake_Case is a hybrid convention occasionally utilized in API data serialization, legacy PHP models, and scoped variable namespaces.',
    rules: ['First word is lowercase.', 'Subsequent words start with capital letter.', 'Words are joined with underscores (_).'],
    howToUse: [{ step: 1, title: 'Enter Words', text: 'Type your phrases.' }, { step: 2, title: 'Copy Result', text: 'Copy camel_Snake_Case text.' }],
    features: ['Specialized hybrid casing support'],
    limitations: ['Rarely recommended in greenfield projects; primarily used for legacy compatibility.'],
    benefits: ['Maintains compatibility with legacy API contracts.'],
    stacks: ['Legacy APIs', 'Custom Serialization'],
    codeSnippet: {
      lang: 'typescript',
      title: 'JavaScript camel_Snake_Case',
      code: `function toCamelSnakeCase(str: string): string {
  return str.trim().split(/\\s+/).map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('_');
}`,
    },
    conversionTable: [{ input: 'user account id', output: 'user_Account_Id', context: 'Legacy API model' }],
    faqs: [{ question: 'What is camel_Snake_Case?', answer: 'It combines camelCase capitalization with snake_case underscore delimiters.' }],
    relatedSlugs: ['camel-case', 'snake-case', 'pascal-snake-case'],
    example: 'user_Account_Settings',
  },

  // 16. COBOL-CASE
  {
    id: 'cobol',
    slug: 'cobol-case',
    name: 'COBOL-CASE',
    shortName: 'COBOL-CASE Converter',
    category: 'developer',
    categoryLabel: 'Code & Variables',
    categorySlug: 'developer',
    primaryKeyword: 'cobol case converter',
    secondaryKeywords: ['upper kebab case', 'screaming kebab case converter', 'cobol variable naming'],
    seoTitle: 'COBOL-CASE Converter — UPPER-KEBAB-CASE Generator',
    seoDescription: 'Free online COBOL-CASE converter. Convert strings to UPPER-KEBAB-CASE format for mainframe development and uppercase hyphenated identifiers.',
    summary: 'Converts all letters to UPPERCASE and joins words with hyphens (e.g. USER-ACCOUNT-SETTINGS).',
    description: 'COBOL-CASE (also known as UPPER-KEBAB-CASE or SCREAMING-KEBAB-CASE) is the native variable naming convention for COBOL mainframe systems and select CLI argument configurations.',
    rules: ['All characters are converted to UPPERCASE.', 'Words are joined with hyphens (-).'],
    howToUse: [{ step: 1, title: 'Enter Variables', text: 'Enter variables or parameters.' }, { step: 2, title: 'Copy COBOL Code', text: 'Copy uppercase hyphenated identifiers.' }],
    features: ['Mainframe and legacy enterprise support', 'Fast batch conversion'],
    limitations: ['Hyphens are interpreted as subtraction in C/JS.'],
    benefits: ['Exact compliance with COBOL variable declaration specifications.'],
    stacks: ['COBOL Mainframes', 'Enterprise Banking Systems', 'CLI flags'],
    codeSnippet: {
      lang: 'typescript',
      title: 'JavaScript COBOL-CASE',
      code: `function toCobolCase(str: string): string {
  return str.trim().split(/\\s+/).map(w => w.toUpperCase()).join('-');
}`,
    },
    conversionTable: [{ input: 'customer balance amount', output: 'CUSTOMER-BALANCE-AMOUNT', context: 'COBOL data division' }],
    faqs: [{ question: 'Why does COBOL use hyphens?', answer: 'COBOL was designed to read like formal English, and its compiler treats hyphens inside identifiers as standard word separators.' }],
    relatedSlugs: ['screaming-snake-case', 'kebab-case', 'train-case', 'upper-kebab-case'],
    example: 'USER-ACCOUNT-SETTINGS',
  },

  // 17. UPPER-KEBAB-CASE
  {
    id: 'upper_kebab',
    slug: 'upper-kebab-case',
    name: 'UPPER-KEBAB-CASE',
    shortName: 'UPPER-KEBAB-CASE Converter',
    category: 'developer',
    categoryLabel: 'Code & Variables',
    categorySlug: 'developer',
    primaryKeyword: 'upper kebab case converter',
    secondaryKeywords: ['screaming kebab case', 'uppercase hyphenated case'],
    seoTitle: 'UPPER-KEBAB-CASE Converter — Capitalized Dash Case',
    seoDescription: 'Free online UPPER-KEBAB-CASE converter. Transform strings to all-caps hyphen-separated format in real time.',
    summary: 'Same as COBOL-CASE: all tokens in UPPERCASE separated by hyphens.',
    description: 'UPPER-KEBAB-CASE formats text into capitalized letters joined by dashes, identical to COBOL-CASE.',
    rules: ['All letters capitalized.', 'Separated by hyphens (-).'],
    howToUse: [{ step: 1, title: 'Input text', text: 'Paste text to convert.' }, { step: 2, title: 'Copy output', text: 'Copy UPPER-KEBAB-CASE string.' }],
    features: ['Instant transformation', 'Zero latency in-browser conversion'],
    limitations: ['Non-alphanumerics are stripped.'],
    benefits: ['Standard for certain CLI flags and legacy data systems.'],
    stacks: ['CLI arguments', 'Legacy data'],
    codeSnippet: {
      lang: 'typescript',
      title: 'JavaScript UPPER-KEBAB-CASE',
      code: `function toUpperKebabCase(str: string): string {
  return str.trim().split(/\\s+/).map(w => w.toUpperCase()).join('-');
}`,
    },
    conversionTable: [{ input: 'deploy production server', output: 'DEPLOY-PRODUCTION-SERVER', context: 'CLI flag' }],
    faqs: [{ question: 'Is UPPER-KEBAB-CASE the same as COBOL-CASE?', answer: 'Yes, both refer to uppercase letters joined with hyphens.' }],
    relatedSlugs: ['cobol-case', 'kebab-case', 'screaming-snake-case'],
    example: 'USER-ACCOUNT-SETTINGS',
  },

  // 18. lower-kebab-case
  {
    id: 'lower_kebab',
    slug: 'lower-kebab-case',
    name: 'lower-kebab-case',
    shortName: 'lower-kebab-case Converter',
    category: 'developer',
    categoryLabel: 'Code & Variables',
    categorySlug: 'developer',
    primaryKeyword: 'lower kebab case converter',
    secondaryKeywords: ['lowercase kebab case', 'standard kebab case'],
    seoTitle: 'lower-kebab-case Converter — Lowercase Hyphenated Strings',
    seoDescription: 'Free online lower-kebab-case converter. Convert strings to clean lowercase hyphen-separated format for URLs and CSS.',
    summary: 'Standard lowercase kebab-case convention for URLs, CSS classes, and HTML attributes.',
    description: 'lower-kebab-case is identical to standard kebab-case, converting all tokens to lowercase and joining them with dashes.',
    rules: ['All lowercase letters.', 'Hyphen word separators.'],
    howToUse: [{ step: 1, title: 'Input string', text: 'Enter words or sentences.' }, { step: 2, title: 'Copy result', text: 'Copy lower-kebab-case string.' }],
    features: ['Standard URL slug format', 'CSS class safe'],
    limitations: ['Cannot be used as programming variable name.'],
    benefits: ['Optimized for web search and URL readability.'],
    stacks: ['CSS', 'HTML', 'URL slugs'],
    codeSnippet: {
      lang: 'typescript',
      title: 'JavaScript lower-kebab-case',
      code: `function toLowerKebabCase(str: string): string {
  return str.trim().split(/\\s+/).map(w => w.toLowerCase()).join('-');
}`,
    },
    conversionTable: [{ input: 'card header title', output: 'card-header-title', context: 'CSS' }],
    faqs: [{ question: 'Is lower-kebab-case different from kebab-case?', answer: 'No, lower-kebab-case is simply the explicit term for standard kebab-case.' }],
    relatedSlugs: ['kebab-case', 'slugify', 'train-case'],
    example: 'user-account-settings',
  },

  // 19. StudlyCaps
  {
    id: 'studly',
    slug: 'studly-caps',
    name: 'StudlyCaps',
    shortName: 'StudlyCaps Converter',
    category: 'developer',
    categoryLabel: 'Code & Variables',
    categorySlug: 'developer',
    primaryKeyword: 'studlycaps converter',
    secondaryKeywords: ['studly caps online', 'studlycaps generator', 'php studly caps'],
    seoTitle: 'StudlyCaps Converter — PascalCase / StudlyCaps Generator',
    seoDescription: 'Free online StudlyCaps converter. Convert strings into StudlyCaps (PascalCase) for PHP Laravel conventions and class naming.',
    summary: 'Capitalizes the first letter of each word with no spaces (synonymous with PascalCase in PHP/Laravel).',
    description: 'StudlyCaps is the canonical term used in the PHP / Laravel community (e.g. Str::studly) and C++ for PascalCase class and controller names.',
    rules: ['Every word capitalized.', 'No separators or spaces.'],
    howToUse: [{ step: 1, title: 'Enter Text', text: 'Enter model or controller name.' }, { step: 2, title: 'Copy StudlyCaps', text: 'Copy formatted class name.' }],
    features: ['Laravel Str::studly equivalent', 'Client-side zero latency'],
    limitations: ['Proper spacing or delimiters required for accurate tokenization.'],
    benefits: ['Direct parity with Laravel helper methods.'],
    stacks: ['PHP / Laravel', 'C++ Classes'],
    codeSnippet: {
      lang: 'typescript',
      title: 'StudlyCaps Implementation',
      code: `function toStudlyCaps(str: string): string {
  return str.trim().split(/\\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
}`,
    },
    conversionTable: [{ input: 'user order controller', output: 'UserOrderController', context: 'Laravel Controller' }],
    faqs: [{ question: 'What is StudlyCaps in Laravel?', answer: 'In Laravel, Str::studly transforms strings into PascalCase, commonly used for Controllers and Eloquent Models.' }],
    relatedSlugs: ['pascal-case', 'camel-case', 'snake-case'],
    example: 'UserAccountSettings',
  },

  // 20. BiCapitalization
  {
    id: 'bi_capitalization',
    slug: 'bi-capitalization',
    name: 'BiCapitalization',
    shortName: 'BiCapitalization Converter',
    category: 'developer',
    categoryLabel: 'Code & Variables',
    categorySlug: 'developer',
    primaryKeyword: 'bicapitalization converter',
    secondaryKeywords: ['internal capitalization tool', 'brand casing converter', 'intercaps generator'],
    seoTitle: 'BiCapitalization Converter — Brand & Tech Casing Tool',
    seoDescription: 'Free online BiCapitalization tool. Format product and tech brand names with internal uppercase letters (e.g. iPhone, eBay).',
    summary: 'Formats text with internal capitalization, popular in tech brand names (e.g. iPhone, eBay, PlayStation).',
    description: 'BiCapitalization (also termed InterCaps or Embedded Capitals) describes names that feature a capital letter in the middle of a word, standard in consumer electronics and tech branding.',
    rules: ['First word is lowercase.', 'Second token starts with uppercase.'],
    howToUse: [{ step: 1, title: 'Enter Brand', text: 'Type product or brand name.' }, { step: 2, title: 'Copy Brand', text: 'Copy BiCapitalized name.' }],
    features: ['Accurate product name styling', 'One-click copy'],
    limitations: ['Custom acronyms may require manual review.'],
    benefits: ['Maintains trademark accuracy in technical writing.'],
    stacks: ['Product Marketing', 'Brand Guidelines'],
    codeSnippet: {
      lang: 'typescript',
      title: 'JavaScript BiCapitalization',
      code: `function toBiCapitalization(str: string): string {
  const words = str.trim().split(/\\s+/);
  return words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
}`,
    },
    conversionTable: [{ input: 'smart watch pro', output: 'smartWatchPro', context: 'Product naming' }],
    faqs: [{ question: 'What is BiCapitalization?', answer: 'It is the practice of capitalizing an internal letter within a brand or product name, like iPhone or eBay.' }],
    relatedSlugs: ['camel-case', 'pascal-case'],
    example: 'userAccountSettings',
  },

  // 21. Hungarian notation
  {
    id: 'hungarian',
    slug: 'hungarian-notation',
    name: 'Hungarian notation',
    shortName: 'Hungarian Notation Converter',
    category: 'developer',
    categoryLabel: 'Code & Variables',
    categorySlug: 'developer',
    primaryKeyword: 'hungarian notation converter',
    secondaryKeywords: ['hungarian notation online', 'variable prefix case tool', 'win32 variable naming'],
    seoTitle: 'Hungarian Notation Converter — Variable Type Prefixer',
    seoDescription: 'Free online Hungarian notation converter. Automatically prefixes variable names with data type tags (strName, iCount, bIsValid).',
    summary: 'Prefixes variable names with their data type indicator followed by PascalCase (e.g. strUserName, iCount, bIsValid).',
    description: 'Hungarian notation prefixes variable names with an indicator of their logical type (e.g. str for string, i for integer, b for boolean, arr for array). Historically prominent in Win32 C/C++ development.',
    rules: ['Prefixes variables with type code (str, i, b, arr).', 'Follows prefix with PascalCase identifier.'],
    howToUse: [{ step: 1, title: 'Enter Variable', text: 'Type variable name.' }, { step: 2, title: 'Copy with Type Prefix', text: 'Copy Hungarian notation identifier.' }],
    features: ['Automatically detects common string, count, and status keywords to assign prefix'],
    limitations: ['Modern compilers feature static type checking, making Hungarian notation mostly legacy.'],
    benefits: ['Maintains legacy C++ Win32 and MFC codebase conventions.'],
    stacks: ['C / C++ Win32', 'MFC APIs', 'Legacy Visual Basic'],
    codeSnippet: {
      lang: 'typescript',
      title: 'Hungarian Notation Implementation',
      code: `function toHungarian(str: string): string {
  const pascal = str.trim().split(/\\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
  return 'str' + pascal;
}`,
    },
    conversionTable: [{ input: 'user name', output: 'strUserName', context: 'String variable' }],
    faqs: [{ question: 'Why was Hungarian notation created?', answer: 'It was invented by Charles Simonyi at Xerox PARC and Microsoft to make variable types obvious in dynamically typed or weak-typed C environments.' }],
    relatedSlugs: ['camel-case', 'pascal-case'],
    example: 'strUserAccountSettings',
  },

  // 22. mACRO_CASE
  {
    id: 'macro',
    slug: 'macro-case',
    name: 'mACRO_CASE',
    shortName: 'mACRO_CASE Converter',
    category: 'developer',
    categoryLabel: 'Code & Variables',
    categorySlug: 'developer',
    primaryKeyword: 'macro case converter',
    secondaryKeywords: ['macro casing tool', 'scoped constant converter'],
    seoTitle: 'mACRO_CASE Converter — Scoped Macro Identifier Tool',
    seoDescription: 'Free online mACRO_CASE converter. First word in lowercase, remaining words in UPPERCASE underscores.',
    summary: 'First word lowercase followed by uppercase underscored tokens (e.g. prefix_CONSTANT_NAME).',
    description: 'mACRO_CASE formats identifiers with a lowercase namespace or module prefix followed by uppercase constants, useful in scoped C header defines.',
    rules: ['First token is lowercase.', 'Subsequent tokens are uppercase with underscores.'],
    howToUse: [{ step: 1, title: 'Enter Identifier', text: 'Enter namespace and constant.' }, { step: 2, title: 'Copy Result', text: 'Copy mACRO_CASE text.' }],
    features: ['Scoped macro definitions', 'C/C++ preprocessor compliance'],
    limitations: ['Rare outside specific system programming libraries.'],
    benefits: ['Eliminates namespace collisions in C libraries.'],
    stacks: ['C / C++ Preprocessor', 'Header Guards'],
    codeSnippet: {
      lang: 'typescript',
      title: 'JavaScript mACRO_CASE',
      code: `function toMacroCase(str: string): string {
  return str.trim().split(/\\s+/).map((w, i) => i === 0 ? w.toLowerCase() : w.toUpperCase()).join('_');
}`,
    },
    conversionTable: [{ input: 'lib max buffer size', output: 'lib_MAX_BUFFER_SIZE', context: 'C Library Macro' }],
    faqs: [{ question: 'What is mACRO_CASE?', answer: 'It combines a lowercase namespace prefix with uppercase macro words joined by underscores.' }],
    relatedSlugs: ['screaming-snake-case', 'snake-case'],
    example: 'user_ACCOUNT_SETTINGS',
  },

  // 23. Flatcase
  {
    id: 'flat',
    slug: 'flatcase',
    name: 'Flatcase',
    shortName: 'Flatcase Converter',
    category: 'developer',
    categoryLabel: 'Code & Variables',
    categorySlug: 'developer',
    primaryKeyword: 'flatcase converter',
    secondaryKeywords: ['flat case online', 'all lowercase concatenated', 'package name case'],
    seoTitle: 'Flatcase Converter — Concatenate All Lowercase Letters',
    seoDescription: 'Free online Flatcase converter. Join all words into a single continuous lowercase string with no spaces or punctuation.',
    summary: 'All lowercase characters concatenated together without spaces or separators (e.g. useraccountsettings).',
    description: 'Flatcase joins words into one uninterrupted lowercase string. Standard for Java package names (e.g. com.example.myproject) and Go package identifiers.',
    rules: ['All characters are lowercase.', 'No spaces, hyphens, or underscores.'],
    howToUse: [{ step: 1, title: 'Enter Words', text: 'Type package words.' }, { step: 2, title: 'Copy Flatcase', text: 'Copy concatenated text.' }],
    features: ['Java and Go package name compliance', 'Email handle formatting'],
    limitations: ['Long flatcase strings can be hard for humans to read without spaces.'],
    benefits: ['Prevents illegal characters in Go/Java package paths.'],
    stacks: ['Java Packages', 'Go Packages', 'Domain Names'],
    codeSnippet: {
      lang: 'typescript',
      title: 'JavaScript Flatcase',
      code: `function toFlatcase(str: string): string {
  return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}`,
    },
    conversionTable: [{ input: 'user account service', output: 'useraccountservice', context: 'Java package' }],
    faqs: [{ question: 'Where is Flatcase used?', answer: 'Java and Go coding standards mandate flatcase for package names to avoid system path conflicts.' }],
    relatedSlugs: ['lowercase', 'slugify', 'reverse-pascal-case'],
    example: 'useraccountsettings',
  },

  // 24. Reverse Pascal Case
  {
    id: 'reverse_pascal',
    slug: 'reverse-pascal-case',
    name: 'Reverse Pascal Case',
    shortName: 'Reverse Pascal Case Converter',
    category: 'developer',
    categoryLabel: 'Code & Variables',
    categorySlug: 'developer',
    primaryKeyword: 'reverse pascal case converter',
    secondaryKeywords: ['inverted pascal case', 'reverse studly case'],
    seoTitle: 'Reverse Pascal Case Converter — Inverted Capitalization',
    seoDescription: 'Free online Reverse Pascal Case converter. First character lowercase followed by all uppercase characters with no spaces.',
    summary: 'The very first letter is lowercase and all remaining letters are uppercase with no separators (e.g. uSERACCOUNTSETTINGS).',
    description: 'Reverse Pascal Case inverts the standard PascalCase pattern: it starts with a lowercase character followed by all uppercase letters.',
    rules: ['First letter is lowercase.', 'All other letters are uppercase.', 'No spaces.'],
    howToUse: [{ step: 1, title: 'Enter Text', text: 'Type your string.' }, { step: 2, title: 'Copy Result', text: 'Copy reverse Pascal formatted text.' }],
    features: ['Specialized string manipulation', 'Useful in obfuscation and ciphering tests'],
    limitations: ['Non-standard for typical production code.'],
    benefits: ['Creates unique identifiers for test suites and security assertions.'],
    stacks: ['Test automation', 'Security obfuscation'],
    codeSnippet: {
      lang: 'typescript',
      title: 'Reverse Pascal Implementation',
      code: `function toReversePascalCase(str: string): string {
  const s = str.replace(/[^a-zA-Z0-9]/g, '');
  return s.charAt(0).toLowerCase() + s.slice(1).toUpperCase();
}`,
    },
    conversionTable: [{ input: 'hello world', output: 'hELLOWORLD', context: 'Test cipher' }],
    faqs: [{ question: 'What is Reverse Pascal Case?', answer: 'It is a string where only the first character is lowercase and the rest are uppercase without spaces.' }],
    relatedSlugs: ['pascal-case', 'flatcase', 'alternating-case'],
    example: 'uSERACCOUNTSETTINGS',
  },

  // 25. lowercase
  {
    id: 'lower',
    slug: 'lowercase',
    name: 'lowercase',
    shortName: 'lowercase Converter',
    category: 'natural',
    categoryLabel: 'Text & Titles',
    categorySlug: 'natural',
    primaryKeyword: 'lowercase converter',
    secondaryKeywords: ['convert to lowercase', 'lowercase text online', 'small letters converter', 'uncapitalize text'],
    seoTitle: 'lowercase Converter — Convert Text to Lowercase Online',
    seoDescription: 'Free online lowercase converter. Convert any text, uppercase paragraphs, or titles into clean all-small letters with zero latency.',
    summary: 'Converts every character in the string into lowercase letters.',
    description: 'The lowercase converter converts all letters in your text into small letters. Ideal for cleaning up accidental Caps Lock text, email addresses, and uniform database search inputs.',
    rules: ['Every uppercase character is converted to its lowercase equivalent.', 'Spacing and punctuation are unchanged.'],
    howToUse: [{ step: 1, title: 'Paste Text', text: 'Paste uppercase text.' }, { step: 2, title: 'Instant Lowercase', text: 'All letters are converted instantly.' }, { step: 3, title: 'Copy', text: 'Copy clean lowercase text.' }],
    features: ['Handles full paragraphs and multi-line files', 'Zero server roundtrip—100% private'],
    limitations: ['Preserves punctuation and numbers as-is.'],
    benefits: ['Instant fix for accidental Caps Lock typing.'],
    stacks: ['Text editing', 'Email normalization', 'Search indexing'],
    codeSnippet: {
      lang: 'typescript',
      title: 'JavaScript Lowercase',
      code: `function toLowerCase(str: string): string {
  return str.toLowerCase();
}`,
    },
    conversionTable: [{ input: 'HELLO WORLD EXAMPLE', output: 'hello world example', context: 'Caps Lock fix' }],
    faqs: [{ question: 'Does lowercase preserve punctuation?', answer: 'Yes, spaces, numbers, and symbols remain unaffected while all alphabetic characters become lowercase.' }],
    relatedSlugs: ['uppercase', 'title-case', 'sentence-case'],
    example: 'user account settings',
  },

  // 26. UPPERCASE
  {
    id: 'upper',
    slug: 'uppercase',
    name: 'UPPERCASE',
    shortName: 'UPPERCASE Converter',
    category: 'natural',
    categoryLabel: 'Text & Titles',
    categorySlug: 'natural',
    primaryKeyword: 'uppercase converter',
    secondaryKeywords: ['convert to uppercase', 'all caps generator', 'capitalize all letters online'],
    seoTitle: 'UPPERCASE Converter — Convert Text to All Caps Online',
    seoDescription: 'Free online UPPERCASE converter. Transform strings and paragraphs into all-capital letters instantly in your browser.',
    summary: 'Converts every character in the string into capital letters (ALL CAPS).',
    description: 'The UPPERCASE converter converts all letters into CAPITAL letters. Useful for warnings, acronym enforcement, legal disclaimers, and emphasis headers.',
    rules: ['Every lowercase letter becomes uppercase.', 'Spacing and punctuation are preserved.'],
    howToUse: [{ step: 1, title: 'Enter Text', text: 'Paste text.' }, { step: 2, title: 'Copy All Caps', text: 'Copy capitalized string.' }],
    features: ['Fast batch processing for multi-line documents', '100% client-side privacy'],
    limitations: ['Punctuation is preserved.'],
    benefits: ['Standard for legal agreements and high-visibility alerts.'],
    stacks: ['Legal Disclaimers', 'Warning Banners', 'Typography'],
    codeSnippet: {
      lang: 'typescript',
      title: 'JavaScript Uppercase',
      code: `function toUpperCase(str: string): string {
  return str.toUpperCase();
}`,
    },
    conversionTable: [{ input: 'important notice', output: 'IMPORTANT NOTICE', context: 'Alert banner' }],
    faqs: [{ question: 'What is UPPERCASE?', answer: 'UPPERCASE (all caps) converts every letter in the text to its capital letter form.' }],
    relatedSlugs: ['lowercase', 'screaming-snake-case', 'title-case'],
    example: 'USER ACCOUNT SETTINGS',
  },

  // 27. Capitalized Case
  {
    id: 'capitalized',
    slug: 'capitalized-case',
    name: 'Capitalized Case',
    shortName: 'Capitalized Case Converter',
    category: 'natural',
    categoryLabel: 'Text & Titles',
    categorySlug: 'natural',
    primaryKeyword: 'capitalized case converter',
    secondaryKeywords: ['capitalize every word', 'start case converter', 'first letter capital online'],
    seoTitle: 'Capitalized Case Converter — Capitalize Every Word Online',
    seoDescription: 'Free online Capitalized Case converter. Capitalize the first letter of every single word, separated by spaces.',
    summary: 'Capitalizes the first letter of every single word without exception, separated by spaces.',
    description: 'Capitalized Case (also known as Start Case) capitalizes the first letter of every word regardless of grammatical role. Great for nametags, certificates, badges, and table headers.',
    rules: ['Every single word starts with a capital letter.', 'Remaining letters in each word are lowercased.', 'Spaces between words are preserved.'],
    howToUse: [{ step: 1, title: 'Enter Names', text: 'Enter names or phrases.' }, { step: 2, title: 'Copy Capitalized Words', text: 'Copy cleanly capitalized words.' }],
    features: ['Ensures every word starts with capital', 'Ideal for user names and certificates'],
    limitations: ['Unlike Title Case, it does not keep minor prepositions (e.g. "of", "and") in lowercase.'],
    benefits: ['Clean formatting for user registration lists and nametags.'],
    stacks: ['Nametags', 'Certificates', 'Display Headers'],
    codeSnippet: {
      lang: 'typescript',
      title: 'JavaScript Capitalized Case',
      code: `function toCapitalizedCase(str: string): string {
  return str.trim().split(/\\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}`,
    },
    conversionTable: [{ input: 'johnathan edward doe', output: 'Johnathan Edward Doe', context: 'Person name' }],
    faqs: [{ question: 'How does Capitalized Case differ from Title Case?', answer: 'Capitalized Case capitalizes every single word (e.g. "War And Peace"), whereas Title Case keeps minor words lowercase (e.g. "War and Peace").' }],
    relatedSlugs: ['title-case', 'sentence-case', 'pascal-case'],
    example: 'User Account Settings',
  },

  // 28. aLtErNaTiNg cAsE
  {
    id: 'alternating',
    slug: 'alternating-case',
    name: 'aLtErNaTiNg cAsE',
    shortName: 'aLtErNaTiNg cAsE Generator',
    category: 'natural',
    categoryLabel: 'Text & Titles',
    categorySlug: 'natural',
    primaryKeyword: 'alternating case converter',
    secondaryKeywords: ['spongebob mock case', 'meme text generator', 'mocking text converter'],
    seoTitle: 'aLtErNaTiNg cAsE Generator — Spongebob Meme Text Converter',
    seoDescription: 'Free online alternating case generator. Convert text to aLtErNaTiNg cAsE (sPoNgEbOb mOcKiNg cAsE) for memes and social media.',
    summary: 'Alternates every letter between lowercase and uppercase, popular for meme and sarcasm text.',
    description: 'Alternating case (popularized by the Mocking SpongeBob meme) alternates letters between lowercase and uppercase across the entire string.',
    rules: ['First letter is lowercase.', 'Second letter is uppercase, third is lowercase, alternating continuously.', 'Spaces do not reset alternation parity.'],
    howToUse: [{ step: 1, title: 'Enter Text', text: 'Type sarcastic response.' }, { step: 2, title: 'Copy Meme Text', text: 'Copy aLtErNaTiNg text.' }],
    features: ['Instant meme sarcasm text generation', 'Preserves spacing'],
    limitations: ['Purely for entertainment and creative communication.'],
    benefits: ['One-click generation of trending meme text.'],
    stacks: ['Social Media', 'Discord / Reddit Memes'],
    codeSnippet: {
      lang: 'typescript',
      title: 'JavaScript Alternating Case',
      code: `function toAlternatingCase(str: string): string {
  return str.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
}`,
    },
    conversionTable: [{ input: 'you cannot do that', output: 'yOu cAnNoT Do tHaT', context: 'Meme reply' }],
    faqs: [{ question: 'What is alternating case used for?', answer: 'It is used in social media and chat apps to convey playful sarcasm or mockery.' }],
    relatedSlugs: ['inverse-case', 'uppercase', 'lowercase'],
    example: 'uSeR AcCoUnT SeTtInGs',
  },

  // 29. InVeRsE cAsE
  {
    id: 'inverse',
    slug: 'inverse-case',
    name: 'InVeRsE cAsE',
    shortName: 'InVeRsE cAsE Converter',
    category: 'natural',
    categoryLabel: 'Text & Titles',
    categorySlug: 'natural',
    primaryKeyword: 'inverse case converter',
    secondaryKeywords: ['invert case online', 'swap case converter', 'toggle case tool'],
    seoTitle: 'InVeRsE cAsE Converter — Swap & Invert Letter Case Online',
    seoDescription: 'Free online InVeRsE cAsE converter. Invert character casing: convert capital letters to lowercase and lowercase letters to uppercase.',
    summary: 'Inverts the casing of each character: lowercase becomes uppercase and uppercase becomes lowercase.',
    description: 'InVeRsE cAsE swaps the case of every character. If a letter was lowercase, it becomes uppercase; if it was uppercase, it becomes lowercase.',
    rules: ['Lowercase characters become uppercase.', 'Uppercase characters become lowercase.', 'Symbols and numbers remain unchanged.'],
    howToUse: [{ step: 1, title: 'Enter Mixed Case', text: 'Paste mixed case text.' }, { step: 2, title: 'Invert', text: 'Casing is flipped automatically.' }, { step: 3, title: 'Copy', text: 'Copy inverted text.' }],
    features: ['Toggle case utility for accidental Caps Lock inversions'],
    limitations: ['Non-alphabetic characters remain unchanged.'],
    benefits: ['Fixes sentences typed while Caps Lock was accidentally active.'],
    stacks: ['Text correction', 'Cipher puzzles'],
    codeSnippet: {
      lang: 'typescript',
      title: 'JavaScript Invert Case',
      code: `function toInverseCase(str: string): string {
  return str.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');
}`,
    },
    conversionTable: [{ input: 'hELLO wORLD', output: 'Hello World', context: 'Caps lock correction' }],
    faqs: [{ question: 'What is Inverse Case?', answer: 'It inverts each letter: lowercase letters become uppercase and uppercase letters become lowercase.' }],
    relatedSlugs: ['alternating-case', 'lowercase', 'uppercase'],
    example: 'USER aCCOUNT sETTINGS',
  },
];

// Lookup Maps for O(1) retrieval
const TOOLS_BY_SLUG = new Map<string, ToolDefinition>();
const TOOLS_BY_ID = new Map<string, ToolDefinition>();

for (const tool of TOOLS) {
  TOOLS_BY_SLUG.set(tool.slug, tool);
  TOOLS_BY_ID.set(tool.id, tool);
}

export function getAllTools(): ToolDefinition[] {
  return TOOLS;
}

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS_BY_SLUG.get(slug);
}

export function getToolById(id: string): ToolDefinition | undefined {
  return TOOLS_BY_ID.get(id);
}

export function getToolsByCategory(category: 'developer' | 'natural' | 'utility'): ToolDefinition[] {
  return TOOLS.filter((t) => t.category === category);
}

export function getAllCategories(): CategoryInfo[] {
  return Object.values(CATEGORIES);
}

export function getCategoryInfo(category: 'developer' | 'natural' | 'utility'): CategoryInfo {
  return CATEGORIES[category];
}

// Generate centralized Next.js Metadata for any tool page
export function generateToolMetadata(tool: ToolDefinition): Metadata {
  const canonicalUrl = `${BASE_URL}/tools/${tool.slug}`;

  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    keywords: [tool.primaryKeyword, ...tool.secondaryKeywords, 'formatcase', 'text converter', 'developer utility'],
    authors: [{ name: 'Shoaib M. Arif' }],
    creator: 'Shoaib M. Arif',
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      siteName: 'FormatCase',
      locale: 'en_US',
      title: tool.seoTitle,
      description: tool.seoDescription,
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1400,
          height: 560,
          alt: `${tool.name} Converter - FormatCase`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.seoTitle,
      description: tool.seoDescription,
      images: [`${BASE_URL}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  };
}

// Generate valid Schema.org JSON-LD structured data for a tool page
export function generateToolJsonLd(tool: ToolDefinition) {
  const pageUrl = `${BASE_URL}/tools/${tool.slug}`;
  const categoryUrl = `${BASE_URL}/category/${tool.category}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. WebApplication / SoftwareApplication
      {
        '@type': 'WebApplication',
        '@id': `${pageUrl}#webapp`,
        name: `${tool.name} Converter`,
        url: pageUrl,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Runs 100% offline in-browser.',
        description: tool.summary,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      // 2. BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${BASE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: tool.categoryLabel,
            item: categoryUrl,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${tool.name} Converter`,
            item: pageUrl,
          },
        ],
      },
      // 3. FAQPage (matching visible FAQs on the page)
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: tool.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}
