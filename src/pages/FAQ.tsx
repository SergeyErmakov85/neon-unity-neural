import { useState, useMemo } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  Search,
  HelpCircle,
  Settings,
  CreditCard,
  Award,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQGroup {
  title: string;
  icon: React.ElementType;
  items: FAQItem[];
}

const faqGroups: FAQGroup[] = [
  {
    title: "Общие вопросы",
    icon: HelpCircle,
    items: [
      {
        question: "Что такое обучение с подкреплением и зачем оно в играх?",
        answer:
          "Обучение с подкреплением (Reinforcement Learning, RL) — это область машинного обучения, в которой агент учится принимать решения, взаимодействуя со средой и получая награды за правильные действия. В играх RL позволяет создавать интеллектуальных NPC, адаптивную сложность, автоматическое тестирование уровней и даже генерацию контента. Игры — идеальная песочница для RL, так как предоставляют контролируемую среду с чёткими правилами и метриками.",
      },
      {
        question: "Нужен ли мощный GPU для прохождения курса?",
        answer:
          "Для большинства уроков и проектов достаточно обычного компьютера с 8 ГБ RAM. Некоторые продвинутые проекты (Deep RL, SAC) выиграют от наличия GPU, но это не обязательно — мы показываем, как использовать Google Colab для ресурсоёмких задач бесплатно. Базовые алгоритмы (Q-Learning, табличные методы) работают даже на слабых ноутбуках.",
      },
      {
        question: "На каком языке программирования ведётся обучение?",
        answer:
          "Основной язык — Python с библиотеками PyTorch и NumPy. Для интеграции с Unity используется C# (мы предоставляем готовые шаблоны). Весь код подробно комментирован, и вам не нужно быть экспертом ни в одном из языков — мы объясняем каждую строку.",
      },
      {
        question: "Подходит ли курс для абсолютных новичков в ML?",
        answer:
          "Да! Курс начинается с нуля. Модуль 1 не требует знания ML — мы объясняем базовые концепции через интерактивные визуализации. Вам нужны только базовые навыки программирования на Python (переменные, циклы, функции). Математику RL мы разбираем отдельно с пошаговыми объяснениями.",
      },
      {
        question: "Сколько времени нужно на прохождение всего курса?",
        answer:
          "Полный курс из 3 модулей рассчитан на 8–12 недель при занятиях 5–7 часов в неделю. Модуль 1 (основы) можно пройти за 2–3 недели, Модуль 2 (Deep RL) за 3–4 недели, Модуль 3 (Unity) за 3–5 недель. Вы можете учиться в своём темпе — доступ к материалам не ограничен по времени.",
      },
    ],
  },
  {
    title: "Техническое",
    icon: Settings,
    items: [
      {
        question: "Какие версии Unity и Python поддерживаются?",
        answer:
          "Курс поддерживает Unity 2021.3 LTS и выше (рекомендуем 2022.3 LTS), Python 3.8–3.11, ML-Agents Toolkit 2.0+, PyTorch 1.13+. Мы обновляем материалы при выходе новых версий. В каждом уроке указаны точные версии, проверенные на совместимость.",
      },
      {
        question: "Можно ли использовать курс без Unity (только PyTorch)?",
        answer:
          "Да, модули 1 и 2 полностью независимы от Unity. Вы изучите RL-алгоритмы в чистом PyTorch с OpenAI Gym / Gymnasium. Модуль 3 посвящён Unity ML-Agents, но навыки из модулей 1–2 универсальны и применимы в любых RL-задачах (робототехника, финансы, NLP).",
      },
      {
        question: "Как запустить обучение на Google Colab?",
        answer:
          "Мы предоставляем готовые Colab-ноутбуки для каждого урока. Откройте ссылку → нажмите «Копировать в Диск» → запускайте ячейки. Для GPU: Runtime → Change runtime type → GPU. Бесплатного тарифа Colab достаточно для всех проектов курса (обучение занимает 10–30 минут вместо часов на CPU).",
      },
      {
        question: "Поддерживается ли Mac / Linux?",
        answer:
          "Полностью! Python и PyTorch работают на всех ОС. Unity ML-Agents поддерживает Windows, macOS (включая M1/M2 через Rosetta 2 и нативно) и Linux. Colab-ноутбуки работают в любом браузере. Мы тестируем все инструкции на Windows 11, macOS Sonoma и Ubuntu 22.04.",
      },
    ],
  },
  {
    title: "Оплата и доступ",
    icon: CreditCard,
    items: [
      {
        question: "Как работает бесплатный план?",
        answer:
          "Бесплатный план (Starter) включает полный доступ к Модулю 1 (5 уроков + проект), базовые визуализации Q-Learning, 2 блог-статьи в месяц и доступ к сообществу. Этого достаточно, чтобы понять основы RL и решить, подходит ли вам продвинутый курс. Кредитная карта не требуется.",
      },
      {
        question: "Можно ли отменить PRO-подписку?",
        answer:
          "Да, подписку можно отменить в любой момент из личного кабинета. После отмены доступ сохраняется до конца оплаченного периода. Мы не взимаем штрафов за отмену. Все ваши заметки, прогресс и сертификаты сохраняются даже после возврата на бесплатный план.",
      },
      {
        question: "Есть ли скидки для студентов?",
        answer:
          "Да! Мы предоставляем скидку 50% для студентов и преподавателей с действующей студенческой почтой (.edu, университетские домены). Также доступны скидки для участников open-source проектов и некоммерческих организаций. Напишите нам на support@rlplatform.ru с подтверждением.",
      },
      {
        question: "Как получить корпоративный доступ?",
        answer:
          "Корпоративный план (Enterprise) включает неограниченные лицензии для команды, приоритетную поддержку, кастомные проекты под ваш домен и ежемесячные консультации. Стоимость рассчитывается индивидуально. Свяжитесь с нами через форму на странице тарифов или на enterprise@rlplatform.ru.",
      },
    ],
  },
  {
    title: "Сертификация",
    icon: Award,
    items: [
      {
        question: "Как получить сертификат?",
        answer:
          "Сертификат выдаётся автоматически после завершения всех 3 модулей и финального проекта. Для каждого модуля нужно: пройти все уроки, выполнить практические задания, сдать проектную работу с оценкой ≥70%. Сертификат генерируется в PDF с уникальным ID для верификации.",
      },
      {
        question: "Признаётся ли сертификат работодателями?",
        answer:
          "Наш сертификат подтверждает практические навыки в RL и включает ссылку на ваш финальный проект. Хотя он не является государственным документом об образовании, работодатели в GameDev и ML ценят портфолио проектов. Мы сотрудничаем с игровыми студиями и ML-компаниями, которые учитывают наш сертификат при найме.",
      },
      {
        question: "Можно ли добавить сертификат в LinkedIn?",
        answer:
          "Да! После получения сертификата вы увидите кнопку «Добавить в LinkedIn», которая автоматически заполнит все поля: название курса, организация, дата выдачи, ID сертификата и ссылка для верификации. Сертификат также можно добавить на GitHub, в резюме или на личный сайт.",
      },
    ],
  },
];

