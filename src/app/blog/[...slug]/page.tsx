export function generateStaticParams() {
  return [{ slug: ["1"] }, { slug: ["2"] }]
}

export const dynamicParams = false

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params

  return <div>blog {slug}</div>
}
