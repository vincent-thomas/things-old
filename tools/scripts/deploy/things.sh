export PATH="${PATH}:./node_modules/.bin"

netlify deploy --auth $NETLIFY_TOKEN --build false --dir ./dist/apps/things --prod --site $NETLIFY_INFO_SITE_ID
