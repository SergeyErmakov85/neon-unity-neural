/**
 * Section_MarkovProperty — ключевое допущение марковости.
 * TODO (промпт 5): определение + интуиция (фото мяча vs скорость),
 * случай нарушения → POMDP, frame stacking.
 */
const Section_MarkovProperty = () => {
  return (
    <section
      id="l15-markov-property"
      aria-label="Lesson 1.5 — Markov Property (плейсхолдер)"
      className="py-2"
    >
      <h2
        className="text-2xl font-bold tracking-wide"
        style={{
          fontFamily: "'Orbitron', 'Inter', ui-sans-serif, system-ui, sans-serif",
          color: "#00FFD6",
        }}
      >
        Свойство Маркова
      </h2>
      <p className="text-sm italic text-muted-foreground mt-1">
        Placeholder — будет заполнено в промпте 5 (формулировка, интуиция, POMDP).
      </p>
    </section>
  );
};

export default Section_MarkovProperty;
