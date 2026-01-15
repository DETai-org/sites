import {
  BlogCategoryDefinition,
  BlogKeywordDefinition,
  BlogRubricDefinition,
  Lang,
} from "./types";

export const blogRubrics: BlogRubricDefinition[] = [
  {
    slug: "rubric:shadow-and-light",
    labels: {
      ru: "Тень и Свет",
      en: "Shadow and Light",
      de: "Schatten und Licht",
      fi: "Varjo ja valo",
      cn: "阴影与光",
    },
    description: {
      ru: "Рубрика о взаимодействии противоположностей в человеческом опыте и их интеграции как источнике развития и устойчивости.",
      en: "A rubric about the interaction of opposites in human experience and their integration as a source of growth and resilience.",
      de: "Eine Rubrik über das Zusammenspiel von Gegensätzen in der menschlichen Erfahrung und deren Integration als Quelle von Wachstum und Stabilität.",
      fi: "Rubriikki vastakohtien vuorovaikutuksesta ihmiskokemuksessa ja niiden integraatiosta kasvun ja kestävyyden lähteenä.",
      cn: "关于人类经验中对立面互动及其整合为成长与韧性来源的栏目。",
    },
    definition: {
      postulate: {
        ru: "Человек — существо, живущее между противоположностями, такими как добро и зло, тело и дух, страсти и совесть, созидание и разрушение. Эти полюса не являются дефектами или ошибками; они — важные силы, из взаимодействия которых возникает движение, рост и углубление понимания себя.\n\nЗадача не в том, чтобы устранить противоречия, а в том, чтобы научиться видеть их как взаимодейственные силы. Диалектическое восприятие позволяет удерживать напряжение между полюсами, находить новые смыслы и превращать конфликт в ресурс развития.",
        en: "A person lives between opposites such as good and evil, body and spirit, passion and conscience, creation and destruction. These poles are not defects or mistakes; they are essential forces whose interaction produces movement, growth, and deeper self-understanding.\n\nThe task is not to eliminate contradictions, but to learn to see them as interacting forces. A dialectical perspective helps hold tension between poles, discover new meanings, and turn conflict into a resource for development.",
        de: "Der Mensch lebt zwischen Gegensätzen wie Gut und Böse, Körper und Geist, Leidenschaft und Gewissen, Schöpfung und Zerstörung. Diese Pole sind keine Fehler, sondern wesentliche Kräfte, aus deren Wechselwirkung Bewegung, Wachstum und vertieftes Selbstverständnis entstehen.\n\nDie Aufgabe besteht nicht darin, Widersprüche zu beseitigen, sondern sie als wirkende Kräfte zu begreifen. Eine dialektische Perspektive hilft, die Spannung zwischen Polen zu halten, neue Bedeutungen zu finden und Konflikte in Entwicklungsressourcen zu verwandeln.",
        fi: "Ihminen elää vastakohtien välillä, kuten hyvän ja pahan, kehon ja hengen, intohimon ja omantunnon, luomisen ja tuhon. Nämä navat eivät ole virheitä, vaan olennaisia voimia, joiden vuorovaikutuksesta syntyy liike, kasvu ja syvempi itsetuntemus.\n\nTarkoitus ei ole poistaa ristiriitoja, vaan oppia näkemään ne vaikuttavina voimina. Dialektinen näkökulma auttaa pitämään jännitettä napojen välillä, löytämään uusia merkityksiä ja muuttamaan konfliktin kehityksen resurssiksi.",
        cn: "人是生活在对立之间的存在，例如善与恶、身体与精神、激情与良知、创造与破坏。这些两极并非缺陷或错误，而是重要的力量，它们的互动带来运动、成长与更深的自我理解。\n\n任务不是消除矛盾，而是学会将其视为相互作用的力量。辩证的视角能够承受两极之间的张力，发现新的意义，并把冲突转化为发展的资源。",
      },
    },
  },
  {
    slug: "rubric:personality-types-and-existential-strategies",
    labels: {
      ru: "Типы личности",
      en: "Personality types",
      de: "Persönlichkeitstypen",
      fi: "Persoonallisuustyypit",
      cn: "人格类型",
    },
    description: {
      ru: "Рубрика о спектре форм человеческой экзистенции между устойчивым покоем и избыточным движением, определяющих способы выбора, реакции и стратегий жизни.",
      en: "A rubric about the spectrum of human existence between stable calm and excessive movement, shaping choices, reactions, and life strategies.",
      de: "Eine Rubrik über das Spektrum menschlicher Existenz zwischen stabilem Ruhezustand und übermäßiger Bewegung, das Wahl, Reaktion und Lebensstrategien prägt.",
      fi: "Rubriikki ihmisolemisen spektristä vakaan rauhan ja liiallisen liikkeen välillä, joka muokkaa valintoja, reaktioita ja elämänstrategioita.",
      cn: "关于人类存在在稳定平静与过度动荡之间的谱系，影响选择、反应与生活策略。",
    },
    definition: {
      postulate: {
        ru: "Человеческие типы проявляются как разные формы существования, которые можно расположить на линии от устойчивого покоя до чрезмерного движения, способного приводить к распаду. Эти различия выражаются в том, как человек выбирает пути, удерживает стабильность или стремится к переменам, и как реагирует на внутренние и внешние вызовы.\n\nТип личности не является фиксированной ярлыком; это динамика, отражающая баланс между стремлением к устойчивости и потребностью в изменении, что задает траекторию роста или риска распада.",
        en: "Human types appear as different modes of existence along a line from stable calm to excessive movement that can lead to disintegration. These differences shape how a person chooses paths, maintains stability or seeks change, and responds to inner and outer challenges.\n\nA personality type is not a fixed label but a dynamic balance between the need for stability and the drive for change, defining trajectories of growth or risk.",
        de: "Menschliche Typen zeigen sich als verschiedene Existenzformen auf einer Linie vom stabilen Ruhepunkt bis zur übermäßigen Bewegung, die zu Auflösung führen kann. Diese Unterschiede prägen, wie Menschen Wege wählen, Stabilität halten oder Veränderung suchen und auf innere sowie äußere Herausforderungen reagieren.\n\nEin Persönlichkeitstyp ist kein festes Etikett, sondern eine Dynamik, die das Gleichgewicht zwischen Stabilitätsstreben und Veränderungsbedarf widerspiegelt und Wachstum oder Risiko bestimmt.",
        fi: "Ihmistyypit ilmenevät erilaisina olemisen muotoina vakaasta rauhasta liialliseen liikkeeseen, joka voi johtaa hajoamiseen. Erot näkyvät siinä, miten ihminen valitsee polkuja, ylläpitää vakautta tai etsii muutosta ja reagoi sisäisiin ja ulkoisiin haasteisiin.\n\nPersoonallisuustyyppi ei ole pysyvä leima, vaan dynamiikka, joka heijastaa tasapainoa vakauden tarpeen ja muutoksen halun välillä, määrittäen kasvun tai riskin suunnan.",
        cn: "人格类型体现为不同的存在方式，分布在从稳定平静到可能导致瓦解的过度动荡之间。这些差异决定了人如何选择道路、维持稳定或寻求变化，以及如何回应内外挑战。\n\n人格类型不是固定标签，而是一种动态平衡，反映了对稳定的需求与对变化的渴望之间的关系，从而决定成长或风险的轨迹。",
      },
    },
  },
  {
    slug: "rubric:orientation-toward-overcoming",
    labels: {
      ru: "Установка на преодоление",
      en: "Orientation toward overcoming",
      de: "Ausrichtung auf Überwindung",
      fi: "Suuntautuminen ylittämiseen",
      cn: "面向超越",
    },
    description: {
      ru: "Рубрика о восприятии напряжения и трудностей как необходимого материала личностного развития и источника внутренней трансформации.",
      en: "A rubric about viewing tension and difficulties as essential material for personal development and inner transformation.",
      de: "Eine Rubrik über das Verständnis von Spannung und Schwierigkeiten als notwendiges Material für persönliche Entwicklung und innere Transformation.",
      fi: "Rubriikki jännitteen ja vaikeuksien näkemisestä henkilökohtaisen kehityksen ja sisäisen muutoksen välttämättömänä materiaalina.",
      cn: "关于将紧张与困难视为个人成长与内在转化必需材料的栏目。",
    },
    definition: {
      postulate: {
        ru: "Установка на преодоление описывает способность видеть в напряжении и трудностях не случайные сбои, а неотъемлемые элементы развития. Кризисы и противоречия выступают не только препятствиями, но и стимулами, активирующими внутренние механизмы преобразования.\n\nСмысл не в отрицании боли или сложности, а в том, чтобы преобразовать их в ресурс роста, удерживая перспективу развития даже в условиях давления и неопределенности.",
        en: "Orientation toward overcoming describes the ability to see tension and difficulties not as accidental failures but as integral elements of development. Crises and contradictions serve not only as obstacles but also as stimuli that activate inner mechanisms of transformation.\n\nThe point is not to deny pain or complexity but to turn them into a resource for growth, holding a developmental perspective even under pressure and uncertainty.",
        de: "Die Ausrichtung auf Überwindung beschreibt die Fähigkeit, Spannung und Schwierigkeiten nicht als zufällige Störungen, sondern als integrale Elemente der Entwicklung zu sehen. Krisen und Widersprüche sind nicht nur Hindernisse, sondern auch Impulse, die innere Transformationsmechanismen aktivieren.\n\nEs geht nicht darum, Schmerz oder Komplexität zu leugnen, sondern sie in eine Wachstumsressource zu verwandeln und die Entwicklungsperspektive auch unter Druck und Unsicherheit zu halten.",
        fi: "Suuntautuminen ylittämiseen kuvaa kykyä nähdä jännite ja vaikeudet ei satunnaisina häiriöinä vaan kehityksen olennaisina osina. Kriisit ja ristiriidat eivät ole vain esteitä, vaan myös ärsykkeitä, jotka aktivoivat sisäisiä muutosmekanismeja.\n\nTarkoitus ei ole kieltää kipua tai monimutkaisuutta, vaan muuntaa ne kasvun resurssiksi ja säilyttää kehitysnäkökulma myös paineen ja epävarmuuden keskellä.",
        cn: "“面向超越”的取向强调：紧张与困难并非偶发的故障，而是发展不可分割的组成部分。危机与矛盾不仅是阻碍，也会激活内在的转化机制。\n\n关键不在于否认痛苦或复杂性，而是把它们转化为成长资源，并在压力与不确定中保持发展视角。",
      },
    },
  },
];

