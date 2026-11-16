import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Giving',
  description:
    'How to support the parish of Caol and Glenfinnan through the Diocese of Argyll and the Isles.',
};

export default function DonationsPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[700px] flex-col items-start gap-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Giving to the Parish
        </h1>
        <p className="text-lg text-muted-foreground">
          Thank you for thinking of supporting St John the Evangelist, Caol and St Mary &amp; St
          Finnan, Glenfinnan.
        </p>
        <p>
          Online donations for every parish in the Diocese of Argyll and the Isles are received
          through the diocese and passed on to the parish you name. When you give, please state
          that your gift is for the parish of Caol and Glenfinnan.
        </p>
        <a
          href="https://www.rcdai.org.uk/donate/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground hover:bg-primary/90"
        >
          Give through the Diocese
        </a>
        <p>
          You are also welcome to give at Mass, or to speak to the parish office about standing
          orders and Gift Aid: <a className="underline" href="mailto:caol@rcdai.org.uk">caol@rcdai.org.uk</a>,
          01397 719281.
        </p>
        <p className="text-sm text-muted-foreground">
          The Roman Catholic Diocese of Argyll and the Isles is a registered Scottish charity,
          SC002876.
        </p>
      </div>
    </section>
  );
}
