export function LinkedInEmbed({ url }: { url: string }) {
  return (
    <section className="artigo__linkedin">
      <p className="artigo__linkedin-label">— Discussão no LinkedIn</p>
      <iframe
        src={url}
        width="100%"
        height="600"
        frameBorder="0"
        allowFullScreen
        loading="lazy"
        title="Discussão no LinkedIn"
      />
    </section>
  );
}
