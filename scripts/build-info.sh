
export PATH="${PATH}:../../node_modules/.bin"

cd apps/info

rm -rf ./.astro ../../dist/apps/info

astro build