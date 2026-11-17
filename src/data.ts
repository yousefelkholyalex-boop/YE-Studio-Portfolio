// EDIT HERE: contact info + projects. Images: put files in public/images/projects/<slug>/cover.jpg, 1.jpg, 2.jpg, 3.jpg (auto-detected).
export const WHATSAPP = '201000000000';          // TODO: real number, international format, no +
export const EMAIL = 'hello@yestudio.example';   // TODO
export const FORM_ENDPOINT = '';                 // TODO: Formspree/Netlify Forms URL. Empty = form falls back to WhatsApp.
export const cats = ['social','branding','print','books','profiles'] as const;
export type Cat = typeof cats[number];
export interface Project{slug:string;cat:Cat;year:string;en:[string,string,string];ar:[string,string,string]}
// [title, short description, objective]
export const projects: Project[] = [
 {slug:'lumen-coffee-identity',cat:'branding',year:'Sample',en:['Lumen Coffee — Identity','Sample visual identity concept for a fictional specialty café.','Build a warm, memorable identity system.'],ar:['لومن كوفي — هوية بصرية','مفهوم هوية بصرية تجريبي لمقهى افتراضي.','بناء هوية دافئة لا تُنسى.']},
 {slug:'nile-bank-campaign',cat:'social',year:'Sample',en:['Fintech Social Campaign','Sample social media kit for a fictional fintech app.','Create a consistent, scroll-stopping feed.'],ar:['حملة سوشيال لتطبيق مالي','حزمة تصميم تجريبية لتطبيق مالي افتراضي.','إنشاء صفحة متناسقة تجذب الانتباه.']},
 {slug:'atlas-annual-profile',cat:'profiles',year:'Sample',en:['Atlas Group — Company Profile','Sample corporate profile layout for a fictional company.','Present a business with clarity and authority.'],ar:['أطلس — ملف الشركة','تصميم تجريبي لملف شركة افتراضية.','عرض الشركة بوضوح وثقة.']},
 {slug:'silent-hours-cover',cat:'books',year:'Sample',en:['The Silent Hours — Book Cover','Sample cover design for a fictional novel.','Translate a story into a single image.'],ar:['الساعات الصامتة — غلاف كتاب','تصميم غلاف تجريبي لرواية افتراضية.','تحويل قصة إلى صورة واحدة.']},
 {slug:'oasis-packaging-print',cat:'print',year:'Sample',en:['Oasis — Print Collateral','Sample brochure and stationery set for a fictional brand.','Deliver tactile, cohesive print pieces.'],ar:['واحة — مطبوعات','مطبوعات وقرطاسية تجريبية لعلامة افتراضية.','تقديم مطبوعات متكاملة.']},
 {slug:'form-fitness-social',cat:'social',year:'Sample',en:['Form Fitness — Social Series','Sample story and post templates for a fictional gym.','Energetic, reusable content templates.'],ar:['فورم فتنس — سلسلة سوشيال','قوالب منشورات وستوري تجريبية لصالة افتراضية.','قوالب نشطة قابلة لإعادة الاستخدام.']},
 {slug:'kemet-editorial',cat:'books',year:'Sample',en:['Kemet — Editorial Layout','Sample interior layout for a fictional art book.','Craft a calm, readable editorial rhythm.'],ar:['كيميت — تصميم داخلي لكتاب','تصميم داخلي تجريبي لكتاب فني افتراضي.','صياغة إيقاع تحريري هادئ.']},
 {slug:'prism-brand-system',cat:'branding',year:'Sample',en:['Prism Studio — Brand System','Sample logo and guidelines for a fictional studio.','Design a flexible, scalable brand system.'],ar:['بريزم — نظام العلامة','شعار وإرشادات تجريبية لاستوديو افتراضي.','تصميم نظام مرن قابل للتوسع.']},
];
