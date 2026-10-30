'use client'

import type { Form as PayloadForm } from '@payloadcms/plugin-form-builder/types'
import type React from 'react'
import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Eyebrow, type BlockData } from './shared'

type ConsultationData = BlockData & { form?: PayloadForm | number | null }
type FormField = Record<string, any>

function Icon({ children, size = 20 }: { children: React.ReactNode; size?: number }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">{children}</svg>
}

function Arrow() {
  return <Icon><path d="M4 12H19M13 6L19 12L13 18" /></Icon>
}

function Check() {
  return <Icon size={14}><path d="M5 12.5L9.5 17L19 7" strokeWidth="2.4" /></Icon>
}

function Warning() {
  return <Icon size={15}><circle cx="12" cy="12" r="9" /><path d="M12 7.5V13M12 16.2V16.8" /></Icon>
}

function SinglePageForm({ form, data }: { form: PayloadForm; data: ConsultationData }) {
  const fields = (form.fields || []) as FormField[]
  const { register, handleSubmit, formState: { errors } } = useForm<Record<string, string>>({ mode: 'onTouched' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const uid = useId()
  const submit = async (values: Record<string, string>) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${window.location.origin}/api/form-submissions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ form: form.id, submissionData: Object.entries(values).map(([field, value]) => ({ field, value })) }) })
      if (!response.ok) throw new Error('Something went wrong.')
      setSubmitted(true)
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Something went wrong.')
    } finally { setLoading(false) }
  }
  if (submitted) return <div className="py-4" role="status"><h3 className="font-display text-h4 font-semibold text-text">Thank you — we have your details.</h3><p className="mt-2 text-body-sm text-text-secondary">Our partnerships team will be in touch shortly.</p></div>
  return <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit(submit)} noValidate>
    {fields.map((field, index) => {
      const name = field.name || `field-${index}`
      const errorId = `${uid}-${name}-error`
      const fieldError = errors[name]
      const wide = field.blockType === 'textarea' || field.blockType === 'checkbox'
      const common = `mt-1.5 w-full rounded-sm border bg-surface text-body text-text outline-none focus:border-focus focus:ring-2 focus:ring-focus/25 ${fieldError ? 'border-negative' : 'border-border-strong'}`
      if (field.blockType === 'checkbox') return <div key={name} className="sm:col-span-2"><label className="flex items-start gap-3 text-body-sm text-text"><input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-action" aria-invalid={fieldError ? true : undefined} {...register(name, { required: Boolean(field.required) && 'Please accept the terms to continue.' })} /><span>{field.label || 'I agree'}{data.termsUrl && <> <a href={data.termsUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-text-link underline underline-offset-4">{data.termsLabel || 'Terms & Conditions'}</a>.</>}</span></label>{fieldError && <p id={errorId} role="alert" className="mt-2 text-body-sm text-negative">{String(fieldError.message)}</p>}</div>
      if (field.blockType === 'select') return <div key={name} className={wide ? 'sm:col-span-2' : undefined}><label className="text-body-sm font-semibold text-text" htmlFor={`${uid}-${name}`}>{field.label || name}<select id={`${uid}-${name}`} className={`${common} h-12 px-3.5`} aria-invalid={fieldError ? true : undefined} {...register(name, { required: Boolean(field.required) && 'Choose an option.' })}>{(field.options || []).map((option: any) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label></div>
      if (field.blockType === 'textarea') return <div key={name} className="sm:col-span-2"><label className="text-body-sm font-semibold text-text" htmlFor={`${uid}-${name}`}>{field.label || name}<textarea id={`${uid}-${name}`} rows={4} className={`${common} p-3.5`} {...register(name, rulesFor(field, name))} /></label></div>
      return <div key={name}><label className="text-body-sm font-semibold text-text" htmlFor={`${uid}-${name}`}>{field.label || name}<input id={`${uid}-${name}`} type={field.blockType === 'email' ? 'email' : isPhoneField(name) ? 'tel' : 'text'} className={`${common} h-12 px-3.5`} {...register(name, rulesFor(field, name))} /></label>{fieldError && <p id={errorId} role="alert" className="mt-1 text-body-sm text-negative">{String(fieldError.message)}</p>}</div>
    })}
    {error && <p className="sm:col-span-2 text-body-sm text-negative" role="alert">{error}</p>}
    <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between"><p className="text-caption text-text-muted">{data.reassurance || 'Demo form — nothing is submitted from this preview.'}</p><button type="submit" disabled={loading} className="inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-action px-5 font-semibold text-on-action hover:bg-action-hover disabled:opacity-50">{loading ? 'Sending…' : (form.submitButtonLabel || 'Send message')}<Arrow /></button></div>
  </form>
}

