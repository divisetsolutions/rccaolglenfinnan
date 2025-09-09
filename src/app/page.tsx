import { HeroCarousel } from "@/components/HeroCarousel";

export default function Home() {
  return (
    <>
      <section>
        <HeroCarousel />
      </section>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-xl font-semibold">Next Mass</h3>
            <p className="text-muted-foreground">Sunday, 11:00 AM at St. John&apos;s, Caol</p>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-xl font-semibold">Latest News</h3>
            <p className="text-muted-foreground">Parish Summer Fete a Great Success</p>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-xl font-semibold">Newsletter</h3>
            <p className="text-muted-foreground">Download the latest newsletter</p>
          </div>
        </div>
      </section>
    </>
  );
}
