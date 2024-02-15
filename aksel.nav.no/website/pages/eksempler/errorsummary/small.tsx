import { ErrorSummary } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <ErrorSummary
      heading="Du må fikse disse feilene før du kan sende inn søknad."
      size="small"
      aria-live="polite"
    >
      <ErrorSummary.Item href="#1">
        Felt må fylles ut med alder
      </ErrorSummary.Item>
      <ErrorSummary.Item href="#2">
        Tekstfeltet må ha en godkjent e-mail
      </ErrorSummary.Item>
    </ErrorSummary>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
