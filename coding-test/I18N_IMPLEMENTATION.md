# Internationalization (i18n) Implementation

## Overview

Internationalization support has been successfully added to the React boilerplate with support for **English** and **Swedish** languages. The implementation follows best practices and is easily extensible to support additional languages in the future.

## What Was Implemented

### 1. **Dependencies Installed**
- `i18next` - Core internationalization framework
- `react-i18next` - React bindings for i18next
- `i18next-browser-languagedetector` - Automatic language detection from browser/localStorage

### 2. **Folder Structure**

```
src/
  i18n/
    config.ts          # i18next configuration and initialization
    index.ts          # Barrel exports
    locales/
      en.json         # English translations
      sv.json         # Swedish translations
  components/
    language/
      LanguageSwitcher.tsx  # Language switcher component
      index.ts              # Barrel export
```

### 3. **Configuration**

The i18n configuration (`src/i18n/config.ts`) includes:
- **Language Detection**: Automatically detects language from:
  1. `localStorage` (persists user preference)
  2. Browser navigator language
  3. HTML lang attribute
- **Fallback Language**: English (`en`)
- **Supported Languages**: English (`en`) and Swedish (`sv`)
- **React Integration**: Configured to work with React without Suspense (compatible with ErrorBoundary)

### 4. **Translation Files**

#### English (`locales/en.json`)
Complete translations for:
- Common UI elements (buttons, labels, messages)
- Home page content
- Employees feature
- Error messages
- Language switcher

#### Swedish (`locales/sv.json`)
Complete Swedish translations for all the above sections.

### 5. **Components Updated**

All components have been updated to use translations:

- ✅ **HomePage** - All text now uses `t()` function
- ✅ **NotFoundPage** - Error messages translated
- ✅ **EmployeesPage** - All labels and messages translated
- ✅ **EmployeeTable** - Table headers translated
- ✅ **PageLoader** - Loading message translated
- ✅ **ErrorBoundary** - Error messages translated (using HOC pattern)

### 6. **Language Switcher Component**

A reusable `LanguageSwitcher` component has been created:
- Material-UI button with language icon
- Dropdown menu showing available languages
- Persists selection in localStorage
- Added to HomePage and EmployeesPage

## Usage

### Using Translations in Components

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <Typography>{t('common.loading')}</Typography>
  );
}
```

### Translation Keys Structure

```json
{
  "common": { ... },           // Common UI elements
  "app": { ... },              // App-level strings
  "home": { ... },             // Home page
  "employees": { ... },       // Employees feature
  "error": { ... },           // Error messages
  "language": { ... }         // Language switcher
}
```

### Adding a New Language

1. Create a new JSON file in `src/i18n/locales/` (e.g., `de.json` for German)
2. Add the language to `SUPPORTED_LANGUAGES` in `src/i18n/config.ts`:
   ```typescript
   export const SUPPORTED_LANGUAGES = {
     en: 'English',
     sv: 'Svenska',
     de: 'Deutsch',  // New language
   } as const;
   ```
3. Import and add to resources in `config.ts`:
   ```typescript
   import deTranslations from './locales/de.json';
   
   resources: {
     // ... existing languages
     de: {
       translation: deTranslations,
     },
   }
   ```

### Translation with Variables

```typescript
// In JSON: "teamMembersCount": "{{count}} team members"
t('employees.teamMembersCount', { count: employees.length })
```

## Features

✅ **Automatic Language Detection** - Detects user's preferred language  
✅ **Persistent Selection** - Saves language preference in localStorage  
✅ **Type-Safe** - TypeScript support for language codes  
✅ **Extensible** - Easy to add new languages  
✅ **Best Practices** - Follows i18next and React best practices  
✅ **No Breaking Changes** - All existing functionality preserved  

## Testing

The implementation has been tested and verified:
- ✅ TypeScript compilation passes
- ✅ ESLint passes (with auto-fix)
- ✅ Build succeeds
- ✅ All components render correctly
- ✅ Language switching works
- ✅ Translations persist across page reloads

## Path Aliases

The `@i18n` path alias has been added to:
- `vite.config.ts`
- `tsconfig.json`

Use it like: `import { DEFAULT_LANGUAGE } from '@i18n/config'`

## Next Steps (Optional Enhancements)

1. **Add more languages** - Follow the pattern above
2. **Date/Number formatting** - Use i18next's built-in formatting or integrate with existing format utilities
3. **Pluralization** - i18next supports complex plural rules
4. **Namespace separation** - Split translations into multiple namespaces for large apps
5. **Translation management** - Consider tools like Crowdin, Lokalise for team collaboration

## Files Modified/Created

### Created:
- `src/i18n/config.ts`
- `src/i18n/index.ts`
- `src/i18n/locales/en.json`
- `src/i18n/locales/sv.json`
- `src/components/language/LanguageSwitcher.tsx`
- `src/components/language/index.ts`

### Modified:
- `src/main.tsx` - Added i18n initialization
- `src/pages/HomePage.tsx` - Added translations and language switcher
- `src/pages/NotFoundPage.tsx` - Added translations
- `src/features/employees/pages/EmployeesPage.tsx` - Added translations and language switcher
- `src/features/employees/components/EmployeeTable.tsx` - Added translations
- `src/components/feedback/PageLoader.tsx` - Added translations
- `src/components/feedback/ErrorBoundary.tsx` - Added translations (HOC pattern)
- `vite.config.ts` - Added `@i18n` alias
- `tsconfig.json` - Added `@i18n` alias
- `package.json` - Added i18n dependencies

---

**Implementation Complete!** 🎉

The boilerplate now has full internationalization support and is ready for multi-language applications.

