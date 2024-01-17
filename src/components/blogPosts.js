import { getCollection, getEntry } from 'astro:content';

export const blogPosts = await getCollection('docs', ({slug}) => {
    const pathSections = slug.split('/');
    return pathSections[0] === 'blog' && pathSections[1] != null;
});
