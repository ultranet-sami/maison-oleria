"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Star, Download } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    question: "Comment decririez-vous votre style actuel ?",
    options: ["Classique et sobre", "Boheme et libre", "Elegant et sophistique", "Sportif et decontracte", "Moderne et avant-garde"],
  },
  {
    id: 2,
    question: "Quelle couleur portez-vous le plus souvent ?",
    options: ["Noir / Blanc", "Bleu marine / Gris", "Beige / Nude", "Couleurs vives", "Tons terreux / Rouille"],
  },
  {
    id: 3,
    question: "Pour quelle occasion vous habillez-vous principalement ?",
    options: ["Travail et reunions", "Soirees et evenements", "Quotidien casual", "Mariages et celebrations", "Tout-terrain"],
  },
  {
    id: 4,
    question: "Quelle est votre relation avec le shopping ?",
    options: ["J'evite, je ne sais pas quoi choisir", "J'adore mais j'achete trop", "Je suis tres selectif(ve)", "Je suis guide(e) par les tendances", "J'achete peu mais des pieces de qualite"],
  },
  {
    id: 5,
    question: "Comment vous sentez-vous dans vos vetements ?",
    options: ["Rarement a l'aise", "Parfois confiante", "Souvent bien", "Toujours parfaite", "Je n'y pense pas vraiment"],
  },
  {
    id: 6,
    question: "Votre principale difficulte vestimentaire ?",
    options: ["Trouver ma morphologie", "Coordonner les couleurs", "Suivre les tendances", "Budget limite", "Manque de temps"],
  },
  {
    id: 7,
    question: "Quelle matiere preferez-vous ?",
    options: ["Soie et satin", "Coton et lin", "Cachemire et laine", "Synthetic et stretch", "Cuir et daim"],
  },
  {
    id: 8,
    question: "Votre icone de style ?",
    options: ["Audrey Hepburn (elegance classique)", "Kate Middleton (royale moderne)", "Rihanna (audacieuse)", "Cate Blanchett (sophistiquee)", "Olivia Palermo (preppy chic)"],
  },
  {
    id: 9,
    question: "Quel est votre objectif principal pour votre image ?",
    options: ["Avancer dans ma carriere", "Plaire et seduire", "Me sentir plus confiante", "Etre memorisable", "Exprimer ma creativite"],
  },
  {
    id: 10,
    question: "Comment decririez-vous votre silhouette ?",
    options: ["Sablier (equilibree)", "En poire (hanches larges)", "Rectangulaire (droite)", "En pomme (taille moins marquee)", "En triangle inverse (epaules larges)"],
  },
];

const PROFILES = [
  {
    name: "L'Elegante Classique",
    description: "Votre style est intemporel et raffine. Vous privilegiez la qualite sur la quantite et savez que moins c'est toujours plus. Votre garde-robe ideale : des pieces essentielles de grande qualite.",
    color: "#1F1F1F",
    services: ["Garde-Robe Capsule", "Conseil en Image Complet", "Shopping Accompagne"],
    score: 85,
  },
  {
    name: "La Professionnelle Ambitieuse",
    description: "Votre image est un outil de pouvoir. Vous savez que le style peut accelerer votre carriere. Vous avez besoin d'une strategie image claire et impactante.",
    color: "#C6A46A",
    services: ["Image Professionnelle", "Coaching Image Executive", "Personal Branding"],
    score: 78,
  },
  {
    name: "La Femme en Transition",
    description: "Vous etes a un tournant de votre vie — reconversion, mariage, promotion — et vous avez besoin d'une image qui reflète la nouvelle version de vous-meme.",
    color: "#C8B8A6",
    services: ["Conseil en Image Complet", "Analyse Colorimetrique", "Stylisme Personnel"],
    score: 72,
  },
];

export default function QuizStylePage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const profile = PROFILES[answers.length % PROFILES.length];

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    if (current + 1 >= QUESTIONS.length) {
      setDone(true);
    } else {
      setCurrent(current + 1);
    }
  };

  const progress = ((current) / QUESTIONS.length) * 100;

  if (done) {
    return (
      <div className="min-h-screen bg-ivory pt-32 pb-24">
        <div className="max-w-2xl mx-auto px-6">
          {/* Result header */}
          <div className="text-center mb-12">
            <div className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Votre Profil de Style</div>
            <h1 className="font-playfair text-4xl mb-4">{profile.name}</h1>
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className={i < 4 ? "fill-gold text-gold" : "fill-gold/20 text-gold/20"} />
              ))}
            </div>
            <div className="w-16 h-px bg-gold mx-auto" />
          </div>

          {/* Score */}
          <div className="bg-black text-[#FCFAF7] p-8 mb-8">
            <div className="font-montserrat text-[9px] tracking-[0.3em] uppercase text-gold mb-2">Votre Score de Style</div>
            <div className="font-playfair text-5xl text-gold mb-2">{profile.score}/100</div>
            <div className="w-full bg-gold/20 h-2 mt-3">
              <div className="bg-gold h-2 transition-all duration-1000" style={{ width: `${profile.score}%` }} />
            </div>
            <p className="font-montserrat text-xs text-[#C8B8A6] mt-4 leading-relaxed">
              {profile.description}
            </p>
          </div>

          {/* Recommended services */}
          <div className="bg-white p-8 mb-8">
            <div className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Services Recommandes pour Vous</div>
            <ul className="space-y-2">
              {profile.services.map((s) => (
                <li key={s} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                  <span className="font-montserrat text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <Link href="/reserver" className="btn-gold block w-full text-center">
              Reserver Ma Consultation Personnalisee
            </Link>
            <button
              onClick={() => window.print()}
              className="btn-outline w-full flex items-center justify-center gap-2"
            >
              <Download size={14} />
              Telecharger Mon Profil PDF
            </button>
            <button
              onClick={() => { setAnswers([]); setCurrent(0); setDone(false); }}
              className="w-full font-montserrat text-[10px] tracking-widest uppercase text-black/40 hover:text-gold transition-colors py-3"
            >
              Recommencer le Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[current];

  return (
    <div className="min-h-screen bg-ivory pt-32 pb-24">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="font-montserrat text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Quiz Style Personnalise</div>
          <h1 className="font-playfair text-3xl mb-2">Decouvrez Votre Profil de Style</h1>
          <p className="font-montserrat text-xs text-black/50">{QUESTIONS.length} questions · 3 minutes</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between font-montserrat text-[10px] text-black/40 mb-2">
            <span>Question {current + 1} / {QUESTIONS.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-taupe/20 h-1">
            <div className="bg-gold h-1 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white p-8 mb-6">
          <h2 className="font-playfair text-xl mb-6">{q.question}</h2>
          <div className="space-y-3">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="w-full text-left px-5 py-4 border border-taupe/30 font-montserrat text-sm hover:border-gold hover:bg-gold/5 transition-all duration-200 flex items-center justify-between group"
              >
                <span>{opt}</span>
                <ArrowRight size={14} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        {current > 0 && (
          <button
            onClick={() => { setCurrent(current - 1); setAnswers(answers.slice(0, -1)); }}
            className="flex items-center gap-2 font-montserrat text-[10px] tracking-widest uppercase text-black/40 hover:text-gold transition-colors"
          >
            <ArrowLeft size={12} />
            Question precedente
          </button>
        )}
      </div>
    </div>
  );
}
