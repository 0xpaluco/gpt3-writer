import 'server-only'

import { Account } from '../../src/views';

// do not cache this page
export const revalidate = 0;

export default async function AccountPage() {

  return <Account/>;
}
