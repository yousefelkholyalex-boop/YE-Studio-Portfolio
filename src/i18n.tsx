import {createContext,useContext,useEffect,useState,ReactNode} from 'react';
export type L='en'|'ar';
const d:Record<L,Record<string,string>>={en:{
home:'Home',portfolio:'Portfolio',about:'About',services:'Services',contact:'Contact',start:'Start a Project',explore:'Explore Projects',tagline:'Your Idea. Our Design.',
intro:'An Egypt-based creative studio crafting brands, campaigns and publications for local and international clients.',featured:'Featured Projects',all:'All',viewall:'View all projects',
cat_social:'Social Media Design',cat_branding:'Branding & Visual Identity',cat_print:'Print Design',cat_books:'Books & Cover Design',cat_profiles:'Company Profiles',
sd_social:'Cohesive feeds, campaigns and templates built for engagement.',sd_branding:'Logos and complete identity systems with clear guidelines.',sd_print:'Brochures, stationery and collateral made to be held.',sd_books:'Covers and interiors that give stories a visual voice.',sd_profiles:'Corporate profiles that present your business with authority.',
si_social:'Post & story design|Campaign concepts|Reusable templates|Content calendars visuals',si_branding:'Logo design|Colour & type system|Brand guidelines|Stationery',si_print:'Brochures & flyers|Posters|Packaging graphics|Print-ready files',si_books:'Cover design|Interior layout|Typesetting|Print preparation',si_profiles:'Layout & structure|Infographics|Branded imagery|Print & digital versions',
aboutShort:'YE Studio turns ideas into designs that leave a mark. We work closely with each client to build visual work that is clear, considered and lasting.',more:'Learn more',
philosophy:'Creative Philosophy',philo:'Good design is clarity with character. We strip away the unnecessary so the idea can speak.',approach:'Working Approach',
a1:'Listen|We start with your goals and audience.',a2:'Concept|We explore directions and refine the strongest.',a3:'Craft|We design with precision and detail.',a4:'Deliver|Final files, ready for print and screen.',
aboutTitle:'A studio built around ideas',aboutText:'YE Studio is a graphic design studio based in Egypt, serving clients locally and internationally across branding, social media, print, books and company profiles.',
servTitle:'What we do',inc:'Included',talk:'Discuss this service',
contactTitle:'Start a Project',contactText:'Tell us about your idea. We will reply as soon as possible.',
name:'Full name',email:'Email',wa:'WhatsApp number',company:'Company or brand (optional)',service:'Required service',desc:'Project description',budget:'Estimated budget (EGP)',deadline:'Expected deadline',send:'Send inquiry',select:'Select…',
waDirect:'Chat on WhatsApp',formNote:'Backend not connected yet: submitting opens WhatsApp with your details.',sent:'Thank you! Your inquiry was sent.',
client:'Client',category:'Category',overview:'Overview',objectives:'Design Objectives',gallery:'Showcase',back:'Back to portfolio',prev:'Previous',next:'Next',
placeholder:'Placeholder client',sample:'Sample concept — not real client work.',rights:'All rights reserved.',notfound:'Page not found',lang:'العربية',menu:'Menu',ar_tag:'نحوّل الأفكار إلى تصاميم تترك أثرًا.'},
ar:{home:'الرئيسية',portfolio:'الأعمال',about:'من نحن',services:'الخدمات',contact:'تواصل',start:'ابدأ مشروعك',explore:'استكشف الأعمال',tagline:'فكرتك. تصميمنا.',
intro:'استوديو إبداعي في مصر يصمم العلامات والحملات والمطبوعات لعملاء محليين ودوليين.',featured:'أعمال مختارة',all:'الكل',viewall:'عرض كل الأعمال',
cat_social:'تصميم السوشيال ميديا',cat_branding:'العلامة التجارية والهوية البصرية',cat_print:'التصميم المطبوع',cat_books:'الكتب وتصميم الأغلفة',cat_profiles:'ملفات الشركات',
sd_social:'صفحات متناسقة وحملات وقوالب مصممة للتفاعل.',sd_branding:'شعارات وأنظمة هوية متكاملة مع إرشادات واضحة.',sd_print:'بروشورات وقرطاسية ومطبوعات تُلمَس وتُلهم.',sd_books:'أغلفة وتصاميم داخلية تمنح القصص صوتًا بصريًا.',sd_profiles:'ملفات تعريفية تعرض نشاطك بثقة واحترافية.',
si_social:'تصميم منشورات وستوري|أفكار حملات|قوالب قابلة للتكرار|تصاميم تقويم المحتوى',si_branding:'تصميم الشعار|نظام الألوان والخطوط|دليل الهوية|القرطاسية',si_print:'بروشورات وفلايرز|بوسترات|تصاميم التغليف|ملفات جاهزة للطباعة',si_books:'تصميم الغلاف|التصميم الداخلي|التنضيد|التجهيز للطباعة',si_profiles:'التخطيط والهيكلة|إنفوجرافيك|صور بهوية الشركة|نسخ مطبوعة ورقمية',
aboutShort:'يحوّل YE Studio الأفكار إلى تصاميم تترك أثرًا. نعمل عن قرب مع كل عميل لنصنع عملًا بصريًا واضحًا ومدروسًا ودائمًا.',more:'اعرف المزيد',
philosophy:'فلسفتنا الإبداعية',philo:'التصميم الجيد وضوح بشخصية. نحذف غير الضروري لتتحدث الفكرة بنفسها.',approach:'أسلوب العمل',
a1:'الإنصات|نبدأ بأهدافك وجمهورك.',a2:'الفكرة|نستكشف الاتجاهات ونطوّر الأقوى.',a3:'الحرفة|نصمم بدقة واهتمام بالتفاصيل.',a4:'التسليم|ملفات نهائية جاهزة للطباعة والشاشات.',
aboutTitle:'استوديو قائم على الأفكار',aboutText:'YE Studio استوديو تصميم جرافيك في مصر، يخدم عملاء محليين ودوليين في الهوية والسوشيال ميديا والمطبوعات والكتب وملفات الشركات.',
servTitle:'ماذا نقدم',inc:'يشمل',talk:'ناقش هذه الخدمة',
contactTitle:'ابدأ مشروعك',contactText:'أخبرنا عن فكرتك وسنرد في أقرب وقت.',
name:'الاسم الكامل',email:'البريد الإلكتروني',wa:'رقم واتساب',company:'الشركة أو العلامة (اختياري)',service:'الخدمة المطلوبة',desc:'وصف المشروع',budget:'الميزانية التقديرية (جنيه)',deadline:'الموعد المتوقع',send:'إرسال الطلب',select:'اختر…',
waDirect:'تواصل عبر واتساب',formNote:'لم يتم ربط الخادم بعد: الإرسال يفتح واتساب ببياناتك.',sent:'شكرًا! تم إرسال طلبك.',
client:'العميل',category:'التصنيف',overview:'نظرة عامة',objectives:'أهداف التصميم',gallery:'عرض التصميم',back:'العودة للأعمال',prev:'السابق',next:'التالي',
placeholder:'عميل تجريبي',sample:'مفهوم تجريبي — ليس عملًا حقيقيًا لعميل.',rights:'جميع الحقوق محفوظة.',notfound:'الصفحة غير موجودة',lang:'English',menu:'القائمة',ar_tag:'نحوّل الأفكار إلى تصاميم تترك أثرًا.'}};
const C=createContext<{l:L;t:(k:string)=>string;toggle:()=>void}>(null!);
export const useL=()=>useContext(C);
export function LangProvider({children}:{children:ReactNode}){
 const [l,setL]=useState<L>(()=>(localStorage.getItem('l') as L)||'en');
 useEffect(()=>{document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';localStorage.setItem('l',l)},[l]);
 return <C.Provider value={{l,t:k=>d[l][k]??k,toggle:()=>setL(l==='en'?'ar':'en')}}>{children}</C.Provider>}
