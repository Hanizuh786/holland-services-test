
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import PageHero from '../../../components/PageHero';
import ServiceLayout from '../../../components/ServiceLayout';
import site from '../../../data/siteData.json';
import { notFound } from 'next/navigation';
export function generateStaticParams(){return site.services.map(s=>({slug:s.slug}))}
export async function generateMetadata({params}){const resolved=await params; const p=site.services.find(s=>s.slug===resolved.slug); if(!p) return {}; return {title:p.title, description:p.lead, keywords:p.keywords, alternates:{canonical:`/services/${p.slug}`}}}
export default async function ServicePage({params}){const resolved=await params; const page=site.services.find(s=>s.slug===resolved.slug); if(!page) notFound(); return <><Header/><main><PageHero eyebrow={page.category} title={page.title} lead={page.lead}/><ServiceLayout page={page}/></main><Footer/></>}
