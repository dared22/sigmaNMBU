import AboutPage, { generateMetadata as generateAboutMetadata } from '../../[locale]/om-oss/page';

export async function generateMetadata() {
  return generateAboutMetadata({
    params: Promise.resolve({ locale: 'nb' }),
  });
}

export default function DefaultAboutPage() {
  return <AboutPage params={Promise.resolve({ locale: 'nb' })} />;
}