const FAQ = () => {
  const [search, setSearch] = useState("");

  const filteredGroups = useMemo(() => {
    if (!search.trim()) return faqGroups;
    const q = search.toLowerCase();
    return faqGroups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q)
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [search]);

  const totalQuestions = faqGroups.reduce((s, g) => s + g.items.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-28 pb-20">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            На главную
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              Частые вопросы
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">
            {totalQuestions} ответов на популярные вопросы о платформе
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto mt-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по вопросам..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-card/50 border-border/50 focus:border-primary/50"
            />
          </div>
        </div>

        {/* FAQ Groups */}
        <div className="max-w-3xl mx-auto space-y-8">
          {filteredGroups.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Ничего не найдено. Попробуйте другой запрос.</p>
            </div>
          )}

          {filteredGroups.map((group) => {
            const Icon = group.icon;
            return (
              <section key={group.title} className="space-y-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {group.title}
                  </h2>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {group.items.length}
                  </span>
                </div>

                <Accordion type="single" collapsible className="space-y-2">
                  {group.items.map((item, idx) => (
                    <AccordionItem
                      key={idx}
                      value={`${group.title}-${idx}`}
                      className="border border-border/50 rounded-lg px-4 bg-card/30 hover:bg-card/60 transition-colors data-[state=open]:border-primary/40 data-[state=open]:shadow-[0_0_15px_-5px_hsl(var(--primary)/0.3)]"
                    >
                      <AccordionTrigger className="hover:no-underline text-left text-foreground">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            );
          })}
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto mt-16 text-center space-y-4 p-8 rounded-2xl border border-border/50 bg-card/30">
          <p className="text-muted-foreground">Не нашли ответ на свой вопрос?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="outline" asChild>
              <Link to="/community">Спросить в сообществе</Link>
            </Button>
            <Button className="bg-gradient-neon hover:shadow-glow-cyan" asChild>
              <Link to="/courses">Начать обучение</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FAQ;
