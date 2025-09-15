import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Safeguarding',
  description: 'Information about safeguarding in our parishes.',
};

export default function SafeguardingPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Safeguarding
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          The Diocese of Argyll and the Isles is committed to the highest standards of safeguarding to protect children and vulnerable adults.
        </p>
      </div>
      <div className="max-w-[700px]">
        <h2 className="text-2xl font-bold mt-8 mb-4">Diocesan Safeguarding Advisor</h2>
        <p>Rev. Dr. Tony Livesey</p>
        <p>Diocesan Office</p>
        <p>Esplanade, Oban</p>
        <p>PA34 5AB</p>
        <p>Tel: 07938 253133</p>
        <p>Email: Safeguardingadvisor@rcdai.org.uk</p>
      </div>
    </section>
  );
}
