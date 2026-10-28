'use client'

import type { Form as PayloadForm } from '@payloadcms/plugin-form-builder/types'
import type React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Eyebrow, type BlockData } from './shared'

type ConsultationData = BlockData & { form?: PayloadForm | number | null }
type FormField = Record<string, any>

function Icon({ children }: { children: React.ReactNode }) {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">{children}</svg>
}

function Arrow() {
  return <Icon><path d="M4 12H19M13 6L19 12L13 18" /></Icon>
}

function ConsultationForm({ form, data }: { form: PayloadForm; data: ConsultationData }) {
  const fields = (form.fields || []) as FormField[]
  const steps = [fields.slice(0, 2), ...fields.slice(2).map((field) => [field])].filter((step) => step.length > 0)
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, trigger, watch, formState: { errors } } = useForm<Record<string, string>>()
  const values = watch()
  const currentFields = steps[step] || []
  const stepCopy = [
    { heading: (form as any).step1Heading || "Let's find the right investment path for you", intro: (form as any).step1Intro || "Just a few quick questions, so we don't waste your time." },
    { heading: (form as any).step2Heading || 'How much are you looking to invest?', intro: (form as any).step2Intro || 'This helps us recommend the right instruments for your capital.' },
    { heading: (form as any).step3Heading || 'Who gives the green light?', intro: (form as any).step3Intro || 'This helps our advisors prepare the right conversation for you.' },
    { heading: (form as any).step4Heading || "What's your primary goal right now?", intro: (form as any).step4Intro || 'PSX equities, PMEX commodities, or both.' },
  ][step] || { heading: form.title, intro: '' }

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

  if (submitted) return <div className="mt-6 text-body-sm text-text-secondary">Thank you. We will be in touch shortly.</div>

  return (
    <form className="relative" onSubmit={handleSubmit(submit)} noValidate>
      <div className="mb-6 flex items-center gap-2" aria-hidden="true">
        {steps.map((_, index) => <span key={index} className={`h-1 flex-1 rounded-full ${index <= step ? 'bg-accent' : 'bg-surface-sunken'}`} />)}
      </div>
      <p className="text-caption font-semibold tracking-overline text-text-muted uppercase">Step {step + 1} of {steps.length} · <span className="normal-case tracking-normal">{data.formStepLabel?.split('·').slice(1).join('·').trim() || 'Demo — nothing is submitted'}</span></p>
      <h3 className="font-display text-h4 mt-2 font-semibold text-text">{stepCopy.heading}</h3>
      <p className="text-body-sm mt-1 text-text-secondary">{stepCopy.intro}</p>
      <div className="mt-6 grid gap-4" aria-live="polite">
        {currentFields.map((field, index) => {
          const fieldName = field.name || `field-${index}`
          if (field.blockType === 'select' || field.blockType === 'radio') {
            return <div key={fieldName} className="grid gap-2 sm:grid-cols-2">
              {(field.options || []).map((option: { label: string; value: string; description?: string }) => {
                const selected = values[fieldName] === option.value
                return <label key={option.value} className={`relative flex min-h-20 cursor-pointer items-start gap-3 rounded-sm border p-3.5 transition-colors ${selected ? 'border-action ring-1 ring-action' : 'border-border-strong hover:border-action'}`}>
                  <input type="radio" value={option.value} className="mt-0.5 h-4 w-4 accent-action" {...register(fieldName, { required: Boolean(field.required) })} />
                  <span><span className="block font-semibold text-text">{option.label}</span>{option.description && <span className="mt-1 block text-body-sm text-text-secondary">{option.description}</span>}</span>
                </label>
              })}
              {errors[fieldName] && <span className="text-body-sm text-text-secondary sm:col-span-2">Choose an option to continue.</span>}
            </div>
          }
          return <label key={fieldName} className="block text-body-sm font-semibold text-text" htmlFor={`consultation-${fieldName}`}>
            {field.label || fieldName}{field.required ? ' *' : ''}
            <input id={`consultation-${fieldName}`} className="mt-1.5 h-12 w-full rounded-sm border border-border-strong bg-surface px-3.5 text-body text-text" type={field.blockType === 'email' ? 'email' : 'text'} autoComplete={field.blockType === 'email' ? 'email' : fieldName.toLowerCase().includes('phone') ? 'tel' : 'name'} {...register(fieldName, { required: Boolean(field.required) })} />
            {errors[fieldName] && <span className="mt-1 block text-body-sm text-text-secondary">This field is required.</span>}
          </label>
        })}
      </div>
      {error && <p className="mt-4 text-body-sm text-text-secondary" role="alert">{error}</p>}
      <div className="mt-6 flex items-center justify-between gap-3">
        {step > 0 ? <button type="button" onClick={() => setStep((current) => current - 1)} className="font-semibold text-action hover:underline">Back</button> : <span />}
        {step < steps.length - 1 ? <button type="button" onClick={next} className="inline-flex h-11 items-center gap-2 rounded-sm bg-action px-5 font-semibold text-on-action hover:bg-action-hover disabled:opacity-50" disabled={!currentFields.every((field) => !field.required || values[field.name])}>Continue <Arrow /></button> : <button type="submit" disabled={loading || !currentFields.every((field) => !field.required || values[field.name])} className="inline-flex h-11 items-center gap-2 rounded-sm bg-action px-5 font-semibold text-on-action hover:bg-action-hover disabled:cursor-not-allowed disabled:opacity-50">{loading ? 'Sending…' : (form.submitButtonLabel || 'Submit')} <Arrow /></button>}
      </div>
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
        <ul className="mt-8 space-y-3">
          <li><a href={data.phoneHref} className="flex items-center gap-3 font-semibold text-text hover:underline"><Icon><path d="M5 4H9L10.5 8.5L8 10C9 12.5 11.5 15 14 16L15.5 13.5L20 15V19C20 19.6 19.6 20 19 20C11 20 4 13 4 5C4 4.4 4.4 4 5 4Z" /></Icon>{data.phone}</a></li>
          <li><a href={data.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-semibold text-text hover:underline"><Icon><path d="M4 5H20V16H10L5 20V16H4Z" /><path d="M8 10H16M8 13H13" /></Icon>{data.whatsappLabel}</a></li>
          <li className="flex items-center gap-3 text-text-secondary"><Icon><circle cx="12" cy="12" r="8.5" /><path d="M12 7V12L15.5 14" /></Icon>{data.hours}</li>
        </ul>
      </div>
      <div className="lg:col-span-7"><div className="rounded-sm border border-border bg-surface p-6 shadow-sm md:p-8">{form ? <ConsultationForm form={form} data={data} /> : <p className="text-body-sm text-text-secondary">Select a form in the block’s Form tab.</p>}</div></div>
    </div>
  </section>
}
