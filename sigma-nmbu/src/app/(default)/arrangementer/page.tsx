import EventsPage, { generateMetadata as generateEventsMetadata } from '../../[locale]/arrangementer/page';

export async function generateMetadata() {
  return generateEventsMetadata({
    params: Promise.resolve({ locale: 'nb' }),
  });
}

export default function DefaultEventsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <EventsPage
      params={Promise.resolve({ locale: 'nb' })}
      searchParams={searchParams}
    />
  );
}
