export type AppLanguage = 'pt' | 'en';

export function detectInitialLanguage(): AppLanguage {
  if (typeof window === 'undefined') return 'pt';

  // 1. Check URL parameter (?lang=en or ?lang=pt or ?appsumo=1)
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang')?.toLowerCase();
  if (urlLang === 'en') {
    localStorage.setItem('teleprompter_app_lang', 'en');
    return 'en';
  }
  if (urlLang === 'pt') {
    localStorage.setItem('teleprompter_app_lang', 'pt');
    return 'pt';
  }
  if (params.get('appsumo') === '1') {
    localStorage.setItem('teleprompter_app_lang', 'en');
    return 'en';
  }

  // 2. Check saved preference in localStorage
  const saved = localStorage.getItem('teleprompter_app_lang');
  if (saved === 'en' || saved === 'pt') {
    return saved;
  }

  // 3. Auto-detect browser language (if not Portuguese, default to English for international users)
  const browserLang = (navigator.language || 'pt-BR').toLowerCase();
  if (!browserLang.startsWith('pt')) {
    return 'en';
  }

  return 'pt';
}
