import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export interface Post {
  slug: string;
  title: string;
  date: string;
  dateISO: string;
  category: string;
  readTime: string;
  excerpt: string;
  description: string;
  author: string;
  keywords: string[];
  content: string;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));
  return files
    .map(filename => {
      const slug = filename.replace('.mdx', '');
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8');
      const { data, content } = matter(raw);
      const rt = readingTime(content);
      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        dateISO: data.dateISO || data.date || '',
        category: data.category || '',
        readTime: data.readTime || rt.text,
        excerpt: data.excerpt || data.description || '',
        description: data.description || data.excerpt || '',
        author: data.author || 'Joe Peck',
        keywords: data.keywords || [],
        content,
      };
    })
    .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const filepath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, 'utf-8');
  const { data, content } = matter(raw);
  const rt = readingTime(content);
  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    dateISO: data.dateISO || data.date || '',
    category: data.category || '',
    readTime: data.readTime || rt.text,
    excerpt: data.excerpt || data.description || '',
    description: data.description || data.excerpt || '',
    author: data.author || 'Joe Peck',
    keywords: data.keywords || [],
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace('.mdx', ''));
}
