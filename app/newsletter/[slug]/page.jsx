import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import PageHero from '../../../components/PageHero';
import ServiceLayout from '../../../components/ServiceLayout';
import { getAllInsights, getInsightBySlug } from '../../../lib/insights';
import { notFound } from 'next/navigation';

export function generateStaticParams(){return getAllInsights().map(post=>({slug:post.slug}))}
export async function generateMetadata({params}){const resolved=await params;const post=getInsightBySlug(resolved.slug);if(!post)return {};return {title:post.title,description:post.lead,keywords:post.keywords,alternates:{canonical:`/newsletter/${post.slug}`},openGraph:{title:post.title,description:post.lead,images:post.image?[post.image]:[]}}}
export default async function NewsletterArticle({params}){const resolved=await params;const page=getInsightBySlug(resolved.slug);if(!page||page.source!=="Website")notFound();return <><Header/><main><PageHero eyebrow="Newsletter" title={page.title} lead={page.lead}/><ServiceLayout page={page} type="insight"/></main><Footer/></>}
