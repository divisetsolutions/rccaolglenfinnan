type ParishPageProps = {
  params: {
    parish: string;
  };
};

export default function ParishPage({ params }: ParishPageProps) {
  return (
    <div>
      <h1>Parish Page</h1>
      <p>Parish: {params.parish}</p>
    </div>
  );
}
