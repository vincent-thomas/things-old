export PATH="${PATH}:./node_modules/.bin"

netlify deploy --auth $NETLIFY_TOKEN --build false --dir ./dist/storybook/ui --prod --site $NETLIFY_UI_STORYBOOK_SITE_ID
