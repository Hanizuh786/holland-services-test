import site from '../data/siteData.json';
import { getAllInsights } from '../lib/insights';

export default function sitemap(){
  const base=site.baseUrl;
  const insights=getAllInsights();
  return [{url:base,lastModified:new Date()},{url:`${base}/services`,lastModified:new Date()},{url:`${base}/insights`,lastModified:new Date()},{url:`${base}/newsletter`,lastModified:new Date()},{url:`${base}/contact`,lastModified:new Date()},...site.services.map(s=>({url:`${base}/services/${s.slug}`,lastModified:new Date()})),...insights.map(s=>({url:`${base}/insights/${s.slug}`,lastModified:s.date?new Date(s.date):new Date()}))]
}
