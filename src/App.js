import React, { useEffect } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { create } from 'jss';
import rtl from 'jss-rtl';
import MomentUtils from '@date-io/moment';
import { SnackbarProvider } from 'notistack';
import {
  createStyles,
  jssPreset,
  makeStyles,
  StylesProvider,
  ThemeProvider
} from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Auth from 'src/components/Auth';
import CookiesNotification from 'src/components/CookiesNotification';
import SettingsNotification from 'src/components/SettingsNotification';
import GoogleAnalytics from 'src/components/GoogleAnalytics';
import ScrollReset from 'src/components/ScrollReset';
import useSettings from 'src/hooks/useSettings';
import { createTheme } from 'src/theme';
import Routes from 'src/Routes';


const history = createBrowserHistory();
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const useStyles = makeStyles(() => createStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%'
    },
    body: {
      height: '100%',
      width: '100%'
    },
    '#root': {
      height: '100%',
      width: '100%'
    },
    '.goog-te-gadget-icon': {
      display:'none',
    },
    
    // '.goog-te-gadget-simple': {
    //     background-color: #ecebf0 !important;
    //     border:0 !important;
    //     font-size: 5pt;
    //     font-weight:500;
    //     display: inline-block;
    //     padding:2px 2px !important;
    //     cursor: pointer;
    //     width: 30px;
    //     height: 30px;
    //     zoom: 1;
    // }
    
    '.goog-te-gadget-simple  span': {
       color:'#3e3065 !important',
    },
    
    '.skiptranslate :first':{
      display:'none !important',
    },
    
    '#goog-gt-': {
      display: 'none !important'
    }
  }

}));

function App() {
  useStyles();

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "zn-CH",
        autoDisplay: false
      },
      "google_translate_element"
    );
  };

  useEffect(() => {
    var addScript = document.createElement("script");
    var addScript1 = document.createElement("script");
    addScript1.innerHTML='window.addEventListener("DOMNodeInserted", function(event) {var el = document.querySelector("iframe[id=\':1.container\']");if(el)el.parentElement.style.display="none";});';
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    document.body.appendChild(addScript1); 
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const { settings } = useSettings();

  return (
    <ThemeProvider theme={createTheme(settings)}>
      <StylesProvider jss={jss}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <SnackbarProvider maxSnack={1}>
            <Router history={history}>
              <Auth>
                <ScrollReset />
                <GoogleAnalytics />
                <CookiesNotification />
                <SettingsNotification />
                <Routes />
              </Auth>
            </Router>
          </SnackbarProvider>
        </MuiPickersUtilsProvider>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
