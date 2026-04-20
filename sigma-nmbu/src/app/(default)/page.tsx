import HomePage, { generateMetadata as generateHomeMetadata } from '../[locale]/page';

export async function generateMetadata() {
  return generateHomeMetadata({
    params: Promise.resolve({ locale: 'nb' }),
  });
}

export default function DefaultHomePage() {
  return <HomePage params={Promise.resolve({ locale: 'nb' })} />;
}