/** A field counts as a phone field when its name mentions one. */
const isPhoneField = (name: string) => name.toLowerCase().includes('phone')

/**
 * Validation rules per field. Phone gets a digit-count check rather than a
 * strict country pattern so the existing "03XX XXXXXXX" local format and an
 * international "+92 …" both pass; anything shorter than a real number fails.
 */
function rulesFor(field: FormField, fieldName: string) {
  const required = Boolean(field.required)
  if (isPhoneField(fieldName)) {
    return {
      required: required && 'Enter a phone number so an advisor can call you back.',
      validate: (value: string) =>
        !value ||
        /^\d{10,15}$/.test(value.replace(/\D/g, '')) ||
        'Enter a valid phone number, for example 03XX XXXXXXX.',
    }
  }
  if (field.blockType === 'email') {
    return {
      required: required && 'Enter an email address.',
      validate: (value: string) =>
        !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Enter a valid email address.',
    }
  }
  // `validate` rather than `minLength`, which would also fire on an empty
  // optional field and block a step the user is allowed to skip.
  return {
    required: required && 'This field is required.',
    validate: (value: string) => !value || value.trim().length >= 2 || 'Enter at least 2 characters.',
  }
}

/** Numbered progress rail: completed steps tick, the current one is ringed. */
function Progress({ steps, step, labels }: { steps: unknown[][]; step: number; labels: string[] }) {
  return (
    <div className="mb-6">
      <ol className="flex items-center gap-2" role="list">
        {steps.map((_, index) => {
          const done = index < step
          const current = index === step
          return (
            <li key={index} className="flex flex-1 items-center gap-2 last:flex-none">
              <span
                aria-hidden="true"
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-caption font-bold transition-colors duration-(--duration-normal) ${
                  done
                    ? 'border-action bg-action text-on-action'
                    : current
                      ? 'border-action bg-surface text-action ring-2 ring-action/25'
                      : 'border-border bg-surface text-text-muted'
                }`}
              >
                {done ? <Check /> : index + 1}
              </span>
              {index < steps.length - 1 && (
                <span aria-hidden="true" className={`h-0.5 flex-1 rounded-full transition-colors duration-(--duration-normal) ${done ? 'bg-action' : 'bg-border'}`} />
              )}
            </li>
          )
        })}
      </ol>
      <p className="mt-3 text-caption font-semibold tracking-label text-text-muted uppercase" aria-live="polite">
        Step {step + 1} of {steps.length}
        {labels[step] ? <span className="normal-case tracking-normal"> · {labels[step]}</span> : null}
      </p>
    </div>
  )
}

export function ConsultationForm({ form, data }: { form: PayloadForm; data: ConsultationData }) {
  if (data.formMode === 'singlePage') return <SinglePageForm form={form} data={data} />
  const fields = (form.fields || []) as FormField[]
  const steps = [fields.slice(0, 2), ...fields.slice(2).map((field) => [field])].filter((step) => step.length > 0)
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const uid = useId()
  const { register, handleSubmit, trigger, watch, formState: { errors } } = useForm<Record<string, string>>({ mode: 'onTouched' })
  const values = watch()
  const currentFields = steps[step] || []
  const stepContent = [
    { heading: (form as any).step1Heading || "Let's find the right investment path for you", intro: (form as any).step1Intro ?? "Just a few quick questions, so we don't waste your time.", label: 'Your details' },
    { heading: (form as any).step2Heading || 'How much are you looking to invest?', intro: (form as any).step2Intro ?? 'This helps us recommend the right instruments for your capital.', label: 'Investment size' },
    { heading: (form as any).step3Heading || 'Who gives the green light?', intro: (form as any).step3Intro ?? 'This helps our advisors prepare the right conversation for you.', label: 'Decision maker' },
    { heading: (form as any).step4Heading || "What's your primary goal right now?", intro: (form as any).step4Intro ?? 'PSX equities, PMEX commodities, or both.', label: 'Your goal' },
  ]
  const stepCopy = stepContent[step] || { heading: form.title, intro: '', label: '' }
  const stepLabels = steps.map((_, index) => stepContent[index]?.label || '')

  /** Every required field on this step has a value — gates the button. */
  const stepComplete = currentFields.every((field) => !field.required || Boolean(values[field.name]))
  const isLastStep = step === steps.length - 1

  const submit = async (submittedValues: Record<string, string>) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${window.location.origin}/api/form-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: form.id, submissionData: Object.entries(submittedValues).map(([field, value]) => ({ field, value })) }),
      })
      if (!response.ok) {
        const result = await response.json().catch(() => null)
        throw new Error(result?.errors?.[0]?.message || 'Something went wrong.')
      }
      setSubmitted(true)
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const next = async () => {
    const valid = await trigger(currentFields.map((field) => field.name).filter(Boolean))
    if (valid) setStep((current) => Math.min(current + 1, steps.length - 1))
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 py-4" role="status">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-positive text-on-action"><Check /></span>
        <div>
          <h3 className="font-display text-h4 font-semibold text-text">Thank you — we have your details.</h3>
          <p className="text-body-sm mt-2 text-text-secondary">An advisor will be in touch shortly during business hours.</p>
        </div>
      </div>
    )
  }

  const buttonBase = 'inline-flex h-12 items-center justify-center gap-2 rounded-md px-6 text-button font-semibold transition-colors duration-(--duration-normal) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus'
  const buttonEnabled = 'bg-action text-on-action shadow-sm hover:bg-action-hover active:bg-action-hover'
  const buttonDisabled = 'disabled:cursor-not-allowed disabled:border disabled:border-border disabled:bg-surface-sunken disabled:text-text-muted disabled:shadow-none'

  return (
    <form className="relative" onSubmit={handleSubmit(submit)} noValidate>
      <Progress steps={steps} step={step} labels={stepLabels} />

      <h3 className="font-display text-h4 font-semibold tracking-heading text-text">{stepCopy.heading}</h3>
      {stepCopy.intro && <p className="text-body-sm mt-2 text-text-secondary">{stepCopy.intro}</p>}

      <div className="mt-6 grid gap-5">
        {currentFields.map((field, index) => {
          const fieldName = field.name || `field-${index}`
          const fieldError = errors[fieldName]
          const errorId = `${uid}-${fieldName}-error`

          if (field.blockType === 'select' || field.blockType === 'radio') {
            return (
              <fieldset key={fieldName} className="border-0 p-0" aria-describedby={fieldError ? errorId : undefined}>
                {field.label && <legend className="mb-2 text-label font-semibold text-text">{field.label}{field.required ? <span className="text-negative"> *</span> : null}</legend>}
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {(field.options || []).map((option: { label: string; value: string; description?: string }) => {
                    const selected = values[fieldName] === option.value
                    return (
                      <label
                        key={option.value}
                        className={`relative flex min-h-20 cursor-pointer items-start gap-3 rounded-md border p-4 transition-colors duration-(--duration-normal) ${
                          selected ? 'border-action bg-surface-sunken ring-1 ring-action' : 'border-border hover:border-action hover:bg-surface-sunken'
                        }`}
                      >
                        <input type="radio" value={option.value} className="mt-0.5 h-4 w-4 shrink-0 accent-action focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus" {...register(fieldName, { required: Boolean(field.required) && 'Choose an option to continue.' })} />
                        <span>
                          <span className="block text-body-sm font-semibold text-text">{option.label}</span>
                          {option.description && <span className="mt-1 block text-caption text-text-secondary">{option.description}</span>}
                        </span>
                      </label>
                    )
                  })}
                </div>
                {fieldError && (
                  <p id={errorId} role="alert" className="mt-2 flex items-center gap-1.5 text-body-sm text-negative">
                    <Warning />{String(fieldError.message || 'Choose an option to continue.')}
                  </p>
                )}
              </fieldset>
            )
          }

          const phone = isPhoneField(fieldName)
          return (
            <div key={fieldName} className="grid gap-1.5">
              <label className="text-label font-semibold text-text" htmlFor={`${uid}-${fieldName}`}>
                {field.label || fieldName}
                {field.required ? <span className="text-negative"> *</span> : null}
              </label>
              <input
                id={`${uid}-${fieldName}`}
                type={field.blockType === 'email' ? 'email' : phone ? 'tel' : 'text'}
                inputMode={phone ? 'tel' : undefined}
                autoComplete={field.blockType === 'email' ? 'email' : phone ? 'tel' : 'name'}
                placeholder={phone ? '03XX XXXXXXX' : undefined}
                aria-invalid={fieldError ? true : undefined}
                aria-describedby={fieldError ? errorId : undefined}
                className={`h-12 w-full rounded-md border bg-surface px-3.5 text-body text-text transition-colors duration-(--duration-normal) outline-none placeholder:text-text-muted focus:ring-2 ${
                  fieldError
                    ? 'border-negative focus:border-negative focus:ring-negative/20'
                    : 'border-border-strong focus:border-focus focus:ring-focus/25'
                }`}
                {...register(fieldName, rulesFor(field, fieldName))}
              />
              {fieldError && (
                <p id={errorId} role="alert" className="flex items-center gap-1.5 text-body-sm text-negative">
                  <Warning />{String(fieldError.message || 'This field is required.')}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {error && (
        <p className="mt-4 flex items-center gap-1.5 text-body-sm text-negative" role="alert">
          <Warning />{error}
        </p>
      )}

      <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" onClick={() => setStep((current) => current - 1)} className="inline-flex h-12 items-center gap-1.5 rounded-md px-1 text-button font-semibold text-action hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus">
            <Icon size={18}><path d="M20 12H5M11 6L5 12L11 18" /></Icon>Back
          </button>
        ) : <span />}

        {isLastStep ? (
          <button type="submit" disabled={loading || !stepComplete} className={`${buttonBase} ${buttonEnabled} ${buttonDisabled}`}>
            {loading ? 'Sending…' : (form.submitButtonLabel || 'Submit')}{!loading && <Arrow />}
          </button>
        ) : (
          <button type="button" onClick={next} disabled={!stepComplete} className={`${buttonBase} ${buttonEnabled} ${buttonDisabled}`}>
            Continue <Arrow />
          </button>
        )}
      </div>

      {!stepComplete && (
        <p className="mt-2.5 text-right text-caption text-text-muted">Fill the required fields to continue.</p>
      )}

      <p className="mt-5 border-t border-border-subtle pt-4 text-caption text-text-muted">
        {data.reassurance || 'These answers help our team understand your requirements before they call you.'}
      </p>
    </form>
  )
}

export function ConsultationQualifier({ data }: { data: ConsultationData }) {
  const form = data.form && typeof data.form === 'object' ? data.form : null
  return <section id="consultation" aria-labelledby="qualifier-h" className="relative theme-sunken py-(--section-y)">
    <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <Eyebrow>{data.eyebrow || 'Investor enquiries'}</Eyebrow>
        <h2 id="qualifier-h" className="font-display text-h2 mt-3 font-normal tracking-[-0.015em] text-text">{data.heading || 'Talk to us about the project'}</h2>
        {(data.subheading || data.intro) && <p className="text-body-lg mt-5 text-text-secondary">{data.subheading || data.intro}</p>}
        <ul className="mt-8 space-y-3">
          <li><a href={data.phoneHref} className="flex items-center gap-3 font-semibold text-text hover:underline"><Icon><path d="M5 4H9L10.5 8.5L8 10C9 12.5 11.5 15 14 16L15.5 13.5L20 15V19C20 19.6 19.6 20 19 20C11 20 4 13 4 5C4 4.4 4.4 4 5 4Z" /></Icon>{data.phone}</a></li>
          <li><a href={data.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-semibold text-text hover:underline"><Icon><path d="M4 5H20V16H10L5 20V16H4Z" /><path d="M8 10H16M8 13H13" /></Icon>{data.whatsappLabel}</a></li>
          <li className="flex items-center gap-3 text-text-secondary"><Icon><circle cx="12" cy="12" r="8.5" /><path d="M12 7V12L15.5 14" /></Icon>{data.hours}</li>
        </ul>
      </div>
      <div className="lg:col-span-7"><div className="rounded-lg border border-border bg-surface p-6 shadow-md md:p-8">{form ? (data.formMode === 'singlePage' ? <SinglePageForm form={form} data={data} /> : <ConsultationForm form={form} data={data} />) : <p className="text-body-sm text-text-secondary">Select a form in the block&rsquo;s Form tab.</p>}</div></div>
    </div>
  </section>
}
