interface RightsSourcesProps {
  sources: string[];
}

const RightsSources = ({ sources }: RightsSourcesProps): JSX.Element | null => {
  if (!sources.length) return null;

  return (
    <details className="border border-border rounded-lg p-4">
      <summary className="cursor-pointer text-sm font-semibold text-muted-foreground">
        Sources ({sources.length})
      </summary>
      <ul className="mt-3 space-y-1">
        {sources.map((url, i) => (
          <li key={i}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline break-all"
            >
              {url}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
};

export default RightsSources;
