/** Runs before first paint so the page never flashes the wrong theme. */
export const ThemeScript: React.FC = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `try{var t=localStorage.getItem('kendhoo:theme');if(!t){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}`,
    }}
  />
)
