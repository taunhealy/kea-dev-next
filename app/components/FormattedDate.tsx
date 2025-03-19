export default function FormattedDate({ date }: { date: string }) {
  return (
    <time dateTime={date} className="font-primary">
      {new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </time>
  );
}
