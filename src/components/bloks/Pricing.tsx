import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import { Check } from "lucide-react";
import Wrapper from "./Wrapper";
import { BaseBlokProps, StoryblokLink, resolveLink } from "./types";

interface PricingPlan {
  _uid: string;
  name?: string;
  price?: string;
  period?: string;
  features?: { _uid: string; label: string }[];
  cta_label?: string;
  cta_link?: StoryblokLink;
  highlighted?: boolean;
}
interface PricingFields {
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
}

export default function Pricing({ blok }: BaseBlokProps<PricingFields>) {
  return (
    <Wrapper blok={blok} defaultBg="bg-ivory">
      <div {...storyblokEditable(blok)}>
        {blok.subtitle && <p className="section-subtitle mb-4 text-center">{blok.subtitle}</p>}
        {blok.title && <h2 className="section-title mb-12 text-center">{blok.title}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blok.plans?.map((plan) => (
            <div
              key={plan._uid}
              className={`p-10 bg-white border ${plan.highlighted ? "border-gold shadow-lg" : "border-taupe/20"}`}
            >
              <h3 className="font-playfair text-2xl mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="font-playfair text-4xl text-gold">{plan.price}</span>
                {plan.period && <span className="font-montserrat text-xs text-black/50"> /{plan.period}</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features?.map((f) => (
                  <li key={f._uid} className="flex items-start gap-2 text-sm">
                    <Check size={14} className="text-gold mt-0.5 shrink-0" /> {f.label}
                  </li>
                ))}
              </ul>
              {plan.cta_label && (
                <Link href={resolveLink(plan.cta_link)} className={plan.highlighted ? "btn-gold w-full text-center block" : "btn-outline w-full text-center block"}>
                  {plan.cta_label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

// File contains AI-generated response based on internal company sources
