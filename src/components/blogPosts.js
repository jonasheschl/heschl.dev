import { getCollection } from 'astro:content';

const blogPostsReversed = await getCollection('docs', ({slug}) => {
    const pathSections = slug.split('/');
    return pathSections[0] === 'blog' && pathSections[1] != null;
});

// We want the latest blog posts first
export const blogPosts = blogPostsReversed.reverse();