export const blogCategories: BlogCategoryDefinition[] = [
  {
    slug: "category:overcoming",
    labels: {
      ru: "Преодоление",
      en: "Overcoming",
      de: "Überwindung",
      fi: "Ylittäminen",
      cn: "超越",
    },
    description: {
      ru: "Категория о практиках и историях преодоления трудностей и внутренних барьеров.",
      en: "A category about practices and stories of overcoming difficulties and inner barriers.",
      de: "Eine Kategorie über Praktiken und Geschichten des Überwindens von Schwierigkeiten und inneren Barrieren.",
      fi: "Kategoria käytännöistä ja tarinoista, joissa vaikeuksia ja sisäisiä esteitä ylitetään.",
      cn: "关于克服困难与内在阻碍的实践与故事的分类。",
    },
  },
];

export const blogKeywords: BlogKeywordDefinition[] = [
  {
    slug: "keyword:existential-choice",
    labels: {
      ru: "Экзистенциальный выбор",
      en: "Existential choice",
      de: "Existentielle Wahl",
      fi: "Eksistentiaalinen valinta",
      cn: "存在性的选择",
    },
  },
];

export function getTaxonomyLabel(
  definitions: Array<BlogRubricDefinition | BlogCategoryDefinition | BlogKeywordDefinition>,
  slug: string,
  lang: Lang
): string {
  const entry = definitions.find((item) => item.slug === slug);
  return entry?.labels[lang] ?? entry?.labels.ru ?? slug;
}

// TODO: Добавить остальные категории после того, как будут утверждены единые описания на одном языке,
// а затем переводы для всех языков.
