import EventDetailPage, {
  generateMetadata as generateEventMetadata,
} from '../../../[locale]/arrangementer/[slug]/page';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return generateEventMetadata({
    params: Promise.resolve({ locale: 'nb', slug }),
  });
}

export default async function DefaultEventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <EventDetailPage params={Promise.resolve({ locale: 'nb', slug })} />
  );
}
