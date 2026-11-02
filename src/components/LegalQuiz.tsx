import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizzes';
import { Language } from '../types';

interface LegalQuizProps {
  language: Language;
  onAskAI: (query: string) => void;
}

export const LegalQuiz: React.FC<LegalQuizProps> = ({ language, onAskAI }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    if (selectedOption === question.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>Test Your Legal & Civic IQ</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-serif mb-2">
          Citizen Rights & Legal Awareness Quiz
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Learn essential safeguards about cyber fraud, arrest rights, consumer courts, and police FIR mandates through quick interactive scenarios.
        </p>
      </div>

      {!isFinished ? (
        <div className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-md">
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-3">
            <span className="text-blue-600 dark:text-teal-400">
              Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px]">
              Category: {question.category}
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-6">
            <div
              className="bg-blue-600 dark:bg-teal-500 h-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-6 leading-snug">
            {language === 'hi' ? question.questionHi : question.questionEn}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {(language === 'hi' ? question.optionsHi : question.optionsEn).map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === question.correctIndex;
              let optionClass =
                'border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-slate-750';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  optionClass =
                    'border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/70 shadow-md ring-2 ring-emerald-500/30';
                } else if (isSelected && !isCorrect) {
                  optionClass =
                    'border-2 border-rose-500 bg-rose-50 dark:bg-rose-950/70 shadow-md ring-2 ring-rose-500/30';
                }
              } else if (isSelected) {
                optionClass =
                  'border-2 border-blue-600 bg-blue-50 dark:bg-blue-950/70 shadow-md ring-2 ring-blue-500/40';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-2xl transition-all flex items-center justify-between gap-4 cursor-pointer ${optionClass}`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                        isAnswerSubmitted && isCorrect
                          ? 'bg-emerald-600 text-white'
                          : isAnswerSubmitted && isSelected && !isCorrect
                          ? 'bg-rose-600 text-white'
                          : isSelected
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-sm sm:text-base font-semibold leading-relaxed text-slate-900 dark:text-white">
                      {option}
                    </span>
                  </div>

                  <div className="shrink-0 flex items-center">
                    {isAnswerSubmitted && isCorrect && (
                      <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-xs bg-emerald-100 dark:bg-emerald-900/60 px-2 py-1 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>Correct</span>
                      </div>
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <div className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold text-xs bg-rose-100 dark:bg-rose-900/60 px-2 py-1 rounded-lg">
                        <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                        <span>Incorrect</span>
                      </div>
                    )}
                    {!isAnswerSubmitted && (
                      <div
                        className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                          isSelected
                            ? 'border-blue-600 bg-blue-600'
                            : 'border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation if submitted */}
          {isAnswerSubmitted && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-6 text-xs text-slate-700 dark:text-slate-300 leading-relaxed animate-in fade-in">
              <strong className="block text-slate-900 dark:text-white font-bold mb-1">
                Legal Basis & Supreme Court / Statutory Guideline:
              </strong>
              <span>
                {language === 'hi' ? question.explanationHi : question.explanationEn}
              </span>
            </div>
          )}

          {/* Action Button */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() =>
                onAskAI(
                  `Mujhe is question ke legal aspect ko aur detail mein samjhaiye: "${question.questionEn}"`
                )
              }
              className="text-xs text-blue-600 dark:text-teal-400 font-semibold hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask PARTH AI about this law</span>
            </button>

            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  selectedOption !== null
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
              >
                <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Final Score'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Completed Certificate Screen */
        <div className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Quiz Completed
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-serif mt-1">
              Your Legal Awareness Score: {score} / {QUIZ_QUESTIONS.length}
            </h3>
            <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto">
              {score >= 4
                ? 'Outstanding! You possess an excellent grasp of citizen rights and Indian legal safeguards.'
                : 'Good effort! Understanding your legal rights protects you and your family in times of crisis.'}
            </p>
          </div>

          {/* Certificate Badge */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900 to-slate-900 text-white max-w-lg mx-auto shadow-md border border-blue-800/80">
            <div className="flex items-center justify-between text-xs text-blue-200 mb-3 border-b border-blue-800 pb-2">
              <span>CERTIFICATE OF CIVIC PARTICIPATION</span>
              <span>PARTH AI</span>
            </div>
            <h4 className="text-lg font-bold font-serif text-amber-300">
              Informed Citizen Award
            </h4>
            <p className="text-xs text-blue-100 mt-2 leading-relaxed">
              Awarded for active engagement in learning Indian Constitutional Rights, Cybercrime Reporting (1930), and Statutory Citizen Safeguards.
            </p>
            <div className="mt-4 pt-3 border-t border-blue-800/60 flex items-center justify-between text-[10px] text-blue-300">
              <span>Rajkiya Engineering College, Banda</span>
              <span>Team PARTH</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Quiz</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
