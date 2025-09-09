interface ParishPageProps {
  params: { parish: string };
}

export default async function ParishPage({ params }: ParishPageProps) {
  const { parish } = params;

  return (
    <div>
      <h1>Parish Page</h1>
      <p>Parish: {parish}</p>
    </div>
  );
}