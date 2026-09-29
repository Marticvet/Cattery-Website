import { CatListing } from '@/components/CatListing';
import { pageMetadata } from '@/lib/metadata';
export const generateMetadata = () => pageMetadata('Our Females', '/our-cattery/females');
export default function FemalesPage() {
  return <CatListing sex="female" />;
}
