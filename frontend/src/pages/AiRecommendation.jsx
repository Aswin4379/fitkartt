import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Flame, Dumbbell, Salad, Wheat, Droplet, Check, ArrowRight, ShieldCheck } from 'lucide-react'
import AppLayout from '../components/AppLayout.jsx'
import PageHeader from '../components/PageHeader.jsx'
import ProductCard from '../components/ProductCard.jsx'
import FoodNutritionSearch from '../components/FoodNutritionSearch.jsx'
import { useProducts } from '../context/ProductContext.jsx'
import { useUser } from '../context/UserContext.jsx'

const goals = [
  { id: 'Weight Loss', category: 'weight-loss', desc: 'Caloric deficit with high protein retention' },
  { id: 'Weight Gain', category: 'weight-gain', desc: 'Clean caloric surplus for maximum hypertrophy' },
  { id: 'Fitness Maintenance', category: 'fitness-maintenance', desc: 'Sustained energy and metabolic wellness' },
]

export default function AiRecommendation() {
  const { user, updateUser } = useUser()
  const { products } = useProducts()
  const [form, setForm] = useState({
    age: String(user?.age || 24),
    weight: String(user?.currentWeight || 70),
    height: String(user?.height || 175),
    gender: user?.gender || 'male',
    goal: user?.goal || 'Weight Loss'
  })
  const [result, setResult] = useState(null)
  const [aiPlan, setAiPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [quickEvalResult, setQuickEvalResult] = useState(null)

  // Auto-compute baseline results on mount or when user profile updates
  useEffect(() => {
    if (user) {
      const userAge = Number(user.age) || 24
      const userWeight = Number(user.currentWeight) || 70
      const userHeight = Number(user.height) || 175
      const userGender = user.gender || 'male'
      const userGoal = user.goal || 'Weight Loss'
      const userAct = user.activityLevel || 'moderate'

      setForm({
        age: String(userAge),
        weight: String(userWeight),
        height: String(userHeight),
        gender: userGender,
        goal: userGoal
      })
    }
  }, [user?._id, user?.id, user?.goal, user?.currentWeight])

  // Debounced Quick Eval when profile inputs change
  useEffect(() => {
    const age = Number(form.age)
    const weight = Number(form.weight)
    const height = Number(form.height)
    if (!age || !weight || !height) return

    setIsEvaluating(true)
    const handler = setTimeout(async () => {
      try {
        const res = await fetch('http://localhost:5000/api/ai/quick-eval', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ age, weight, height, gender: form.gender })
        })
        if (res.ok) {
          const data = await res.json()
          setQuickEvalResult(data)
          if (data.recommendedGoal) {
            setForm(prev => ({ ...prev, goal: data.recommendedGoal }))
          }
        } else {
          setQuickEvalResult(null)
        }
      } catch (err) {
        setQuickEvalResult(null)
      } finally {
        setIsEvaluating(false)
      }
    }, 800)

    return () => clearTimeout(handler)
  }, [form.age, form.weight, form.height, form.gender])

  const compute = async (e) => {
    e.preventDefault()
    setLoading(true)
    const age = Number(form.age) || 24
    const weight = Number(form.weight) || 70
    const height = Number(form.height) || 175

    try {
      const res = await fetch('http://localhost:5000/api/ai/diet-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age,
          weight,
          height,
          gender: form.gender,
          goal: form.goal,
          activityLevel: user?.activityLevel || 'moderate'
        })
      });
      if (res.ok) {
        const planData = await res.json();
        setAiPlan(planData);
        setResult({
          calories: planData.dailyCalories,
          protein: planData.dailyProtein,
          fat: planData.dailyFat || Math.round((planData.dailyCalories * 0.25) / 9),
          carbs: planData.dailyCarbs || Math.round((planData.dailyCalories - (planData.dailyProtein * 4 + Math.round((planData.dailyCalories * 0.25) / 9) * 9)) / 4),
          bmi: planData.bmi,
          bmiCategory: planData.bmiCategory,
          goal: form.goal,
          recommendedGoal: planData.recommendedGoal,
          reason: planData.reason
        });
      } else {
        setAiPlan(null);
        setResult(null);
      }
    } catch (err) {
      console.error(err);
      setAiPlan(null);
      setResult(null);
    }
    
    if (updateUser) {
      await updateUser({
        goal: form.goal,
        age,
        currentWeight: weight,
        height,
        gender: form.gender
      }).catch(() => {})
    }
    setLoading(false)
  }

  const goalCategory = goals.find((g) => g.id === result?.goal)?.category
  const recommended = goalCategory ? products.filter((p) => p.category === goalCategory).slice(0, 4) : []

  return (
    <AppLayout showFooter>
      <PageHeader
        title="AI Diet & Macro Engine"
        subtitle="Clinical BMR & macro targets computed in seconds"
      />

      <main className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-8 space-y-8">
        
        {/* Intro banner */}
        <div className="card p-5 bg-gradient-to-r from-fit-primary/15 via-fit-surface to-fit-surface2 border-fit-primary/30 flex items-start gap-4 shadow-card">
          <div className="w-10 h-10 rounded-xl bg-fit-primary/20 border border-fit-primary/40 flex items-center justify-center shrink-0">
            <Sparkles size={20} className="text-fit-primary animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-fit-text">Precision Metabolism Analysis</h2>
            <p className="text-xs text-fit-muted mt-0.5 leading-relaxed">
              Our clinical Mifflin-St Jeor formula calculates your daily caloric burn, target protein, and ideal nutrition stack calibrated for your goals.
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={compute} className="card p-6 border-fit-border bg-fit-surface shadow-card space-y-5">
          <h3 className="text-sm font-black uppercase tracking-wider text-fit-text">Your Body Profile</h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div>
              <label className="text-[11px] font-bold text-fit-muted uppercase block mb-1">Age (Years)</label>
              <input
                required
                type="number"
                min="12"
                max="100"
                placeholder="24"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                className="input-field text-xs"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-fit-muted uppercase block mb-1">Gender</label>
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="input-field text-xs"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-fit-muted uppercase block mb-1">Body Weight (kg)</label>
              <input
                required
                type="number"
                min="20"
                max="250"
                placeholder="70"
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
                className="input-field text-xs"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-fit-muted uppercase block mb-1">Height (cm)</label>
              <input
                required
                type="number"
                min="100"
                max="250"
                placeholder="175"
                value={form.height}
                onChange={(e) => setForm({ ...form, height: e.target.value })}
                className="input-field text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-fit-muted uppercase flex items-center justify-between mb-2">
              <span>Primary Fitness Target</span>
              {isEvaluating && (
                <span className="text-fit-primary flex items-center gap-1 animate-pulse">
                  <Sparkles size={12} /> Analyzing Profile...
                </span>
              )}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {goals.map((g) => {
                const isSelected = form.goal === g.id
                const isAiRecommended = quickEvalResult?.recommendedGoal === g.id

                return (
                  <button
                    type="button"
                    key={g.id}
                    onClick={() => setForm({ ...form, goal: g.id })}
                    className={`relative p-3.5 rounded-2xl border-2 text-left transition-all duration-300 ${
                      isAiRecommended
                        ? isSelected
                          ? 'border-fit-primary bg-fit-primary/20 text-fit-primary shadow-glow'
                          : 'border-fit-primary/50 bg-fit-primary/10 text-fit-text shadow-glow animate-pulse-slow'
                        : isSelected
                        ? 'border-fit-primary bg-fit-primary/10 text-fit-primary shadow-glow'
                        : 'border-fit-border bg-fit-surface2/50 text-fit-muted hover:border-fit-primary/40'
                    }`}
                  >
                    {isAiRecommended && (
                      <span className="absolute -top-2.5 right-2 bg-fit-primary text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-glow">
                        AI Recommended
                      </span>
                    )}
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-fit-text">{g.id}</span>
                      {isSelected && <Check size={14} className="text-fit-primary stroke-[3]" />}
                    </div>
                    <p className="text-[10px] text-fit-muted leading-relaxed">{g.desc}</p>
                  </button>
                )
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3.5 text-sm font-bold shadow-glow"
          >
            {loading ? 'AI is crafting your plan (takes ~3s)...' : 'Generate My Clinical Diet Plan'}
          </button>
        </form>

        {/* Results Presentation */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* AI Recommendation Banner */}
              {result.recommendedGoal && (
                <div className="card p-4 bg-fit-primary/10 border-fit-primary/30 flex items-start gap-4">
                  <div className="p-3 bg-fit-primary/20 rounded-full shrink-0">
                    <Sparkles className="text-fit-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-fit-text font-bold text-sm mb-1 flex items-center gap-2">
                      Groq AI Clinical Assessment
                    </h3>
                    <p className="text-xs text-fit-muted leading-relaxed mb-2">
                      <strong className="text-fit-text">BMI:</strong> {result.bmi} ({result.bmiCategory})
                    </p>
                    <p className="text-xs text-fit-muted leading-relaxed mb-1">
                      <strong className="text-fit-text">Recommended Goal:</strong> <span className="text-fit-primary font-bold">{result.recommendedGoal}</span>
                    </p>
                    <p className="text-xs text-fit-muted leading-relaxed italic">
                      "{result.reason}"
                    </p>
                  </div>
                </div>
              )}

              {/* Core Targets Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div className="card p-4 bg-fit-surface border-fit-border text-center">
                  <Flame size={20} className="text-orange-400 mx-auto mb-1.5" />
                  <p className="text-2xl font-black text-fit-text font-mono">{result.calories}</p>
                  <p className="text-[11px] text-fit-muted font-semibold">Calories / Day</p>
                </div>

                <div className="card p-4 bg-fit-surface border-fit-border text-center">
                  <Dumbbell size={20} className="text-fit-primary mx-auto mb-1.5" />
                  <p className="text-2xl font-black text-fit-primary font-mono">{result.protein}g</p>
                  <p className="text-[11px] text-fit-muted font-semibold">Target Protein</p>
                </div>

                <div className="card p-4 bg-fit-surface border-fit-border text-center">
                  <Wheat size={20} className="text-yellow-400 mx-auto mb-1.5" />
                  <p className="text-2xl font-black text-fit-text font-mono">{result.carbs}g</p>
                  <p className="text-[11px] text-fit-muted font-semibold">Carbohydrates</p>
                </div>

                <div className="card p-4 bg-fit-surface border-fit-border text-center">
                  <Droplet size={20} className="text-blue-400 mx-auto mb-1.5" />
                  <p className="text-2xl font-black text-fit-text font-mono">{result.fat}g</p>
                  <p className="text-[11px] text-fit-muted font-semibold">Healthy Fats</p>
                </div>
              </div>

              {/* Meal Structure Template */}
              <div className="card p-5 border-fit-border bg-fit-surface shadow-card space-y-3">
                <h3 className="text-sm font-bold text-fit-text flex items-center gap-2">
                  <Salad size={16} className="text-fit-primary" />
                  <span>AI Generated Meal Plan ({result.recommendedGoal || result.goal})</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-fit-surface2/60 border border-fit-border">
                    <span className="font-bold text-fit-primary block">Breakfast</span>
                    <p className="text-fit-muted mt-1">{aiPlan?.Breakfast || aiPlan?.breakfast || aiPlan?.mealPlan?.Breakfast || aiPlan?.mealPlan?.breakfast || 'Oats with whey protein, chia seeds, and 1 whole egg omelette.'}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-fit-surface2/60 border border-fit-border">
                    <span className="font-bold text-fit-primary block">Lunch</span>
                    <p className="text-fit-muted mt-1">{aiPlan?.Lunch || aiPlan?.lunch || aiPlan?.mealPlan?.Lunch || aiPlan?.mealPlan?.lunch || 'Brown rice or whole wheat roti with paneer/chicken and salad bowl.'}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-fit-surface2/60 border border-fit-border">
                    <span className="font-bold text-fit-primary block">Pre/Post Workout</span>
                    <p className="text-fit-muted mt-1">{aiPlan?.PrePostWorkout || aiPlan?.prePostWorkout || aiPlan?.mealPlan?.PrePostWorkout || aiPlan?.mealPlan?.prePostWorkout || '1 banana with peanut butter before workout, 1 scoop whey after.'}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-fit-surface2/60 border border-fit-border">
                    <span className="font-bold text-fit-primary block">Dinner</span>
                    <p className="text-fit-muted mt-1">{aiPlan?.Dinner || aiPlan?.dinner || aiPlan?.mealPlan?.Dinner || aiPlan?.mealPlan?.dinner || 'Grilled vegetables, tofu/fish/egg curry, light soups.'}</p>
                  </div>
                </div>
              </div>

              {/* USDA Nutrition Live Lookup */}
              <div className="card p-5 border-fit-border bg-fit-surface shadow-card">
                <FoodNutritionSearch />
              </div>

              {/* Curated Product Stack */}
              {recommended.length > 0 && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="section-eyebrow">Personalized for {result.goal}</span>
                      <h2 className="section-title">Recommended Supplement Stack</h2>
                    </div>
                  </div>

                  <div className="product-grid">
                    {recommended.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </AppLayout>
  )
}
