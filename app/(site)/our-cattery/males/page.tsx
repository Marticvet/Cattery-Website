import { CatListing } from '@/components/CatListing';
import { pageMetadata } from '@/lib/metadata';
export const generateMetadata = () => pageMetadata('Our Males', '/our-cattery/males');
export default function MalesPage() {
  return <CatListing sex="male" />;
}
