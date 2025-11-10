import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, type SupportedLanguage } from '@i18n/config';
import LanguageIcon from '@mui/icons-material/Language';
import { Button, Menu, MenuItem } from '@mui/material';
import { type MouseEvent, type ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher(): ReactElement {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const currentLanguage = (i18n.language || DEFAULT_LANGUAGE) as SupportedLanguage;

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang: SupportedLanguage): void => {
    void i18n.changeLanguage(lang);
    handleClose();
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<LanguageIcon />}
        onClick={handleClick}
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ textTransform: 'none' }}
      >
        {SUPPORTED_LANGUAGES[currentLanguage] || SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE]}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-button',
        }}
      >
        {(Object.keys(SUPPORTED_LANGUAGES) as SupportedLanguage[]).map((lang) => (
          <MenuItem
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            selected={lang === currentLanguage}
          >
            {SUPPORTED_LANGUAGES[lang]}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default LanguageSwitcher;
