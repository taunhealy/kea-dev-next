import { verifySanityConnection } from "@/lib/sanity";

export default async function SanityDebugPage() {
  await verifySanityConnection();
  return <div>Check browser console for Sanity connection details</div>;
}
