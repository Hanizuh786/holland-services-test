
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import PageHero from '../../../components/PageHero';
import ServiceLayout from '../../../components/ServiceLayout';
import { getAllInsights, getInsightBySlug } from '../../../lib/insights';
import { notFound } from 'next/navigation';
export function generateStaticParams(){return getAllInsights().map(s=>({slug:s.slug}))}
export async function generateMetadata({params}){const resolved=await params; const p=getInsightBySlug(resolved.slug); if(!p) return {}; return {title:p.title, description:p.lead, keywords:p.keywords, alternates:{canonical:`/insights/${p.slug}`}, openGraph:{title:p.title,description:p.lead,images:p.image?[p.image]:[]}}}
export default async function InsightPage({params}){const resolved=await params; const page=getInsightBySlug(resolved.slug); if(!page) notFound(); return <><Header/><main><PageHero eyebrow='Insight' title={page.title} lead={page.lead}/><ServiceLayout page={page} type='insight'/></main><Footer/></>}
