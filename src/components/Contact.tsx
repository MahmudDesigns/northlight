"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Clock, Loader2, Mail, MapPin } from "lucide-react";
import { GradientButton, SectionHead } from "@/components/ui";
import { CATEGORIES, CONTACT_EMAIL } from "@/data/site";

type Field = "name" | "email" | "message";
type Values = Record<Field, string>;

const INITIAL: Values = { name: "", email: "", message: "" };

/** Real-time validation — errors only surface once a field has been visited. */
function validate(values: Values, service: string) {
  const errors: Partial<Record<Field, string>> = {};
  if (!values.name.trim()) errors.name = "Tell us who you are";
  else if (values.name.trim().length < 2) errors.name = "A little more, please";

  if (!values.email.trim()) errors.email = "We need an address to reply to";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = "That address doesn't look right";

  if (!values.message.trim()) errors.message = "Add a short brief";
  else if (values.message.trim().length < 24)
    errors.message = "A few more words helps us reply properly";

  if (!service) errors.message = errors.message ?? "Pick a discipline";

  return errors;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="label mt-2 text-nl-magenta">
      {message}
    </p>
  );
}

export default function Contact() {
  const [values, setValues] = useState<Values>(INITIAL);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [service, setService] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const errors = useMemo(() => validate(values, service), [values, service]);
  const show = (f: Field) => (touched[f] ? errors[f] : undefined);

  const set = (f: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [f]: e.target.value }));
  const blur = (f: Field) => () => setTouched((t) => ({ ...t, [f]: true }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errors).length > 0) {
      nameRef.current?.focus();
      return;
    }
    setStatus("sending");
    /* Front-end only: no endpoint, no keys, no backend required. */
    window.setTimeout(() => setStatus("sent"), 1300);
  };

  const reset = () => {
    setValues(INITIAL);
    setTouched({});
    setService("");
    setStatus("idle");
    window.setTimeout(() => nameRef.current?.focus(), 40);
  };

  const inputCls = (f: Field) =>
    `w-full rounded-tight border bg-paper px-4 py-3.5 text-base outline-none transition-all duration-300 placeholder:text-muted/70 ${
      show(f)
        ? "border-nl-magenta"
        : touched[f] && !errors[f]
          ? "border-nl-indigo"
          : "border-line focus:border-nl-indigo"
    }`;

  return (
    <section id="contact" className="scroll-mt-24 bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <SectionHead
          index="06"
          label="Start a project"
          title={
            <>
              Tell us what you are building.{" "}
              <span className="grad-text">We reply within a day.</span>
            </>
          }
          intro="No discovery fees, no pitch theatre. Send a brief and you will hear back from the person who would actually run the project."
        />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-14">
          {/* Direct details */}
          <div className="lg:col-span-4">
            <ul className="space-y-6">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: CONTACT_EMAIL,
                  href: `mailto:${CONTACT_EMAIL}`,
                },
                {
                  icon: MapPin,
                  label: "Studio",
                  value: "Sønder Boulevard 42, 1720 København V",
                },
                {
                  icon: Clock,
                  label: "Availability",
                  value: "Taking on two projects for Q2 2026",
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex gap-4 border-b border-line pb-6">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-nl-indigo">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="label block text-muted">{label}</span>
                    {href ? (
                      <a
                        href={href}
                        className="sweep mt-2 block break-words text-base font-semibold"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="mt-2 block text-base font-semibold">{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-[36ch] text-sm leading-relaxed text-muted">
              Prefer to talk it through? Ask for a 20-minute call and we will
              send three slots the same day.
            </p>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            <div className="relative overflow-hidden rounded-card border border-line bg-surface p-6 md:p-9">
              <div
                aria-hidden="true"
                className="mesh pointer-events-none absolute -top-24 -right-24 h-72 w-72 opacity-30 blur-2xl"
              />

              {status === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative py-10 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full text-white grad">
                    <Check className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 text-2xl font-bold tracking-[-0.03em] md:text-3xl">
                    Brief received, {values.name.split(" ")[0]}.
                  </h3>
                  <p className="mx-auto mt-4 max-w-[46ch] text-base leading-relaxed text-muted">
                    Thanks — your note is queued. A studio lead will reply to{" "}
                    <span className="font-semibold text-ink">{values.email}</span>{" "}
                    within one working day, usually much sooner.
                  </p>
                  <div className="mt-8 flex justify-center">
                    <GradientButton onClick={reset}>Send another message</GradientButton>
                  </div>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={onSubmit} noValidate className="relative">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-name" className="label block text-muted">
                        Your name *
                      </label>
                      <input
                        id="c-name"
                        ref={nameRef}
                        className={`mt-3 ${inputCls("name")}`}
                        value={values.name}
                        onChange={set("name")}
                        onBlur={blur("name")}
                        placeholder="Ingrid Halvorsen"
                        autoComplete="name"
                        aria-invalid={!!show("name")}
                        aria-describedby={show("name") ? "err-name" : undefined}
                      />
                      <FieldError id="err-name" message={show("name")} />
                    </div>

                    <div>
                      <label htmlFor="c-email" className="label block text-muted">
                        Email *
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        className={`mt-3 ${inputCls("email")}`}
                        value={values.email}
                        onChange={set("email")}
                        onBlur={blur("email")}
                        placeholder="you@company.com"
                        autoComplete="email"
                        aria-invalid={!!show("email")}
                        aria-describedby={show("email") ? "err-email" : undefined}
                      />
                      <FieldError id="err-email" message={show("email")} />
                    </div>
                  </div>

                  <fieldset className="mt-6">
                    <legend className="label text-muted">What do you need? *</legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {CATEGORIES.map((c) => {
                        const on = service === c;
                        return (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setService(on ? "" : c)}
                            aria-pressed={on}
                            className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                              on
                                ? "border-transparent text-white grad"
                                : "border-line text-muted hover:border-ink hover:text-ink"
                            }`}
                          >
                            {c}
                          </button>
                        );
                      })}
                    </div>
                    <FieldError id="err-service" message={touched.message && !service ? "Pick a discipline" : undefined} />
                  </fieldset>

                  <div className="mt-6">
                    <label htmlFor="c-message" className="label block text-muted">
                      Project brief *
                    </label>
                    <textarea
                      id="c-message"
                      rows={5}
                      className={`mt-3 resize-y ${inputCls("message")}`}
                      value={values.message}
                      onChange={set("message")}
                      onBlur={blur("message")}
                      placeholder="What are you launching, who is it for, and when does it need to be live?"
                      aria-invalid={!!show("message")}
                      aria-describedby={show("message") ? "err-message" : undefined}
                    />
                    <div className="flex items-start justify-between gap-4">
                      <FieldError id="err-message" message={show("message")} />
                      <span className="label ml-auto mt-2 tabular-nums text-muted">
                        {values.message.trim().length} chars
                      </span>
                    </div>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <GradientButton type="submit" disabled={status === "sending"}>
                      {status === "sending" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send the brief
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </GradientButton>
                    <p className="label text-muted">
                      {status === "sending" ? "Hold on…" : "No spam. Ever."}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
