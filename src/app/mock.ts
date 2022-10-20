import { question, subject } from "./interfaces"

export const question_list: question[] = [
 
    {id:'1',
    name: 'Векторная и растровая графика.',
    aouthor: [],
    date_create: new Date('2022-10-16'),
    answer: 'https://tasty-marmot-f44.notion.site/1-943debacd4ca437484594e729451302f'
    //answer: 'План ответа: - Растр. Виды. Растровые изображения. Характеристики. Преимущества. Недостатки.  - Векторные изображения. Преимущества. Недосттатки. - Аппаратные средства ввода, вывода. Растровые и векторные. Работа фотоаппарата, дисплея'
    },
    {id:'2',
    name: 'Цвет. Цветовые модели.',
    aouthor: [],
    date_create: new Date('2022-10-16'),
    answer: 'План ответа: - Видимый спектр. Цвет. Восприятие человеком. Колбочки и палочки. - Визуальные явления. Чувствительность к контрасту. Восприятние цвета. («Полосы Маха», Иллюзия Морон-Бур-Росса, фон-контур, глубина, перспектива, иллюзия Панцо) - Машинное представление цвета. (Квантовый спектр. RGB модель. МКО. SRGB. CMY. CMYK. Цветовая система Манселла. HSV. HSL. LAB)'
    },
    {id:'3',
    name: 'Обработка изображений: геометрические преобразования, фильтрация изображений',
    aouthor: [],
    date_create: new Date('2022-10-17'),
    answer: 'План ответа: - Преобразования сдвига (xor) - Преобразования масштабирования, поворота (идея - сопоставление пикселям итогового изображения пикселей исходного) - Проблемы яркости (Гистограмма, линейное растяжение, не линейные преобразования: гамма коррекция, логарифмическая коррекция) - Проблема ББ (идеальный отражатель, коррекция с опорным цветом, серый мир, растяжение контрастности) - Проблема резкости/размытия - двумерная свертка (размытие, увел. резкости, тиснение, акварельный эффект, подчеркивание краев (Роббертс, Прюитт, Собель, детектор Canny)), фильтрация в частотной области'
    },
  ]
  
export const subject_list: subject[] = [
    {id: '1',
      name: 'компьютерная графика',
      question_List: question_list
    },
    {id: '2',
      name: 'матан',
      question_List: []
    },
    
    ]
    