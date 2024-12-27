import SearchForm from "@/components/SearchForm";

export default async function Home({searchParams}: {
  searchParams: Promise<{query?: string}>}) {
    const query = (await searchParams).query;

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>
        <p className="subheading !max-w-3xl">
          Submit Ideas, Vote on Pitches and get Noticed in Virtual Competions.
        </p>

        <SearchForm query={query}/>
      </section>
    </>
  );
}
