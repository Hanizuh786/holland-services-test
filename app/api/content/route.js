import site from '../../../data/siteData.json';
import { getAllInsights } from '../../../lib/insights';

export function GET() {
  return Response.json({...site, insights: getAllInsights()});
}
