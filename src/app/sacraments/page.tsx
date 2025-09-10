import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sacraments',
  description: 'Information about the sacraments of Baptism, Marriage, and more at the parishes of St John the Evangelist, Caol and St Mary & St Finnan, Glenfinnan.',
};

export default function SacramentsPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Sacraments
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Information about the sacraments of Baptism, Marriage, and more.
        </p>
      </div>
    </section>
  );
}
