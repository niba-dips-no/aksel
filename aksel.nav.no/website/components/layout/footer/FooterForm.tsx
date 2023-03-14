import { Button, Heading, Label, Textarea } from "@navikt/ds-react";
import { IdContext } from "components/website-modules/utils/contexts/id-context";
import { FeedbackT } from "lib/types/types";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const FooterForm = () => {
  const idCtx = useContext(IdContext);

  const [contactForm, setContactForm] = useState({
    content: "",
    hasWritten: false,
  });

  const [contentError, setContentError] = useState({ content: "" });
  const [sent, setSent] = useState({ status: false });

  const { asPath, basePath } = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    let fail = false;
    if (!contactForm?.content || contactForm?.content.trim().length === 0) {
      setContentError({
        ...contentError,
        content: "Melding kan ikke være tom. Fyll inn meldingen.",
      });
      fail = true;
    }

    if (fail) return;
    setContentError({ content: "" });

    const body: FeedbackT = {
      message: contactForm.content,
      url: `${basePath}${asPath}`,
      type: "footer",
      docId: idCtx?.id,
    };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(body),
    });

    setSent({ status: true });
    setContactForm({ content: "", hasWritten: false });
  };

  useEffect(() => {
    setSent({ status: false });
    setContactForm({ content: "", hasWritten: false });
    setContentError({ content: "" });
  }, [asPath]);

  return (
    <>
      <div className="flex w-full max-w-md flex-col gap-8" data-theme="dark">
        <div aria-live="polite">
          {sent.status && (
            <Label spacing as="p">
              Meldingen er sendt til Aksel, takk for tilbakemeldingen!
            </Label>
          )}
        </div>
        {!sent.status && (
          <form onSubmit={(e) => handleSubmit(e)} className="w-full">
            <div className="mb-4 flex flex-col gap-4">
              <Heading level="2" size="small">
                Gi en tilbakemelding
              </Heading>
              <Textarea
                className="textarea-override"
                error={contentError.content}
                autoComplete="off"
                label="Melding"
                value={contactForm.content}
                onChange={(e) => {
                  setContactForm({
                    ...contactForm,
                    content: e.target.value,
                    hasWritten: true,
                  });
                  e.target.value &&
                    e.target.value.trim().length !== 0 &&
                    setContentError({ ...contentError, content: "" });
                }}
                description="Ikke skriv inn navn eller andre personopplysninger"
                minRows={2}
              />
            </div>
            {contactForm.hasWritten && <Button>Send melding</Button>}
            <style>{`.textarea-override {
              --ac-textarea-bg: var(--a-deepblue-800);
            }`}</style>
          </form>
        )}
      </div>
    </>
  );
};

export default FooterForm;
