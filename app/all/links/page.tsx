interface PageProps {
  params: {
    alias: string;
  };
}

export default function Page({ params }: PageProps) {
  const { alias } = params;

  return <div>Alias: {alias}</div>;
}
